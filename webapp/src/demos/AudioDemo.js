import React, { Component } from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import _ from 'lodash';

import AudioWorker from './AudioWorker.wjs';

import Audio1 from 'assets/audios/过几日.mp3';
import Audio2 from 'assets/audios/妖扬-九九八十一.mp3';
import Audio3 from 'assets/audios/玄觞 - 紫光.mp3';
import Audio4 from 'assets/audios/柚子茶 - 霜雪千年.mp3';
import Audio5 from 'assets/audios/司夏 - 为龙.mp3';

class AudioDemo extends Component {
  constructor(props) {
    super(props);

    this.audioFiles = [
      { name: '过几日', src: Audio1 },
      { name: '妖扬-九九八十一', src: Audio2 },
      { name: '玄觞 - 紫光', src: Audio3 },
      { name: '柚子茶 - 霜雪千年', src: Audio4 },
      { name: '司夏 - 为龙', src: Audio5 },
    ];
    this.curIdx = 0;
    this.audiosLen = this.audioFiles.length;

    this.state = {
      audioRefs: {},
      disabled: true,
      playingRef: null,
    };
    this.counter = 0;
    this.audioElements = [];
    this.callbacks = [];
    this.playingNode = null;

    this.preparingElements = [];

    this.worker = null;
  }

  componentDidMount() {
    this.worker = new Worker(AudioWorker);

    this.worker.addEventListener('message', this.handleMessage);

    this.add(true);
    this.add(false);
    this.add(false);
  }

  componentWillUnmount() {
    this.worker.removeEventListener('message', this.handleMessage);
  }

  handleMessage = (ev) => {
    try {
      const { type, ...props } = ev.data;
      switch (type) {
        case 'PLAY':
          setTimeout(this.play, 0, props.ref);
          break;
        case 'ADD':
          setTimeout(this.add, 0, props.autoPlay);
          break;
        default:
          console.error('unknown type,', type);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  startAll = () => {
    this.setState({ disabled: true }, () => {
      while (this.callbacks.length) {
        this.play(this.callbacks.shift());
      }
      for (let i = 0; i < this.audioElements.length; i++) {
        this.audioElements[i].play();
      }
    })
  }

  nextAudio = () => {
    return this.audioFiles[(this.curIdx++) % this.audiosLen];
  }

  add = (autoPlay) => {
    const next = this.nextAudio();
    const ref = `${next.name}-${++this.counter}`;
    if (!this.audioElements.length) {
      for (let i = 0; i < 5; i++) {
        const audio = new Audio();
        this.audioElements.push(audio);
      }
    }
    const node = this.audioElements.shift();
    node.pause();
    node.src = next.src;
    this.setState((oldState) => {
      oldState.audioRefs[ref] = {
        data: next,
        node,
      };
      return _.clone(oldState);
    }, () => { if (autoPlay) this.play(ref); });
  }

  delayedAdd = (autoPlay = false) => {
    this.worker.postMessage({ type: 'ADD', autoPlay });
  }

  delete = (ref) => {
    const audio = this.state.audioRefs[ref];
    if (!audio) return;

    const node = audio.node;
    node.pause();
    node.currentTime = 0;
    this.setState(
      (oldState) => ({
        audioRefs: _.chain(oldState.audioRefs)
          .omitBy((v, k) => k === ref)
          .clone()
          .value()
      }),
      () => this.audioElements.push(node)
    )
  }

  play = (ref) => {
    alert(`play - ${ref}`);
    const audio = this.state.audioRefs[ref];
    if (!audio) return;

    const node = audio.node;
    node.play()
      .then(() => {
        if (this.playingNode) {
          this.playingNode.pause();
          this.playingNode.currentTime = 0;
        }
        this.playingNode = node;
        this.setState({ playingRef: ref });
      })
      .catch(() =>
        this.setState({ disabled: false }, () => this.callbacks.push(ref))
      );
  }

  delayedPlay = (ref) => {
    this.worker.postMessage({ type: 'PLAY', ref });
  }

  render() {
    const { audioRefs, disabled, playingRef } = this.state;

    return (
      <div className="whole-audio-demo">
        <Button onClick={this.delayedAdd.bind(this, false)}>Add</Button>
        <Button onClick={this.startAll} disabled={disabled}>Start All</Button>
        <br />
        <Button.Group>
          {
            _.chain(audioRefs)
              .keys()
              .map(
                ref => <Button
                  key={ref}
                  inverted
                  color="olive"
                  active={playingRef === ref}
                  onClick={this.delayedPlay.bind(this, ref)}
                >
                  {audioRefs[ref].data.name}
                </Button>
              )
              .value()
          }
        </Button.Group>
        <br />
        <Dropdown text='Select to Delete' button>
          <Dropdown.Menu>
            {
              _.chain(audioRefs)
                .keys()
                .map(
                  ref => <Dropdown.Item
                    key={ref}
                    onClick={this.delete.bind(this, ref)}
                  >
                    {ref}
                  </Dropdown.Item>
                )
                .value()
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default AudioDemo;

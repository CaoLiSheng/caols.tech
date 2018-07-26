import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

import Video1 from 'assets/videos/Pexels Videos 1069804.mp4';
import Video2 from 'assets/videos/Pexels Videos 1088376.mp4';

import './VideoDemo.scss';

class VideoDemo extends Component {
  state = {
    videoSrc: null,
    disabled: true,
  }

  componentDidMount() {
    this.setState({
      videoSrc: Video1,
    }, this.play);
  }

  play = () => {
    this.videoRef.play()
      .then(() => {
        this.setState({ disabled: true });
      })
      .catch(() => {
        // this.videoRef.muted = true;
        // this.videoRef.play();
        this.setState({ disabled: false });
      });
  }

  render() {
    const { videoSrc, disabled } = this.state;
    return (
      <div className="whole-video-demo">
        <video
          controls
          ref={(n) => { this.videoRef = n; }}
          src={videoSrc}
          onEnded={() => {
            this.setState({
              videoSrc: Video2,
            }, this.play);
          }}
        ></video>
        <Button.Group>
          <Button onClick={() => {
            this.setState({
              videoSrc: Video1,
            }, this.play);
          }}>Play Video1</Button>
          <Button onClick={() => {
            this.setState({
              videoSrc: Video2,
            }, this.play);
          }}>Change to Video2</Button>
          <Button onClick={() => {
            this.videoRef.muted = false;
          }}>Unmute</Button>
          <Button disabled={disabled} onClick={this.play}>Play</Button>
        </Button.Group>
      </div>
    );
  }
}

export default VideoDemo;

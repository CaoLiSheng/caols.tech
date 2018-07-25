import React, { Component } from 'react';

import DragImg1 from 'images/folder-drag.png';
import DragImg2 from 'images/japan_tower_tokyo_landmark.png';
import './DragDemo.scss';

class DragDemo extends Component {
  onDragStart = (e) => {
    console.log(e.target);

    const dt = e.dataTransfer;
    const img = e.target.cloneNode();
    this.halfWidth = img.width / 2;
    this.halfHeight = img.height / 2;
    dt.setDragImage(img, this.halfWidth, this.halfHeight);

    // const c = document.createElement('canvas');
    // c.width = 64;
    // c.height = 64;
    // const ctx = c.getContext('2d');
    // ctx.drawImage(img, 0, 0, 64, 64);

    // const dragImg = new Image();
    // dragImg.src = c.toDataURL();
    // dt.setDragImage(dragImg, dragImg.width / 2, dragImg.height / 2);
  }

  onDragEnd = (e) => {
    console.log(e.target);

    console.log('e.clientX', e.clientX);
    console.log('e.clientY', e.clientY);

    console.log('mousePos.x', e.clientX - this.halfWidth);
    console.log('mousePos.y', e.clientY + this.halfHeight);

    const mousePos = {
      x: e.clientX - this.halfWidth - this.iframe.offsetLeft,
      y: e.clientY + this.halfHeight - this.iframe.offsetTop,
    };

    console.log(mousePos);
  }

  render() {
    return (
      <div className="whole-drag-demo">
        <div className="header" />
        <div className="body">
          <div className="sidebar">
            <div
              className="icon"
              onDragStart={this.onDragStart}
              onDragEnd={this.onDragEnd}
            >
              <img src={DragImg1} alt="dragable" role="represatation" />
            </div>
            <div
              className="icon"
              onDragStart={this.onDragStart}
              onDragEnd={this.onDragEnd}
            >
              <img src={DragImg2} alt="dragable" role="represatation" />
            </div>
          </div>
          <div ref={(n) => { this.iframe = n; }} className="iframe">
            <iframe src="https://www.baidu.com" frameBorder="0" />
          </div>
        </div>
      </div>
    );
  }
}

export default DragDemo;

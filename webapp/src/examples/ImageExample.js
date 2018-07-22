import React from 'react';
import TheImage from 'images/online.jpg';

import './CssExample.scss';

export default () => (
  <div className="image-example">
    <img src={TheImage} alt="The Image" />
    <div className="a-image-container" />
  </div>
);

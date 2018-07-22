import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './examples/ImageExample';

const clientRender = __SSR__ ? hydrate : render;

clientRender(<App />, document.getElementById('app'));

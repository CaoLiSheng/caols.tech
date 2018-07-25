import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './demos/DragDemo';

const clientRender = __SSR__ ? hydrate : render;

clientRender(<App />, document.getElementById('app'));

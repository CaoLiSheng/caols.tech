import React from 'react';
import { hydrate, render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './demos/VideoDemo';

const clientRender = __SSR__ ? hydrate : render;

clientRender(<App />, document.getElementById('app'));

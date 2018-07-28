import React from 'react';
import { hydrate, render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import 'semantic-ui-css/semantic.min.css';
import App from './demos/DragDemo';

const clientRender = __SSR__ ? hydrate : render;

clientRender(<App />, document.getElementById('app'));

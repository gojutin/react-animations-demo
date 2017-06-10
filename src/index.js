import React from 'react';
import { render } from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './css/index.css';
import './css/toggle.css';
import 'rc-slider/assets/index.css';
import 'bulma/css/bulma.css';

render(<App />, document.getElementById('root'));
registerServiceWorker();

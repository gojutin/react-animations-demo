import React from 'react';
import { render } from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './css/index.css';
// import './css/grid.min.css';
import 'react-select/dist/react-select.css';

render(<App />, document.getElementById('root'));
registerServiceWorker();

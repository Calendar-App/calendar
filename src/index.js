import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AdminView from './components/AdminView/AdminView';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

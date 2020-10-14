import React from 'react';
import ReactDOM from 'react-dom';
import AppRoute from './AppRoute';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import './styles/App.scss';

ReactDOM.render(
  <React.StrictMode>
    <AppRoute />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

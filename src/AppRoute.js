import React, {Fragment} from 'react';
import {Provider} from "react-redux";
import { createStore } from 'redux';
import reducer from './reducers';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ApplicationBase from './containers/ApplicationBase';
import FileUpload from './containers/FileUpload/FileUpload';
import PriceValidation from './containers/PriceValidation/PriceValidation';
import store from './reducers';

function AppRoute() {
  return (
      <Provider store={store}>
        <Fragment>
          <Router>
                  <Switch>
                      <Route path="/" component={ApplicationBase}/>
                  </Switch>
          </Router>
        </Fragment>
      </Provider>
  );
}

export default AppRoute;

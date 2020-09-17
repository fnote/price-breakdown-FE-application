import React, {Fragment} from 'react';
import {Provider} from "react-redux";
import { createStore } from 'redux';
import reducer from './reducers';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ApplicationBase from './containers/ApplicationBase';
const store = createStore(reducer);

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

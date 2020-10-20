import React, {Fragment} from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ApplicationBase from './containers/ApplicationBase';
import store from './reducers';
import UserDetailContextProvider from './containers/UserDetailContext';
import AppLoaderContextProvider from './components/AppLoderContext';

function AppRoute() {
  return (
      <Provider store={store}>
        <Fragment>
          <Router>
                  <Switch>
                      <UserDetailContextProvider>
                          <AppLoaderContextProvider>
                      <Route path="/" component={ApplicationBase}/>
                          </AppLoaderContextProvider>
                      </UserDetailContextProvider>
                  </Switch>
          </Router>
        </Fragment>
      </Provider>
  );
}

export default AppRoute;

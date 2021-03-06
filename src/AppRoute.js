import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ApplicationBase from './containers/ApplicationBase';
import UserDetailContextProvider from './containers/UserDetailContext';
import AppLoaderContextProvider from './components/AppLoderContext';
import RequestContextProvider from './containers/RequestContext';

function AppRoute() {
  return (
        <Fragment>
          <Router>
                  <Switch>
                      <UserDetailContextProvider>
                          <AppLoaderContextProvider>
                              <RequestContextProvider>
                                <Route path="/" component={ApplicationBase}/>
                              </RequestContextProvider>
                          </AppLoaderContextProvider>
                      </UserDetailContextProvider>
                  </Switch>
          </Router>
        </Fragment>
  );
}

export default AppRoute;

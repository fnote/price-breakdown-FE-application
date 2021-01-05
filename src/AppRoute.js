import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ApplicationBase from './containers/ApplicationBase';
import UserDetailContextProvider from './containers/UserDetailContext';
import AppLoaderContextProvider from './components/AppLoderContext';

function AppRoute() {
  return (
        <Fragment>
          <Router>
                  <Switch>
                      <UserDetailContextProvider>
                          <AppLoaderContextProvider>
                              <Route path="/" component={ApplicationBase}/>
                              <Route path="/FileUpload" component={ApplicationBase}/>
                          </AppLoaderContextProvider>
                      </UserDetailContextProvider>
                  </Switch>
          </Router>
        </Fragment>
  );
}

export default AppRoute;

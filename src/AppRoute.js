import React, {Fragment} from 'react';
import {Provider} from "react-redux";
import { createStore } from 'redux';
import reducer from './reducers';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import HomePage from "./containers/HomePage";

// const theme = createMuiTheme(AppThemes.light);
const store = createStore(reducer);

function AppRoute() {
  return (
      <Provider store={store}>
        <Fragment>
          <Router>

                  <Switch>
                      <Route path="/" component={HomePage}/>
                  </Switch>

          </Router>
        </Fragment>
      </Provider>
  );
}

export default AppRoute;

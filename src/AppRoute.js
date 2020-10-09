import React, {Fragment} from 'react';
import {Provider} from "react-redux";
import store from './reducers';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PriceValidation from './containers/PriceValidation/PriceValidation';

function AppRoute() {
    return (
        <Provider store={store}>
            <Fragment>
                <Router>
                    <Switch>
                        <Route path="/" component={PriceValidation}/>
                    </Switch>
                </Router>
            </Fragment>
        </Provider>
    );
}

export default AppRoute;

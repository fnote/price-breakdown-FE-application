import React, {useContext, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {notification} from 'antd';
import Login from './Login/Login';
import PriceValidation from './PriceValidation/PriceValidation';
import FileUpload from './FileUpload/FileUpload';
import {auth} from '../utils/security/Auth';
import AppLoader from '../components/AppLoader';
import {UserDetailContext} from './UserDetailContext';
import {AppLoaderContext} from '../components/AppLoderContext';
import {NAVIGATION_PATH_FILE_UPLOAD, NAVIGATION_PATH_PRICE_VALIDATION} from '../constants/Constants';

const Application = () => (
    <Switch>
        <Route path={NAVIGATION_PATH_FILE_UPLOAD}>
            <FileUpload/>
        </Route>
        <Route path={NAVIGATION_PATH_PRICE_VALIDATION}>
            <PriceValidation/>
        </Route>
    </Switch>
);

export default function ApplicationBase() {
    const userDetailContext = useContext(UserDetailContext);
    const appLoaderContext = useContext(AppLoaderContext);

    // Global configurations for notifications
    notification.config({
        placement: 'bottomRight',
        duration: 3,
    });

    useEffect(() => {
        if (auth.isUserLoginPending() || auth.shouldFetchUserDetailsAgain(userDetailContext)) {
            if (appLoaderContext.appLoadingState !== true) {
                appLoaderContext.setAppLoadingState(true);
            } else {
                auth.userDetailContextHandler(userDetailContext, appLoaderContext);
            }
        }
    });

    let component;
    if (appLoaderContext.appLoadingState) {
        component = <AppLoader/>;
    } else {
        component = auth.isUserLoginCompleted() ? Application() : <Login/>;
    }

  return (

    <React.Fragment>
        {component}
    </React.Fragment>
  );
}

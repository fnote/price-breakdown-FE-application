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

import UnsupportedBrowser from "../components/UnsupportedBrowser";
import BrowserDetector from "../utils/BrowserDetector";
import {SUPPORTED_WEB_BROWSERS} from '../constants/Constants'
import ToperrorBar from "../components/ToperrorBar"

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
    const browserDetector = new BrowserDetector(SUPPORTED_WEB_BROWSERS);

    // prevent dragover and drop events in the window
    window.addEventListener('dragover', (e) => {
        e.preventDefault();
    }, false);
    window.addEventListener('drop', (e) => {
        e.preventDefault();
    }, false);

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

    
    
    if(!browserDetector.isSupported()){
        component =  <UnsupportedBrowser
            browserName={browserDetector.getBrowserName()}
            browserVersion={browserDetector.getBrowserVersion()}
            fullBrowserVersion={browserDetector.getFullBrowserVersion()}/>;
    } else if (appLoaderContext.appLoadingState) {
        component = <AppLoader/>;
    } else {
        component = !auth.isUserLoginCompleted() ? Application() : <Login/>;
    }

    return (

        <React.Fragment>
            {/* <ToperrorBar msg="Your browser isn't supported"  buttonText="Learn More" close/> */}
            {component}
        </React.Fragment>
    );
}

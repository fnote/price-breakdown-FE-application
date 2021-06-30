import React, {useContext, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {notification} from 'antd';
import Login from './Login/Login';
import PriceValidation from './PriceValidation/PriceValidation';
import FileUpload from './FileUpload/FileUpload';
import HistoryInquiry from './HistoryInquiry/HistoryInquiry';
import PriceZoneRe from './PriceZoneReassignment/PriceZoneRe'
import {auth} from '../utils/security/Auth';
import AppLoader from '../components/AppLoader';
import {UserDetailContext} from './UserDetailContext';
import {AppLoaderContext} from '../components/AppLoderContext';
import {NAVIGATION_PATH_FILE_UPLOAD, NAVIGATION_PATH_PRICE_VALIDATION , NAVIGATION_PATH_HISTORY_INQUIRY , NAVIGATION_PATH_PRICEZONE_REASSIGNMENT} from '../constants/Constants';

import UnsupportedBrowser from "../components/UnsupportedBrowser";
import BrowserDetector from "../utils/BrowserDetector";
import {SUPPORTED_WEB_BROWSERS} from '../constants/Constants'

const Application = () => (
    <Switch>
        <Route exact path={NAVIGATION_PATH_FILE_UPLOAD}>
            <FileUpload/>
        </Route>
        <Route exact path={NAVIGATION_PATH_PRICE_VALIDATION}>
            <PriceValidation/>
        </Route>
        <Route exact path={NAVIGATION_PATH_HISTORY_INQUIRY}>
            <HistoryInquiry/>
        </Route>
        <Route exact path={NAVIGATION_PATH_PRICEZONE_REASSIGNMENT}>
            <PriceZoneRe/>
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

    const component = Application();

    return (

        <React.Fragment>
            {/* <ToperrorBar msg="Your browser isn't supported"  buttonText="Learn More" close/> */}
            {component}
        </React.Fragment>
    );
}

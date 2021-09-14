import React, {useContext, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {notification} from 'antd';
import Login from './Login/Login';
import PriceValidation from './PriceValidation/PriceValidation';
import FileUpload from './FileUpload/FileUpload';
import HistoryInquiry from './HistoryInquiry/HistoryInquiry';
import PZRHome from './PriceZoneReassignment/PZRHome';
import {auth} from '../utils/security/Auth';
import AppLoader from '../components/AppLoader';
import {UserDetailContext} from './UserDetailContext';
import {AppLoaderContext} from '../components/AppLoderContext';
import {
    NAVIGATION_PATH_FILE_UPLOAD,
    NAVIGATION_PATH_HISTORY_INQUIRY,
    NAVIGATION_PATH_PRICE_VALIDATION,
    NAVIGATION_PATH_PRICEZONE_REASSIGNMENT,
    SCREEN_HISTORY_INQUIRY,
    SCREEN_PRICE_VALIDATION,
    SUPPORTED_WEB_BROWSERS
} from '../constants/Constants';

import {grantViewPermissionsToScreens, unsupportedBrowserState} from '../utils/CommonUtils';
import UnsupportedBrowserScreen from '../components/UnsupportedBrowser/UnsupportedBrowserScreen';
import BrowserDetector from '../utils/BrowserDetector';
import NetworkConnectivityAlert from '../components/NetworkConnectivityAlert/NetworkConnectivityAlert';
import UnsupportedBrowserTopAlert from '../components/UnsupportedBrowser/UnsupportedBrowserTopAlert';

const Application = (user) => (
        <Switch>
            <Route exact path={NAVIGATION_PATH_FILE_UPLOAD}>
                <FileUpload/>
            </Route>
            <Route exact path={NAVIGATION_PATH_PRICE_VALIDATION}>
                {grantViewPermissionsToScreens(user, SCREEN_PRICE_VALIDATION) ? <PriceValidation/>
                    : <Redirect to={NAVIGATION_PATH_PRICEZONE_REASSIGNMENT}/>}
            </Route>
            <Route exact path={NAVIGATION_PATH_PRICEZONE_REASSIGNMENT}>
                <PZRHome/>
            </Route>
            <Route exact path={NAVIGATION_PATH_HISTORY_INQUIRY}>
                {grantViewPermissionsToScreens(user, SCREEN_HISTORY_INQUIRY) ? <HistoryInquiry/>
                    : <Redirect to={NAVIGATION_PATH_PRICEZONE_REASSIGNMENT}/>}
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
    const userRole = userDetailContext?.userDetailsData?.userDetails?.role;
    const cipzUserRole = userDetailContext?.userDetailsData?.userDetails?.cipzRole;

    if (!browserDetector.isSupported() && !unsupportedBrowserState.isSetUnsupportedBrowserScreenContinue()) {
        component = <UnsupportedBrowserScreen
            browserName={browserDetector.getBrowserName()}
            browserVersion={browserDetector.getBrowserVersion()}
            fullBrowserVersion={browserDetector.getFullBrowserVersion()}/>;
    } else if (appLoaderContext.appLoadingState) {
        component = <AppLoader/>;
    } else {
        component = auth.isUserLoginCompleted() && (userRole || cipzUserRole) ? Application(userRole) : <Login/>;
    }

    return (
        <React.Fragment>
            <NetworkConnectivityAlert/>
            <UnsupportedBrowserTopAlert/>
            {component}
        </React.Fragment>
    );
}

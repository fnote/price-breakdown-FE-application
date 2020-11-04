import React, {useContext, useEffect} from 'react';
import Login from './Login/Login';
import PriceValidation from './PriceValidation/PriceValidation';
import {auth} from '../utils/security/Auth';
import AppLoader from "../components/AppLoader";
import {UserDetailContext} from './UserDetailContext';
import {AppLoaderContext} from '../components/AppLoderContext';



export default function ApplicationBase() {
    const userDetailContext = useContext(UserDetailContext);
    const appLoaderContext = useContext(AppLoaderContext);

    useEffect(() => {
        if (auth.isUserLoginPending() || auth.shouldFetchUserDetailsAgain(userDetailContext)) {
            if(appLoaderContext.appLoadingState !== true) {
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
        component = auth.isUserLoginCompleted() ? <PriceValidation/> : <Login/>
    }


  return (

    <React.Fragment>
        {component}
    </React.Fragment>
  );
}

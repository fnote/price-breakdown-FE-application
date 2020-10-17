import React, {Component, useContext, useEffect} from 'react';
import Login from './Login/Login';
import PriceValidation from './PriceValidation/PriceValidation';
import FileUpload from './FileUpload/FileUpload';
import {auth} from '../utils/security/Auth';
import AppLoader from "../components/AppLoader";
import {AUTH_STATE_COMPLETED, AUTH_STATE_FAILED} from '../utils/Constants';
import {UserDetailContext} from './UserDetailContext';
import {AppLoaderContext} from '../components/AppLoderContext';



export default function ApplicationBase() {
    const userDetailContext = useContext(UserDetailContext);
    const appLoaderContext = useContext(AppLoaderContext);

    useEffect(() => {
        if (auth.isUserLoginPending() || auth.shouldFetchUserDetailsAgain(userDetailContext)) {
            console.log(userDetailContext)
            console.log('calling handler')


            console.log('apploader', appLoaderContext)

            if(appLoaderContext.appLoadingState !== true) {
                appLoaderContext.setAppLoadingState(true);
            } else {
                return auth.userDetailContextHandler(userDetailContext, appLoaderContext);
            }
        }
    });

  return (

    <React.Fragment>
        {appLoaderContext.appLoadingState === true ? (<AppLoader/>) :
            (auth.isUserLoginCompleted() ? (<PriceValidation/>) : (<Login/>))
        }

    </React.Fragment>

      // <AppLoader />
  );
}

import React, {Component, useContext} from 'react';
import Login from './Login/Login';
import PriceValidation from './PriceValidation/PriceValidation';
import FileUpload from './FileUpload/FileUpload';
import {auth} from '../utils/security/Auth';
import AppLoader from "../components/AppLoader";
import {LoginContext} from './Login/LoginContext';



export default function ApplicationBase() {
    // const login = useContext(LoginContext);
    useContext(LoginContext);

  return (
      <React.Fragment>
        { auth.isUserLoggedIn() ? (<PriceValidation/>) : (<Login/>)}
          {/*{console.log('Received user details' ,login.userDetailsData)}*/}
      </React.Fragment>

      // <AppLoader />
  );
}

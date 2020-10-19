import React, {useContext, useEffect} from "react";
import logo from "../../styles/images/logo.svg";
import {auth} from "../../utils/security/Auth";
import {AUTH_FAILURE_TYPE_UNAUTHENTICATED} from '../../utils/Constants';
import {UserDetailContext} from '../UserDetailContext';

/**
 * Login page that shows the login button for SSO sign in
 *
 * @returns {HTMLDivElement} Returns the Login page component
 */
const Login = () => {

    const loginContext = useContext(UserDetailContext);

    return (
        <div className="wrapper login-wrapper">
            <div className="login-panel">
                <img src={logo} alt="Sysco Cloud Pricing" className="logo"/>
                <p className={loginContext.userDetailsData.error !== null ? "error-text": "error-text hide"}>
                    <i className="fi flaticon-alert"/>
                    {loginContext.userDetailsData.errorType === AUTH_FAILURE_TYPE_UNAUTHENTICATED ?
                    "User login failed.": "Unexpected Error occurred while authenticating"
                    }
                </p>
                <div className="button-bar">
                    <div className="title">Please sign in to begin</div>
                    <button className="loginbtn" onClick={() => loginButtonClicked()}>
                        Sign In
                    </button>

                </div>
            </div>
        </div>
    );

}

const loginButtonClicked = () => {
    auth.getLoginPage();
};


export default Login;

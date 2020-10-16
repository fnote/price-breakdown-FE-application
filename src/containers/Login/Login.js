import React, {useContext, useEffect} from "react";
import logo from "../../styles/images/logo.svg";
import {auth} from "../../utils/security/Auth";
import {LoginContext} from './LoginContext';
import {AUTH_STATE_COMPLETED, AUTH_STATE_FAILED} from '../../utils/Constants';

/**
 * Login page that shows the login button for SSO sign in
 *
 * @returns {HTMLDivElement} Returns the Login page component
 */
const Login = () => {

    const loginContext = useContext(LoginContext);

    useEffect(() => {
        if (auth.isUserLoginPending()) {
            // this.props.fetchUserDetails();
            return handler();
        }
    });


    const handler = () => {

        auth.callUserDetails()
            .then((data) => {
                let payloadData = {
                    isLoginSucceeded: false,
                    userDetails: {},
                    error: null
                }

                console.log(data)

                if (data.status === 200) {
                    payloadData.isLoginSucceeded = true;
                    payloadData.userDetails = data.userDetailResponse;
                    auth.setUserLoggedInState(AUTH_STATE_COMPLETED);
                } else if (data.status === 401) {
                    payloadData.isLoginSucceeded = false;
                    payloadData.error = data.userDetailResponse;
                    auth.setUserLoggedInState();
                } else {
                    payloadData.isLoginSucceeded = false;
                    payloadData.error = {
                        "status": "Unauthorized",
                        "message": "User cannot be authenticated",
                        "cause": "Unexpected error occurred"
                    }
                    auth.setUserLoggedInState(AUTH_STATE_FAILED);
                }

                loginContext.setUserDetails(payloadData);

                return null;

            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <div className="wrapper login-wrapper">
            <div className="login-panel">
                <img src={logo} alt="Sysco Cloud Pricing" className="logo"/>
                <p className="error-text hide">
                    <i className="fi flaticon-alert"/> For security reasons you have been
                    signed out automatically.
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

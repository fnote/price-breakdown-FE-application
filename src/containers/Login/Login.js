import React, {Component} from "react";
import logo from "../../styles/images/logo.svg";
import {auth} from "../../utils/security/Auth";
// import { Auth } from 'aws-amplify';
// import config from "../../internal/config";
import { SyncOutlined } from "@ant-design/icons";

/**
 * Login page that shows the login button for SSO sign in
 *
 * @returns {HTMLDivElement} Returns the Login page component
 */
class Login extends Component {
  componentDidMount() {
    if(auth.isUserLoginPending()) {
      this.loadUserDetails();
    }
  }

  /**
   * Login button functionality.
   * Communicates with AWS Cognito service for federated sign in
   */
  loginButtonClicked = () => {
    auth.getLoginPage();
  };

  loadUserDetails = () => {
    const {status, userDetailResponse} = auth.callUserDetails();
    console.log(userDetailResponse);
  }

  render() {
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
              <button className="loginbtn" onClick={() => this.loginButtonClicked()}>
                Sign In
              </button>
            </div>
          </div>
        </div>
    );
  }
}

export default Login;

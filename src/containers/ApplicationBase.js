import React, {Component} from 'react';
import Login from './Login/Login';
import PriceValidation from './PriceValidation/PriceValidation';
import FileUpload from './FileUpload/FileUpload';
import {auth} from '../utils/security/Auth';
import {connect} from 'react-redux';
import AppLoader from "../components/AppLoader";


class ApplicationBase extends Component {
  render() {
    return (
        auth.isUserLoggedIn() ? (<PriceValidation/>) : (<Login/>)
    {/* <AppLoader /> */}
    );
  }
}

const mapStateToProps = state => ({
  userAuth: state.userAuth
});

export default connect(mapStateToProps)(ApplicationBase);

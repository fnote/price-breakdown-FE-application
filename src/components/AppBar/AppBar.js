import React, {useContext} from 'react';
import {QuestionCircleOutlined} from '@ant-design/icons';
import logo from '../../styles/images/logo.svg';
import AccountWidget from './AccountWidget';
import Navigation from './Navigation';
import {HELP_PAGE_URL} from '../../constants/Constants';
import {UserDetailContext} from '../../containers/UserDetailContext';

function AppBar() {
    const userDetailContext = useContext(UserDetailContext);
    const userRole = userDetailContext.userDetailsData.userDetails.role;
    const cipzUserRole = userDetailContext.userDetailsData.userDetails.cipzRole;
    // hide the navigation when user role is empty
    return (
        <div className="appbar" id="appbar">
            <img src={logo} alt="Sysco Cloud Pricing" className="logo"/>
            {/*{userRole !== '' && (<Navigation />)}*/}
            <Navigation />
            <a className="need-help-header-link" href={HELP_PAGE_URL} target="_BLANK" rel="noopener noreferrer">
                <QuestionCircleOutlined className="icdon"/> Need Help?
            </a>
            <AccountWidget/>
        </div>
  );
}

export default AppBar;

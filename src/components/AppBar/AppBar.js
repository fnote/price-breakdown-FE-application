import React from 'react';
import {QuestionCircleOutlined} from '@ant-design/icons';
import logo from '../../styles/images/logo.svg';
import AccountWidget from './AccountWidget';
import Navigation from './Navigation';
import {HELP_PAGE_URL} from '../../constants/Constants';

function AppBar() {
    return (
        <div className="appbar" id="appbar">
            <img src={logo} alt="Sysco Cloud Pricing" className="logo"/>
            <Navigation/>
            <a className="need-help-header-link" href={HELP_PAGE_URL} target="_BLANK" rel="noopener noreferrer">
                <QuestionCircleOutlined className="icdon"/> Need Help
            </a>
            <AccountWidget/>
        </div>
  );
}

export default AppBar;

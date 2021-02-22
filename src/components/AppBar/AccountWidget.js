import React from 'react';
import {CloseOutlined, LogoutOutlined, MenuOutlined, QuestionCircleOutlined,} from '@ant-design/icons';
import Navigation from './Navigation';
import {auth} from '../../utils/security/Auth';
import {UserDetailContext} from '../../containers/UserDetailContext';
import {HELP_PAGE_URL} from '../../constants/Constants';

class AccountWidget extends React.Component {
  state = {
    visible: false,
  };

  logoutButtonClicked = () => {
    auth.logOutRedirection();
  };

  toggleMenu = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  changeLanguage = (lng) => {
    const {i18n} = this.props;
    i18n.changeLanguage(lng);
  };

  logOut = async () => {
    window.location.reload();
  };

  openInNewTab(url) {
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    }
  }

  render() {
    const {visible} = this.state;
    const userDetailsObj = this.context.userDetailsData.userDetails;
    const displayName = Object.keys(userDetailsObj).length !== 0 ? `${userDetailsObj.firstName} ${userDetailsObj.lastName}` : 'N/A';
    return (
        <div className={visible ? 'account-widget open' : 'account-widget'}>
          <div
              id="user-widget"
              className={visible ? 'user-widget show' : 'user-widget'}>
            <div className="user">
              <div className="name">
                {displayName}
                <div className="welcome">Signed In</div>
              </div>
            </div>
            <div
                id="user-pic"
                className="user-pic hover-brighten"
                role="button"
                tabIndex="0"
                onKeyPress={this.toggleMenu}
                onClick={this.toggleMenu}>
              <div className="pic"/>
              <span className="menuicon fi flaticon-next "/>
            </div>
          </div>

        {visible && (
          <div
            id="account-menu"
            className="account-menu show"
            role="button"
            tabIndex="-1"
            onKeyPress={() => {}}
            onClick={this.toggleMenu}>
            <Navigation />
            <ul>
              <li className="hide">
                <div className="menulabel">Profile</div>
                <span className="icon fi flaticon-account" />
              </li>
              <li className="hide">
                <div className="menulabel">Settings</div>

                <span className="icon fi flaticon-tools" />
              </li>
              <li className="hide">
                <div className="menulabel">
                  <div>Change Language</div>
                  <div className="sub-text">English</div>
                </div>
                <span className="icon fi flaticon-preferences" />
                <div className="submenu">
                  <ul>
                    <li tabIndex="-2">
                      <span className="linkbutton">English</span>
                    </li>
                    <li tabIndex="-3">
                      <span className="linkbutton">Spanish</span>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="hide">
                <div className="menulabel">Manage Users</div>
                <span className="icon fi flaticon-user"/>
              </li>
              <li onClick={() => this.openInNewTab(HELP_PAGE_URL)} className="">
                <QuestionCircleOutlined className="icon"/>
                <div className="menulabel">Help &amp; Training</div>
              </li>
              <li onClick={() => this.logoutButtonClicked()}>
                <LogoutOutlined className="icon"/>
                <div className="menulabel">Logout</div>
              </li>
            </ul>
          </div>
        )}
        {visible && (
          <div
            role="button"
            tabIndex="-4"
            onKeyPress={() => {}}
            className="backgroundClickContainer"
            onClick={this.toggleMenu}
          />
        )}
        {!visible && (
          <div
            role="button"
            tabIndex="-4"
            onKeyPress={() => {}}
            className="sidemenu-toggle"
            onClick={this.toggleMenu}>
            <MenuOutlined />
          </div>
        )}
        <div
          role="button"
          tabIndex="-5"
          onKeyPress={() => {}}
          className={visible ? 'sidemenu-closer show' : 'sidemenu-closer'}
          onClick={this.toggleMenu}>
          <CloseOutlined />
        </div>
      </div>
    );
  }
}
AccountWidget.contextType = UserDetailContext;
export default AccountWidget;

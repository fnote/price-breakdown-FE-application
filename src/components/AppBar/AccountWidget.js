import React from "react";

class AccountWidget extends React.Component {
  state = {
    visible: false
  };
  logoutButtonClicked = async () => {
    // await Auth.signOut();
  };
  toggleMenu = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  changeLanguage = lng => {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
  };

  logOut = async () => {
    // await Auth.signOut();
    window.location.reload();
  };

  render() {
    const { visible } = this.state;

    return (
      <div className={visible ? "account-widget open" : "account-widget"}>
        <div
          id="user-widget"
          className={visible ? "user-widget show" : "user-widget"}
        >
          <div className="user">
            <div className="name">
                milu8609
              <div className="welcome">Signed In</div>
            </div>
          </div>
          <div
            id="user-pic"
            className="user-pic hover-brighten"
            role="button"
            tabIndex="0"
            onKeyPress={this.toggleMenu}
            onClick={this.toggleMenu}
          >
            <div className="pic"/>
            <span className="menuicon fi flaticon-next " />
          </div>
        </div>

        {visible && (
          <div
            id="account-menu"
            className="account-menu show"
            role="button"
            tabIndex="-1"
            onKeyPress={() => {}}
            onClick={this.toggleMenu}
          >
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
                <span className="icon fi flaticon-user" />
              </li>
              <li>
                <div className="menulabel">Help &amp; Training</div>
                <span className="icon fi flaticon-question" />
              </li>
              <li onClick={() => this.logoutButtonClicked()}>
                <div className="menulabel">Logout</div>
                <span className="icon fi flaticon-logout" />
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
        <div
          role="button"
          tabIndex="-4"
          onKeyPress={() => {}}
          className="sidemenu-toggle"
          onClick={this.toggleMenu}
        >
          <i className="fi flaticon-menu"/>
        </div>
        <div
          role="button"
          tabIndex="-5"
          onKeyPress={() => {}}
          className={visible ? "sidemenu-closer show" : "sidemenu-closer"}
          onClick={this.toggleMenu}
        >
          <i className="fi flaticon-close"/>
        </div>
      </div>
    );
  }
}

export default AccountWidget;

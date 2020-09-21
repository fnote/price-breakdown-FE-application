import React from "react";
import logo from "../../styles/images/logo.svg";
import AccountWidget from "./AccountWidget";
import Navigation from "./Navigation";

function AppBar() {
  return (
    <div className="appbar" id="appbar">
      <img data-testid="logo" src={logo} alt="Sysco Cloud Pricing" className="logo" />
      <Navigation /> ss
      <AccountWidget />
    </div>
  );
}

export default AppBar;

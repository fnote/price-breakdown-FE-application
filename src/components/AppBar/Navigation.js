import React from "react";

function Navigation() {
  return (
    <ul className="navigation">
      <li ><i className="icon fi flaticon-accounting" />Pricing <span className="bold">Validation Tool</span></li>
      <li className="selected"><i className="icon fi flaticon-cloud" />Calculations via <span className="bold">File Upload</span></li>
    </ul>
  );
}

export default Navigation;

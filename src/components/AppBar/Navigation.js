import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { NAVIGATION_PATH_PRICE_VALIDATION, NAVIGATION_PATH_FILE_UPLOAD } from '../../constants/Constants';

const getClassName = (match, componentPath) => match.path === componentPath ? 'selected' : '';

function Navigation() {
  const match = useRouteMatch();
  return (
    <ul className="navigation">
      <li className={getClassName(match, NAVIGATION_PATH_PRICE_VALIDATION)}>
        <Link to={NAVIGATION_PATH_PRICE_VALIDATION}>
          <i className="icon fi flaticon-accounting" />Pricing <span className="bold">Validation Tool</span>
        </Link>        
      </li>
      <li className={getClassName(match, NAVIGATION_PATH_FILE_UPLOAD)}>
        <Link to={NAVIGATION_PATH_FILE_UPLOAD}>
          <i className="icon fi flaticon-cloud" />Calculations via <span className="bold">File Upload</span>
        </Link>
      </li>
    </ul>
  );
}

export default Navigation;

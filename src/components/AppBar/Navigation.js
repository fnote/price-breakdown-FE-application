import React from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import {NAVIGATION_PATH_FILE_UPLOAD, NAVIGATION_PATH_PRICE_VALIDATION} from '../../constants/Constants';

const getClassName = (match, componentPath) => (match.path === componentPath ? 'selected' : '');

function Navigation() {
  const match = useRouteMatch();
  return (
    <ul className="navigation">
      <Link to={NAVIGATION_PATH_PRICE_VALIDATION}>
          <li className={getClassName(match, NAVIGATION_PATH_PRICE_VALIDATION)}>
              <i className="icon fi flaticon-accounting"/>Pricing <span className="bold">Validation Tool</span>
          </li>
      </Link>
        <Link to={NAVIGATION_PATH_FILE_UPLOAD}>
            <li className={getClassName(match, NAVIGATION_PATH_FILE_UPLOAD)}>
                <i className="icon fi flaticon-cloud"/>Calculations via <span className="bold">File Upload</span>
            </li>
        </Link>
    </ul>
  );
}

export default Navigation;

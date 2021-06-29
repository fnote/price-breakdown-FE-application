import React from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import {NAVIGATION_PATH_FILE_UPLOAD, NAVIGATION_PATH_PRICE_VALIDATION , NAVIGATION_PATH_HISTORY_INQUIRY , NAVIGATION_PATH_PRICEZONE_REASSIGNMENT} from '../../constants/Constants';

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
      <Link to={NAVIGATION_PATH_HISTORY_INQUIRY}>
            <li className={getClassName(match, NAVIGATION_PATH_HISTORY_INQUIRY)}>
                <i className="icon fi flaticon-pricing-journey"/>Pricing <span className="bold">History Inquiry</span>
            </li>
        </Link>
        <Link to={NAVIGATION_PATH_FILE_UPLOAD}>
            <li className={getClassName(match, NAVIGATION_PATH_FILE_UPLOAD)}>
                <i className="icon fi flaticon-cloud"/>Calculations via <span className="bold">File Upload</span>
            </li>
        </Link>

        <Link to={NAVIGATION_PATH_PRICEZONE_REASSIGNMENT}>
            <li className={getClassName(match, NAVIGATION_PATH_PRICEZONE_REASSIGNMENT)}>
                <i className="icon fi flaticon-price-zone"/>pricezone <span className="bold">Reassignment</span>
            </li>
        </Link>
    </ul>
  );
}

export default Navigation;

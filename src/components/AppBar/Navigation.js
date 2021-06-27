import React, {useContext} from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import {
    NAVIGATION_PATH_FILE_UPLOAD,
    NAVIGATION_PATH_PRICE_VALIDATION,
    NAVIGATION_PATH_HISTORY_INQUIRY,
    NAVIGATION_PATH_PRICEZONE_REASSIGNMENT
} from '../../constants/Constants';
import {UserDetailContext} from '../../containers/UserDetailContext';

const getClassName = (match, componentPath) => (match.path === componentPath ? 'selected' : '');

function Navigation() {
    console.log('jjjjjjjjjjjjjjjj');
  const match = useRouteMatch();
  const userDetailContext = useContext(UserDetailContext);
  const userRole = userDetailContext.userDetailsData.userDetails.role;
  const cipzUserRole = userDetailContext.userDetailsData.userDetails.cipzRole;
  console.log('llllllllll');
  console.log(cipzUserRole);

  return (
    <ul className="navigation">
      <Link to={NAVIGATION_PATH_PRICE_VALIDATION}>
          {userRole !== '' && (<li className={getClassName(match, NAVIGATION_PATH_PRICE_VALIDATION)}>
              <i className="icon fi flaticon-accounting"/>Pricing <span className="bold">Validation Tool</span>
          </li>)}
      </Link>
      <Link to={NAVIGATION_PATH_HISTORY_INQUIRY}>
          {userRole !== '' && (<li className={getClassName(match, NAVIGATION_PATH_HISTORY_INQUIRY)}>
                <i className="icon fi flaticon-pricing-journey"/>Pricing <span className="bold">History Inquiry</span>
            </li>)}
        </Link>
        <Link to={NAVIGATION_PATH_FILE_UPLOAD}>
            {userRole !== '' && (<li className={getClassName(match, NAVIGATION_PATH_FILE_UPLOAD)}>
                <i className="icon fi flaticon-cloud"/>Calculations via <span className="bold">File Upload</span>
            </li>)}
        </Link>)
       <Link to={NAVIGATION_PATH_PRICEZONE_REASSIGNMENT}>
           {/*{cipzUserRole !== ''*/}
           {/* eslint-disable-next-line no-mixed-operators */}
           {cipzUserRole !== '' && (<li className={getClassName(match, NAVIGATION_PATH_PRICEZONE_REASSIGNMENT)}>
                <i className="icon fi flaticon-cloud"/>Price Zone <span className="bold">Reassignment</span>
            </li>)}
        </Link>
    </ul>
  );
}

export default Navigation;

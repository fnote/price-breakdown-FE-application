import React, {useContext} from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import {
    NAVIGATION_PATH_FILE_UPLOAD,
    NAVIGATION_PATH_PRICE_VALIDATION,
    NAVIGATION_PATH_PRICEZONE_REASSIGNMENT,
    SCREEN_PRICE_VALIDATION,
    SCREEN_FILE_UPLOAD,
    NAVIGATION_PATH_HISTORY_INQUIRY,
    SCREEN_CIPZ_REASSIGNMENT
} from '../../constants/Constants';
import {UserDetailContext} from '../../containers/UserDetailContext';
import {grantViewPermissionsToScreens} from '../../utils/CommonUtils';

const getClassName = (match, componentPath) => (match.path === componentPath ? 'selected' : '');

function Navigation() {
    const match = useRouteMatch();
    const userDetailContext = useContext(UserDetailContext);
    const userRole = userDetailContext?.userDetailsData?.userDetails?.role;
    const cipzUserRole = userDetailContext?.userDetailsData?.userDetails?.cipzRole;

    return (
        <ul className="navigation">
            <Link to={NAVIGATION_PATH_PRICE_VALIDATION}>
                {grantViewPermissionsToScreens(userRole, SCREEN_PRICE_VALIDATION) && (
                    <li className={getClassName(match, NAVIGATION_PATH_PRICE_VALIDATION)}>
                        <i className="icon fi flaticon-accounting"/>Pricing <span
                        className="bold">Validation Tool</span>
                    </li>)}
            </Link>
            <Link to={NAVIGATION_PATH_HISTORY_INQUIRY}>
                <li className={getClassName(match, NAVIGATION_PATH_HISTORY_INQUIRY)}>
                    <i className="icon fi flaticon-pricing-journey"/>Pricing <span className="bold">History Inquiry</span>
                </li>
            </Link>
            <Link to={NAVIGATION_PATH_FILE_UPLOAD}>
                {grantViewPermissionsToScreens(userRole, SCREEN_FILE_UPLOAD) && (
                    <li className={getClassName(match, NAVIGATION_PATH_FILE_UPLOAD)}>
                        <i className="icon fi flaticon-cloud"/>Calculations via <span
                        className="bold">File Upload</span>
                    </li>)}
            </Link>
            <Link to={NAVIGATION_PATH_PRICEZONE_REASSIGNMENT}>
                {grantViewPermissionsToScreens(cipzUserRole, SCREEN_CIPZ_REASSIGNMENT) && (
                    <li className={getClassName(match, NAVIGATION_PATH_PRICEZONE_REASSIGNMENT)}>
                        <i id="price-zone-reassignment-tab" className="icon fi flaticon-price-zone"/>Price Zone <span className="bold">Reassignment</span>
                    </li>)}
            </Link>
        </ul>
    );
}

export default Navigation;

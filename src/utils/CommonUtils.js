/**
 * @author Tharuka Jayalath
 * (C) 2020, Sysco Corporation
 * Created: 10/26/20. Mon 2020 15:00
 */

import {
    FILE_NAME_DISPLAY_LENGTH,
    ONLINE_STATUS_CHECK_URL,
    ROLE_SCREEN_PERMISSIONS,
    UNSUPPORTED_WEB_BROWSER_ALERT_CONTINUE_LOCAL_STORAGE,
    UNSUPPORTED_WEB_BROWSER_SCREEN_CONTINUE_LOCAL_STORAGE
} from '../constants/Constants';

const BUSINESS_UNIT_NAME_SPLITTER = 'Sysco ';

const extractNames = (businessUnitName = '', splitter = BUSINESS_UNIT_NAME_SPLITTER) => {
    const names = businessUnitName.split(splitter);
    if (names.length === 2) {
        return { name: businessUnitName, shortName: names[1] };
    }
    return { name: businessUnitName, shortName: businessUnitName };
};

const mapBusinessUnit = ({ bunit_id, bunit_name }) => ({
    id: bunit_id,
    ...extractNames(bunit_name)
});

export const createBusinessUnitMap = ({ authorizedPricingTransformationEnabledBunitList }) => {
    if (authorizedPricingTransformationEnabledBunitList && authorizedPricingTransformationEnabledBunitList instanceof Array) {
        const mappedBusinessUnits = authorizedPricingTransformationEnabledBunitList.map(({ bunit_id, bunit_name }) => [
            bunit_id, mapBusinessUnit({ bunit_id, bunit_name })
        ]);
        return new Map(mappedBusinessUnits);
    }

    return new Map();
};

export const formatBusinessUnit = (businessUnitId, businessUnits) => {
    const businessUnit = businessUnits.get(businessUnitId);
    return (businessUnit) ? `${businessUnit.id} - ${businessUnit.name}` : businessUnitId;
};

export const returnIdAndShortName = (idWithShortName) =>{
    return `${idWithShortName.id} - ${idWithShortName.shortName}`;
};

export const getBusinessUnitsIdShortName = (businessUnitId, businessUnitsMap) => {
    if (businessUnitsMap) {
        const idWithShortName = businessUnitsMap.get(businessUnitId);
        return returnIdAndShortName(idWithShortName);
    }
    return businessUnitId;
};

export const formatNumberInput = (value) => {
    const formatterRegex = /^-?\d+(?:\.\d{0,3})?/;

    if (value && !isNaN(value)) {
        const strVal = `${value}`;
        const matcherResult = strVal.match(formatterRegex);
        if (matcherResult) {
            return matcherResult[0];
        }
    }
    return value;
};

export const getDisplayFileName = (fileName) => ((fileName.length > FILE_NAME_DISPLAY_LENGTH)
    ? `${fileName.substr(0, FILE_NAME_DISPLAY_LENGTH - 1)}...` : fileName);

/**
 * Internet connectivity check. This function send a request to fetch the
 * favicon of the same application. The timestamp is appended to the request to
 * avoid receiving a cached response.
 */
export const checkOnlineStatus = async () => {
    try {
        // Here additionally time parameter is sent to avoid getting cached responses.
        const online = await fetch(ONLINE_STATUS_CHECK_URL + Date.now());
        return online.status >= 200 && online.status < 300; // either true or false
    } catch (err) {
        return false; // definitely offline
    }
};

export const grantViewPermissionsToScreens = (role, screen) => ROLE_SCREEN_PERMISSIONS?.[screen]?.[role];

/**
 * Class to manipulate Unsupported browser alert states.
 */
class UnsupportedBrowserState {
    setUnsupportedBrowserScreenContinue = () => {
        localStorage.setItem(UNSUPPORTED_WEB_BROWSER_SCREEN_CONTINUE_LOCAL_STORAGE, 'true');
    };

    isSetUnsupportedBrowserScreenContinue = () => localStorage.getItem(UNSUPPORTED_WEB_BROWSER_SCREEN_CONTINUE_LOCAL_STORAGE) !== null;

    clearUnsupportedBrowserScreenContinue = () => {
        localStorage.removeItem(UNSUPPORTED_WEB_BROWSER_SCREEN_CONTINUE_LOCAL_STORAGE);
    };

    setUnsupportedBrowserAlertContinue = () => {
        localStorage.setItem(UNSUPPORTED_WEB_BROWSER_ALERT_CONTINUE_LOCAL_STORAGE, 'true');
    };

    isSetUnsupportedBrowserAlertContinue = () => localStorage.getItem(UNSUPPORTED_WEB_BROWSER_ALERT_CONTINUE_LOCAL_STORAGE) !== null;

    clearUnsupportedBrowserAlertContinue = () => {
        localStorage.removeItem(UNSUPPORTED_WEB_BROWSER_ALERT_CONTINUE_LOCAL_STORAGE);
    };

    /**
     * clear all the states
     */
    clearUnsupportedBrowserStates = () => {
        this.clearUnsupportedBrowserAlertContinue();
        this.clearUnsupportedBrowserScreenContinue();
    }
}
export const unsupportedBrowserState = new UnsupportedBrowserState();

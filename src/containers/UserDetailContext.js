/**
 * Holds user context data.
 *
 * @author: adis0892 on 10/16/20
  * */

import React, { useState } from 'react';
import { createBusinessUnitMap, createBusinessUnitMapForPZR } from '../utils/CommonUtils';

export const UserDetailContext = React.createContext({
    userDetailsData: {},
    setUserDetails: () => {}

});

const mockAllowedOpco = {
    'cipzRole': '',
    'allActiveOpcos': [
        {
            'bunit_id': '018',
            'bunit_name': 'Sysco Baraboo',
            'batch_on': 'Y',
            'periscope_on': 'Y'
        },
        {
            'bunit_id': '019',
            'bunit_name': 'Sysco Cincinnati',
            'batch_on': 'Y',
            'periscope_on': 'Y'
        },
        {
            'bunit_id': '024',
            'bunit_name': 'Sysco Chicago',
            'batch_on': 'Y',
            'periscope_on': 'Y'
        },
    ]
};

const initialState = {
    isLoginSucceeded: false,
    userDetails: {},
    error: null,
    errorType: null
};

const UserDetailContextProvider = (props) => {
    const [userDetails, setUserDetails] = useState(initialState);
    const fetchUserDetailsHandler = (newStateData) => {
        const newUserDetails = newStateData.userDetails;
        if (newUserDetails && newUserDetails.authorizedPricingTransformationEnabledBunitList) {
            const modifiedUserDetails = {
                ...newUserDetails,
                businessUnitMap: createBusinessUnitMap(newUserDetails),
                allowedBussinessUnitMap: createBusinessUnitMapForPZR(mockAllowedOpco) // createBusinessUnitMapForPZR(newUserDetails)
            };
            const modifiedState = { ...newStateData, userDetails: modifiedUserDetails };
            setUserDetails(modifiedState);
        } else {
            setUserDetails(newStateData);
        }
    };

    return (
        <UserDetailContext.Provider value={{setUserDetails: fetchUserDetailsHandler, userDetailsData: userDetails}}>
            {props.children}
        </UserDetailContext.Provider>
    );
};

export default UserDetailContextProvider;

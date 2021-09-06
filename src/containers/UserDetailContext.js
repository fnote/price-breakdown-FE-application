/**
 * Holds user context data.
 *
 * @author: adis0892 on 10/16/20
 * */

import React, {useState} from 'react';
import {createBusinessUnitMap} from '../utils/CommonUtils';

export const UserDetailContext = React.createContext({
    userDetailsData: {},
    setUserDetails: () => {
        // This is intentional
    }

});

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
                activeBusinessUnitMap: createBusinessUnitMap({
                    authorizedPricingTransformationEnabledBunitList: newUserDetails.allActiveOpcos
                })
            };
            const modifiedState = {...newStateData, userDetails: modifiedUserDetails};
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

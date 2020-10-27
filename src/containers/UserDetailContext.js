/**
 * Holds user context data.
 *
 * @author: adis0892 on 10/16/20
 **/

import React, {useState} from 'react';
import { createBusinessUnitMap } from '../utils/CommonUtils';

export const UserDetailContext = React.createContext({
    userDetailsData: {},
    setUserDetails: () => {}

});

const initialState = {
    isLoginSucceeded: false,
    userDetails: {},
    error: null,
    errorType: null
};

const UserDetailContextProvider = props => {

    const [userDetails, setUserDetails] = useState(initialState);

    const fetchUserDetailsHandler = (newStateData) => {
        const { userDetails: newUserDetails } = newStateData;
        if (newUserDetails && newUserDetails.authorizedBunitList) {
            setUserDetails({ ...newStateData, businessUnitMap: createBusinessUnitMap(newUserDetails) })
        } else {
            setUserDetails(newStateData);
        }
    };

    return (
        <UserDetailContext.Provider value={{setUserDetails: fetchUserDetailsHandler, userDetailsData: userDetails}}>
            {props.children}
        </UserDetailContext.Provider>
    )
};


export default UserDetailContextProvider;

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
        console.log('updating user details state');
        if (newUserDetails && newUserDetails.authorizedBunitList) {
            const temp = { ...newStateData, businessUnitMap: createBusinessUnitMap(newUserDetails) };
            console.log('******************************');
            console.log(temp);
            console.log('******************************');
            setUserDetails(temp);
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

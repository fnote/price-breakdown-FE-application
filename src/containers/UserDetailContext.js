import React, {useState} from 'react';
import {AUTH_FAILURE_TYPE_UNAUTHENTICATED} from '../utils/Constants';


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
        setUserDetails(newStateData)
    };

    return (
        <UserDetailContext.Provider value={{setUserDetails: fetchUserDetailsHandler, userDetailsData: userDetails}}>
            {props.children}
        </UserDetailContext.Provider>
    )
};


export default UserDetailContextProvider;

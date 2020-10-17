import React, {useState} from 'react';


export const UserDetailContext = React.createContext({
    userDetailsData: {},
    setUserDetails: () => {}

});

const initialState = {
    isLoginSucceeded: false,
    userDetails: {},
    error: null
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

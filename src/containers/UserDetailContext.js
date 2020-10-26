/**
 * Holds user context data.
 *
 * @author: adis0892 on 10/16/20
 **/

import React, {useState} from 'react';
import { createBusinessUnitMap } from '../utils/CommonUtils';

// const authorizedBunitList = [
//     {
//       "bunit_id": "011",
//       "bunit_name": "Sysco Louisville",
//       "periscope_on": "Y"
//     },
//     {
//       "bunit_id": "019",
//       "bunit_name": "Sysco Cincinnati",
//       "periscope_on": "Y"
//     },
//     {
//       "bunit_id": "038",
//       "bunit_name": "Sysco Indianapolis",
//       "periscope_on": "Y"
//     },
//     {
//       "bunit_id": "056",
//       "bunit_name": "Sysco Boston-QA",
//       "periscope_on": "Y"
//     },
//     {
//       "bunit_id": "058",
//       "bunit_name": "Sysco Detroit",
//       "periscope_on": "Y"
//     },
//     {
//       "bunit_id": "068",
//       "bunit_name": "Sysco Grand Rapids",
//       "periscope_on": "Y"
//     }
//   ];
// const temp ={userDetails:  {
//     authorizedBunitList,
//     "firstName": "Tharuka",
//     "lastName": "Jayalath",
//     "username": "tjay5771",
//     "email": "Tharuka.Jayalath@syscolabs.com",
//     "jobTitle": "Sysco Labs Sri Lanka Associate",
//     "role": "appadmin",
//     "businessUnitMap": createBusinessUnitMap({ authorizedBunitList })
//   }};

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
        const { userDetails } = newStateData;
        if (userDetails && userDetails.authorizedBunitList) {
            setUserDetails({ ...newStateData, businessUnitMap: createBusinessUnitMap(userDetails) })
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

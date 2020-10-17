// import React, {useState} from 'react';
// import {auth} from '../../utils/security/Auth';
// import {AUTH_STATE_COMPLETED, AUTH_STATE_FAILED} from '../../utils/Constants';
// import {USER_AUTHENTICATION} from '../../actions/ActionType';
//
// export const LoginContext = React.createContext({
//     userDetailsData: {},
//     setUserDetails: () => {}
//
// });
//
// const initialState = {
//     isLoginSucceeded: false,
//     userDetails: {},
//     error: null
// };
//
// const LoginContextProvider = props => {
//
//     const [userDetails, setUserDetails] = useState(initialState);
//
//     const fetchUserDetailsHandler = (newStateData) => {
//         setUserDetails(newStateData)
//     };
//
//     return (
//         <LoginContext.Provider value={{setUserDetails: fetchUserDetailsHandler, userDetailsData: userDetails}}>
//             {props.children}
//         </LoginContext.Provider>
//     )
// };
//
//
// export default LoginContextProvider;

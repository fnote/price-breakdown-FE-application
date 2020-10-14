/**
 * Different actions based on different action types.
 *
 * @author: adis0892 on 6/21/18
 **/

import {auth} from "../utils/security/Auth";
import {USER_AUTHENTICATION} from './ActionType';
import {AUTH_STATE_COMPLETED, AUTH_STATE_FAILED} from '../utils/Constants';

export const fetchUserDetails = () => {
    return dispatch => {
        return auth.callUserDetails()
            .then((data) => {
                let payloadData = {
                    isLoginSucceeded: false,
                    userDetails: {},
                    error: null
                }

                console.log(data)

                if (data.status === 200) {
                    payloadData.isLoginSucceeded = true;
                    payloadData.userDetails = data.userDetailResponse;
                    auth.setUserLoggedInState(AUTH_STATE_COMPLETED);
                } else if (data.status === 401) {
                    payloadData.isLoginSucceeded = false;
                    payloadData.error = data.userDetailResponse;
                    auth.setUserLoggedInState();
                } else {
                    payloadData.isLoginSucceeded = false;
                    payloadData.error = {
                        "status": "Unauthorized",
                        "message": "User cannot be authenticated",
                        "cause": "Unexpected error occurred"
                    }
                    auth.setUserLoggedInState(AUTH_STATE_FAILED);
                }

                console.log(payloadData)

                dispatch({
                    type: USER_AUTHENTICATION,
                    payload: payloadData
                })
            })
            .catch((err) => {
                console.log(err)
            })
    };
};

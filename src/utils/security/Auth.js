import {getBffUrlConfig} from "../Configs";
import {
    AUTH_FAILURE_TYPE_UNAUTHENTICATED, AUTH_FAILURE_TYPE_UNEXPECTED_ERROR,
    AUTH_STATE_COMPLETED,
    AUTH_STATE_FAILED,
    AUTH_STATE_PENDING
} from '../Constants';

class Auth {
    constructor() {
        this.bffUrlConfig = getBffUrlConfig();
    }

    getLoginPage = () => {
        window.location.assign(this.bffUrlConfig.loginRedirectionUrl);
        this.setUserLoggedInState(AUTH_STATE_PENDING);
    }

    logOutRedirection = () => {
        console.log('logout')
        localStorage.removeItem('auth_user');
        // window.location.assign(this.bffUrlConfig.logOutRedirectionUrl);
    }

    //based on local storage value which preserved even after page refreshes
    isUserLoginCompleted = () => {
        return localStorage.getItem('auth_user') === AUTH_STATE_COMPLETED;
    }

    shouldFetchUserDetailsAgain = (userContext) => {
        console.log(userContext.userDetailsData.isLoginSucceeded);

        return localStorage.getItem('auth_user') === AUTH_STATE_COMPLETED && userContext.userDetailsData.isLoginSucceeded !== true;
    }

    isUserLoginPending = () => {
        return localStorage.getItem('auth_user') === AUTH_STATE_PENDING;
    }

    setUserLoggedInState = (state) => {
        localStorage.setItem('auth_user', state);
    }

    callUserDetails = () => {
        return fetch(this.bffUrlConfig.userDetailsUrl, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
            .then(res => Promise.all([res.status, res.json()]))
            .then(([status, userDetailResponse]) => {
                console.log(userDetailResponse);
                console.log(status);
                return {status, userDetailResponse};
            })
            .catch((err) => {
                console.log(err)
            });
    }

    userDetailContextHandler = (userDetailContext, appLoaderContext) => {
        const generalErrorResponse = {
            "status": "Unauthorized",
            "message": "User cannot be authenticated",
            "cause": "Unexpected error occurred"
        };

        this.callUserDetails()
            .then((data) => {
                let payloadData = {
                    isLoginSucceeded: false,
                    userDetails: {},
                    error: null,
                    errorType: null
                }

                console.log(data)

                if (data.status === 200) {
                    payloadData.isLoginSucceeded = true;
                    payloadData.userDetails = data.userDetailResponse;
                    auth.setUserLoggedInState(AUTH_STATE_COMPLETED);
                } else if (data.status === 401) {
                    payloadData.isLoginSucceeded = false;
                    payloadData.error = data.userDetailResponse;
                    payloadData.errorType = AUTH_FAILURE_TYPE_UNAUTHENTICATED;
                        auth.setUserLoggedInState(AUTH_STATE_FAILED);
                } else {
                    payloadData.isLoginSucceeded = false;
                    payloadData.error = generalErrorResponse;
                    payloadData.errorType = AUTH_FAILURE_TYPE_UNEXPECTED_ERROR;
                    auth.setUserLoggedInState(AUTH_STATE_FAILED);
                }

                userDetailContext.setUserDetails(payloadData);
                appLoaderContext.setAppLoadingState(false);
            })
            .catch(() => {
                const errorPayloadData = {};
                errorPayloadData.isLoginSucceeded = false;
                errorPayloadData.error = generalErrorResponse;
                errorPayloadData.errorType = AUTH_FAILURE_TYPE_UNEXPECTED_ERROR;
                auth.setUserLoggedInState(AUTH_STATE_FAILED);

                userDetailContext.setUserDetails(errorPayloadData);
                appLoaderContext.setAppLoadingState(false);
            })
    }

}
export const auth = new Auth();

import {getBffUrlConfig} from '../Configs';
import {
    AUTH_FAILURE_TYPE_UNAUTHENTICATED, AUTH_FAILURE_TYPE_UNEXPECTED_ERROR,
    AUTH_STATE_COMPLETED,
    AUTH_STATE_FAILED,
    AUTH_STATE_PENDING,
    UNEXPECTED_ERROR_CODE
} from '../../constants/Constants';

/**
 * Auth related functions.
 *
 * @author: adis0892 on 10/16/20
 * */

class Auth {
    constructor() {
        this.bffUrlConfig = getBffUrlConfig();
    }

    getLoginPage = () => {
        window.location.assign(this.bffUrlConfig.loginRedirectionUrl);
        this.setUserLoggedInState(AUTH_STATE_PENDING);
    };

    logOutRedirection = () => {
        localStorage.removeItem('auth_user');
        window.location.assign(this.bffUrlConfig.logOutRedirectionUrl);
    };

    // based on local storage value which preserved even after page refreshes
    isUserLoginCompleted = () => localStorage.getItem('auth_user') === AUTH_STATE_COMPLETED;

    shouldFetchUserDetailsAgain = (userContext) => localStorage.getItem('auth_user') === AUTH_STATE_COMPLETED
        && userContext.userDetailsData.isLoginSucceeded !== true;

    isUserLoginPending = () => localStorage.getItem('auth_user') === AUTH_STATE_PENDING;

    setUserLoggedInState = (state) => {
        localStorage.setItem('auth_user', state);
    };

    callUserDetails = () => fetch(this.bffUrlConfig.userDetailsUrl, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
            .then((res) => Promise.all([res.status, res.json()]))
            .then(([status, userDetailResponse]) => ({status, userDetailResponse}))
            .catch(() => ({status: UNEXPECTED_ERROR_CODE, userDetailResponse: {}}));

    userDetailContextHandler = (userDetailContext, appLoaderContext) => {
        const generalErrorResponse = {
            'status': 'Unauthorized',
            'message': 'User cannot be authenticated',
            'cause': 'Unexpected error occurred'
        };

        this.callUserDetails()
            .then((data) => {
                const payloadData = {
                    isLoginSucceeded: false,
                    userDetails: {},
                    error: null,
                    errorType: null
                };

                if (data.status === 401) {
                    payloadData.isLoginSucceeded = true;
                    payloadData.userDetails = data.userDetailResponse;
                    this.setUserLoggedInState(AUTH_STATE_COMPLETED);
                } else if (data.status === 401) {
                    payloadData.isLoginSucceeded = false;
                    payloadData.error = data.userDetailResponse;
                    payloadData.errorType = AUTH_FAILURE_TYPE_UNAUTHENTICATED;
                    this.setUserLoggedInState(AUTH_STATE_FAILED);
                } else {
                    payloadData.isLoginSucceeded = false;
                    payloadData.error = generalErrorResponse;
                    payloadData.errorType = AUTH_FAILURE_TYPE_UNEXPECTED_ERROR;
                    this.setUserLoggedInState(AUTH_STATE_FAILED);
                }

                userDetailContext.setUserDetails(payloadData);
                appLoaderContext.setAppLoadingState(false);
            })
            .catch(() => {
                const errorPayloadData = {
                    isLoginSucceeded: false,
                    error: generalErrorResponse,
                    errorType: AUTH_FAILURE_TYPE_UNEXPECTED_ERROR,
                };
                this.setUserLoggedInState(AUTH_STATE_FAILED);

                userDetailContext.setUserDetails(errorPayloadData);
                appLoaderContext.setAppLoadingState(false);
            });
    }
}
export const auth = new Auth();

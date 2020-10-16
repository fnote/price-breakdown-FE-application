import {getBffUrlConfig} from "../Configs";
import {AUTH_STATE_COMPLETED, AUTH_STATE_PENDING} from '../Constants';

class Auth {
    constructor() {
        this.bffUrlConfig = getBffUrlConfig();
    }

    getLoginPage = () => {
        window.location.assign(this.bffUrlConfig.loginRedirectionUrl);
        localStorage.setItem('auth_user', AUTH_STATE_PENDING);
    }

    logOutRedirection = () => {
        localStorage.removeItem('auth_user');
        window.location.assign(this.bffUrlConfig.logOutRedirectionUrl);
    }

    isUserLoggedIn = () => {
        return localStorage.getItem('auth_user') === AUTH_STATE_COMPLETED;
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
            headers: {'Content-Type': 'application/json',
                credentials: 'include'
            },
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

}
export const auth = new Auth();

import {getAuthConfig} from "../Configs";
import temp from '../../reducers/temp.json';

class Auth {
    constructor() {
        this.authConfig = getAuthConfig();
    }

    getLoginPage = () => {
        window.location.assign(this.authConfig.loginRedirectionUrl);
        localStorage.setItem('auth_user', 'pending');
    }

    logOutRedirection = () => {
        localStorage.removeItem('auth_user');
        window.location.assign(this.authConfig.logOutRedirectionUrl);
    }

    isUserLoggedIn = () => {
        return localStorage.getItem('auth_user') !== null;
    }

    isUserLoginPending = () => {
        return localStorage.getItem('auth_user') === 'pending';
    }

    callUserDetails = () => {
        fetch('http://localhost:4000/exe/v1/pci-bff/auth/user-details', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => Promise.all([res.status, res.json()]))
            .then(([status, jsonData]) => {
                console.log(jsonData);
                console.log(status);
                return {status, jsonData};
            })
            .catch((err) => {
                console.log(err)
            });
    }

}
export const auth = new Auth();

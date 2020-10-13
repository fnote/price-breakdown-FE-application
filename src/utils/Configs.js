/**
 * Config file
 *
 * @author: adis0892 on 10/07/20
 **/

export const getAuthConfig = () => {
    let CONFIG = {};
    if (process.env.REACT_APP_ENV === 'dev') {
        CONFIG.loginRedirectionUrl = 'https://cloud-pci-bff-dev.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/login';
        CONFIG.logOutRedirectionUrl = 'https://cloud-pci-bff-dev.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/logout';
    } else if (process.env.REACT_APP_ENV === 'exe') {
        CONFIG.loginRedirectionUrl = 'https://cloud-pci-bff-exe.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/login';
        CONFIG.logOutRedirectionUrl = 'https://cloud-pci-bff-exe.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/logout';
    } else if (process.env.REACT_APP_ENV === 'prod') {
        CONFIG.loginRedirectionUrl = 'https://cloud-pci-bff-exe.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/login';
        CONFIG.logOutRedirectionUrl = 'https://cloud-pci-bff-exe.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/logout';
    } else {
        CONFIG.loginRedirectionUrl = 'http://localhost:4000/exe/v1/pci-bff/auth/login';
        CONFIG.logOutRedirectionUrl = 'http://localhost:4000/exe/v1/pci-bff/auth/logout';
    }
    return CONFIG;
};
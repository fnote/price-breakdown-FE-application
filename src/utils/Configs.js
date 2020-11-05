/**
 * Config file
 *
 * @author: adis0892 on 10/07/20
 **/

export const getBffUrlConfig = () => {
    let CONFIG = {};
    if (process.env.REACT_APP_ENV === 'dev') {
        CONFIG.priceDataEndpoint = 'https://cloud-pci-bff-dev.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/pricing/pricing-data';
        CONFIG.loginRedirectionUrl = 'https://cloud-pci-bff-dev.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/login';
        CONFIG.logOutRedirectionUrl = 'https://cloud-pci-bff-dev.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/logout';
        CONFIG.userDetailsUrl = 'https://cloud-pci-bff-dev.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/user-details';
    } else if (process.env.REACT_APP_ENV === 'exe') {
        CONFIG.priceDataEndpoint = 'https://cloud-pci-bff-exe.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/pricing/pricing-data';
        CONFIG.loginRedirectionUrl = 'https://cloud-pci-bff-exe.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/login';
        CONFIG.logOutRedirectionUrl = 'https://cloud-pci-bff-exe.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/logout';
        CONFIG.userDetailsUrl = 'https://cloud-pci-bff-exe.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/user-details';
    } else if (process.env.REACT_APP_ENV === 'stg') {
        CONFIG.priceDataEndpoint = 'https://cloud-pci-bff-stg.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/pricing/pricing-data';
        CONFIG.loginRedirectionUrl = 'https://cloud-pci-bff-stg.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/login';
        CONFIG.logOutRedirectionUrl = 'https://cloud-pci-bff-stg.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/logout';
        CONFIG.userDetailsUrl = 'https://cloud-pci-bff-stg.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/auth/user-details';
    } else if (process.env.REACT_APP_ENV === 'prod') {
        CONFIG.priceDataEndpoint = 'https://cloud-pci-bff-prod.prcp.us-east-1.aws.sysco.net/v1/pci-bff/pricing/pricing-data';
        CONFIG.loginRedirectionUrl = 'https://cloud-pci-bff-prod.prcp.us-east-1.aws.sysco.net/v1/pci-bff/auth/login';
        CONFIG.logOutRedirectionUrl = 'https://cloud-pci-bff-prod.prcp.us-east-1.aws.sysco.net/v1/pci-bff/auth/logout';
        CONFIG.userDetailsUrl = 'https://cloud-pci-bff-prod.prcp.us-east-1.aws.sysco.net/v1/pci-bff/auth/user-details';
    } else {
        CONFIG.priceDataEndpoint = 'http://localhost:4000/local/v1/pci-bff/pricing/pricing-data';
        CONFIG.loginRedirectionUrl = 'http://localhost:4000/local/v1/pci-bff/auth/login';
        CONFIG.logOutRedirectionUrl = 'http://localhost:4000/local/v1/pci-bff/auth/logout';
        CONFIG.userDetailsUrl = 'http://localhost:4000/local/v1/pci-bff/auth/user-details';

    }
    return CONFIG;
};

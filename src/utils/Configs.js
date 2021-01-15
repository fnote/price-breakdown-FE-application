/**
 * Config file
 *
 * @author: adis0892 on 10/07/20
 * */

export const getBffUrlConfig = () => {
    const CONFIG = {};
    if (process.env.REACT_APP_ENV === 'dev') {
        CONFIG.bffBaseUrl = 'https://cloud-pci-bff-dev.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/';
    } else if (process.env.REACT_APP_ENV === 'exe') {
        CONFIG.bffBaseUrl = 'https://cloud-pci-bff-exe.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/';
    } else if (process.env.REACT_APP_ENV === 'stg') {
        CONFIG.bffBaseUrl = 'https://cloud-pci-bff-stg.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/';
    } else if (process.env.REACT_APP_ENV === 'prod') {
        CONFIG.bffBaseUrl = 'https://cloud-pci-bff-prod.prcp.us-east-1.aws.sysco.net/v1/pci-bff/';
    } else {
        CONFIG.bffBaseUrl = 'http://localhost:4000/local/v1/pci-bff/';
    }

    // Auth apis
    CONFIG.loginRedirectionUrl = CONFIG.bffBaseUrl + 'auth/login';
    CONFIG.logOutRedirectionUrl = CONFIG.bffBaseUrl + 'auth/logout';
    CONFIG.userDetailsUrl = CONFIG.bffBaseUrl + 'auth/user-details';

    // Batch apis
    CONFIG.listSearchFilesEndpoint = CONFIG.bffBaseUrl + 'batch/files/';
    CONFIG.listOutputFilesEndpoint = CONFIG.bffBaseUrl + 'batch/files/output';
    CONFIG.bathcJobDeleteEndpointBaseUrl = CONFIG.bffBaseUrl + 'batch/jobs/';
    CONFIG.outputBucketFilesSignedUrlEndpoint = CONFIG.bffBaseUrl + 'batch/signed-url/output';
    CONFIG.fileUploadUrl = CONFIG.bffBaseUrl + 'batch/signed-url/input';

    //Pricing apis
    CONFIG.priceDataEndpoint = CONFIG.bffBaseUrl + 'pricing/pricing-data';

    return CONFIG;
};

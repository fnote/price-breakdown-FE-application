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
        CONFIG.bffBaseUrl = 'https://cloud-pci-bff-dev.prcp-np.us-east-1.aws.sysco.net/v1/pci-bff/';
    }

    // Auth apis
    CONFIG.loginRedirectionUrl = `${CONFIG.bffBaseUrl}auth/login`;
    CONFIG.logOutRedirectionUrl = `${CONFIG.bffBaseUrl}auth/logout`;
    CONFIG.userDetailsUrl = `${CONFIG.bffBaseUrl}auth/user-details`;

    // Batch apis
    CONFIG.filesUploadUrl = `${CONFIG.bffBaseUrl}batch/files/signed-url/input`;
    CONFIG.filesDownloadUrl = `${CONFIG.bffBaseUrl}batch/files/signed-url/output`;
    CONFIG.batchJobsUrl = `${CONFIG.bffBaseUrl}batch/jobs`;

    // Pricing apis
    CONFIG.priceDataEndpoint = `${CONFIG.bffBaseUrl}pricing/pricing-data`;

    // history inquiry apis
    CONFIG.historyInquiryEndpoint = `${CONFIG.bffBaseUrl}pricing/transaction-history`;

    // PZR APIs
    CONFIG.pzrUpdateRequestsUrl = `${CONFIG.bffBaseUrl}price-zone-reassignment/pz-update-requests`;
    CONFIG.priceZoneReassignmentSearchUrl = `${CONFIG.bffBaseUrl}price-zone-reassignment/search`;
    CONFIG.priceZoneReassignmentGetItemAttributeUrl = `${CONFIG.bffBaseUrl}price-zone-reassignment/item-attribute-groups`;
    // CIPZ apis
    CONFIG.pzUpdateRequests = `${CONFIG.bffBaseUrl}price-zone-reassignment/pz-update-requests`;
    CONFIG.pzUpdates = `${CONFIG.bffBaseUrl}price-zone-reassignment/pz-updates/:request_id`;
    CONFIG.pzTransactedAttributeGroups = `${CONFIG.bffBaseUrl}price-zone-reassignment/pz-update-requests/item-attribute-groups`;
    CONFIG.pzTransactedBusinessUnits = `${CONFIG.bffBaseUrl}price-zone-reassignment/pz-update-requests/opcos`;
    return CONFIG;
};

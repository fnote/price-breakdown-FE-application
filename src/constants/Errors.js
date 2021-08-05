const ErrorCodes = {
    UNEXPECTED_ERROR: 10008,
    PERISCOPE_NOT_ENABLED_OPCO_ERROR: 114,
    INVALID_CUSTOMER_ACCOUNT_ERROR: 115,
    INVALID_CUSTOMER_ACCOUNT_TYPE_ERROR: 116,
    INVALID_OLD_PRICE_REQUEST_DATE_ERROR: 106,
    INVALID_FUTURE_PRICE_REQUEST_DATE_ERROR: 107,
    PRODUCT_NOT_FOUND_ERROR: 200,
    INVALID_SPLIT_ERROR: 207,
    UNEXPECTED_PRICING_ENGINE_ERROR: 223,
    PRICING_ENGINE_ERROR: 197,
    PRODUCT_INFO_API_ERROR: 2022,
    CUSTOMER_INFO_API_ERROR: 2025,

    // SEED Errors
    SEED_NO_RESULTS_ERROR: 101001,
    SEED_UNKNOWN_ERROR: 101000,
    INVALID_CUSTOMER_ACCOUNT_PZR_ERROR: 5000,
    INVALID_CUSTOMER_GROUP_ERROR: 5001,
    ITEM_ATTRIBUTE_GROUP_FETCH_ERROR: 4028,

    // CPIZ errors
    CIPZ_ALREADY_APPROVED_OR_REJECTED: 102066,
    CIPZ_PROVIDED_INVALID_OFFSET: 102003,
    CIPZ_VALID_PRICE_ZONE_DATA_UNAVAILABLE: 102082,
    CIPZ_PRICE_ZONE_ALREADY_ASSIGNED: 102083,

};

const ErrorMessages = {
    UNEXPECTED_ERROR: 'Something went wrong',
    PERISCOPE_NOT_ENABLED_OPCO_ERROR: 'The service is not enabled for this business unit',
    INVALID_CUSTOMER_ACCOUNT_ERROR: 'Provided customer account is incorrect',
    INVALID_CUSTOMER_ACCOUNT_PZR_ERROR: 'Your search did not found any match',
    INVALID_CUSTOMER_ACCOUNT_TYPE_ERROR: 'Provided customer is not eligible for this pricing',
    INVALID_OLD_PRICE_REQUEST_DATE_ERROR: 'Provided date is too far into the past',
    INVALID_FUTURE_PRICE_REQUEST_DATE_ERROR: 'Provided date is too far into the future',
    PRODUCT_NOT_FOUND_ERROR: 'Could not retrieve the product',
    INVALID_SPLIT_ERROR: 'Invalid split requested',
    UNEXPECTED_PRICING_ENGINE_ERROR: 'Unexpected error occurred while pricing the product',
    PRICING_ENGINE_ERROR: 'Unexpected error occurred while pricing the product',
    PRODUCT_INFO_API_ERROR: 'Could not retrieve the product information',
    CUSTOMER_INFO_API_ERROR: 'Could not retrieve the customer information',
    CONNECTION_ISSUE_ERROR: 'Could not retrieve the information due to connection issue',
    INVALID_CUSTOMER_GROUP_ERROR: 'Your search did not found any match',
    SEARCH_NOT_FOUND: 'Search not found',
};

const ErrorsMap = new Map([
    [ErrorCodes.UNEXPECTED_ERROR, ErrorMessages.UNEXPECTED_ERROR],
    [ErrorCodes.PERISCOPE_NOT_ENABLED_OPCO_ERROR, ErrorMessages.PERISCOPE_NOT_ENABLED_OPCO_ERROR],
    [ErrorCodes.INVALID_CUSTOMER_ACCOUNT_ERROR, ErrorMessages.INVALID_CUSTOMER_ACCOUNT_ERROR],
    [ErrorCodes.INVALID_CUSTOMER_ACCOUNT_TYPE_ERROR, ErrorMessages.INVALID_CUSTOMER_ACCOUNT_TYPE_ERROR],
    [ErrorCodes.INVALID_OLD_PRICE_REQUEST_DATE_ERROR, ErrorMessages.INVALID_OLD_PRICE_REQUEST_DATE_ERROR],
    [ErrorCodes.INVALID_FUTURE_PRICE_REQUEST_DATE_ERROR, ErrorMessages.INVALID_FUTURE_PRICE_REQUEST_DATE_ERROR],
    [ErrorCodes.PRODUCT_NOT_FOUND_ERROR, ErrorMessages.PRODUCT_NOT_FOUND_ERROR],
    [ErrorCodes.INVALID_SPLIT_ERROR, ErrorMessages.INVALID_SPLIT_ERROR],
    [ErrorCodes.UNEXPECTED_PRICING_ENGINE_ERROR, ErrorMessages.UNEXPECTED_PRICING_ENGINE_ERROR],
    [ErrorCodes.PRICING_ENGINE_ERROR, ErrorMessages.PRICING_ENGINE_ERROR],
    [ErrorCodes.PRODUCT_INFO_API_ERROR, ErrorMessages.PRODUCT_INFO_API_ERROR],
    [ErrorCodes.CUSTOMER_INFO_API_ERROR, ErrorMessages.CUSTOMER_INFO_API_ERROR],
    [ErrorCodes.INVALID_CUSTOMER_ACCOUNT_PZR_ERROR, ErrorMessages.INVALID_CUSTOMER_ACCOUNT_PZR_ERROR],
    [ErrorCodes.INVALID_CUSTOMER_GROUP_ERROR, ErrorMessages.INVALID_CUSTOMER_GROUP_ERROR],
]);

export const CIPZErrorMessages = {
    FETCH_ITEM_ATTRIBUTE_ERROR_TITLE: 'Sorry we could not retrieve the attribute group information. Please refresh again.',
    FETCH_ITEM_ATTRIBUTE_ERROR_MESSAGE: 'Could not retrieve the attribute group information due to connection issue.',
    FETCH_SEARCH_RESULTS_TITLE: 'Sorry we could not retrieve the information. Please try again later.',
    FETCH_SEARCH_RESULTS_ERROR_MESSAGE: 'Could not retrieve the information due to connection issue.',
    UNKNOWN_ERROR_OCCURRED: 'Something went wrong. Please try again later.',
    GENERIC_SEED_SEARCH_ERROR: 'Error occurred while fetching the search results from SEED.',
    GENERIC_CIPZ_POST_ERROR_MESSAGE: 'Error occurred while processing price zone change request. Make sure all values are correct.',
    UNEXPECTED_GENERIC_CIPZ_POST_ERROR_MESSAGE: 'Unexpected Error occurred while processing price zone change request. Please try again later.',
    CIPZ_POST_ERROR_TITLE: 'Sorry we could not update the requested price zone. Please try again later.',
    FETCH_CIPZ_API_DATA_TITLE: 'Sorry we could not retrieve the information.',
    FETCH_CIPZ_PENDING_APPROVAL_REQUEST_SUMMARY_MESSAGE: 'Could not retrieve the approval request page due to connection issue.',
    FETCH_CIPZ_REFERENCE_TABLE_ERROR_MESSAGE: 'Could not retrieve the reference page due to connection issue.',
    APPROVE_CIPZ_API_FAILIURE_TITLE: 'Sorry we could not approve the request. Please try again later.',
    APPROVE_CIPZ_API_FAILIURE_MESSAGE: 'Could not approve the request due to connection issue.',
    REJECT_CIPZ_API_FAILIURE_TITLE: 'Sorry we could not reject the request. Please try again later.',
    REJECT_CIPZ_API_FAILIURE_MESSAGE: 'Could not reject the request due to connection issue.',
    ALREADY_REVIEWED_ALERT_TITLE: 'This change is already reviewed by another manager',
    ALREADY_REVIEWED_ALERT_MESSAGE: 'Please refresh the page to get latest pending approval items'
};

export const PZRSEEDErrorsMap = {
    '102010': 'Provided business unit is invalid in SEED',
    '102021': 'Provided customer account is invalid in SEED',
    '102023': 'Provided customer group is invalid in SEED',
    '102033': 'Provided item attribute group is invalid in SEED',
};

export const CIPZErrorsMap = {
    '102010': 'Provided business unit is invalid',
    '102011': 'Provided business unit is not active yet',
    '102022': 'Either Customer or Customer group should be provided',
    '102040': 'Provided price zone is invalid',
    '102050': 'Cannot get submitter details, Please try re-login',
    '102051': 'Cannot get submitter details, Please try re-login',
    '102052': 'Submission note must be provided',
    '102070': 'Provided effective from date is invalid',
    '102080': 'Your search did not find any match in SEED, Make sure correct Site, Customer/Customer Group is provided',
    '102081': 'An error occurred from SEED while processing your request. Please try again later',
    '101000': 'Could not update the requested price zone due to connection issue.',
};

// http Error Code
export const HTTP_INTERNAL_SERVER_ERROR = 500;
export const HTTP_NOT_FOUND_ERROR = 400;

export {ErrorCodes, ErrorMessages, ErrorsMap};

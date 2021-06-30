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
    ITEM_ATTRIBUTE_GROUP_FETCH_ERROR: 4028

};

const ErrorMessages = {
    UNEXPECTED_ERROR: 'Something went wrong',
    PERISCOPE_NOT_ENABLED_OPCO_ERROR: 'The service is not enabled for this business unit',
    INVALID_CUSTOMER_ACCOUNT_ERROR: 'Your search did not found any match.',
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
    INVALID_CUSTOMER_GROUP_ERROR: 'Your search did not found any match.',
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
    [ErrorCodes.INVALID_CUSTOMER_ACCOUNT_PZR_ERROR, ErrorMessages.INVALID_CUSTOMER_ACCOUNT_ERROR],
    [ErrorCodes.INVALID_CUSTOMER_GROUP_ERROR, ErrorMessages.INVALID_CUSTOMER_GROUP_ERROR],
]);

export const CIPZErrorMessages = {
    FETCH_ITEM_ATTRIBUTE_ERROR_TITLE: 'Sorry we could not retrieve the attribute group information. Please refresh again.',
    FETCH_ITEM_ATTRIBUTE_ERROR_MESSAGE: 'Could not retrieve the attribute group information due to connection issue.',
    FETCH_SEARCH_RESULTS_TITLE: 'Sorry we could not retrieve the information. Please try again later.',
    FETCH_SEARCH_RESULTS_MESSAGE: 'Could not retrieve the information due to connection issue.',
    UNKNOWN_ERROR_OCCURRED: 'Something went wrong. Please try again later',
    GENERIC_SEED_SEARCH_ERROR: 'Error occurred while fetching the search results from SEED'
};

export const CIPZErrorsMap = {
    "102010": "Provided business unit is invalid",
    "102021": "Provided customer account is invalid",
    "102023": "Provided customer group is invalid",
    "102033": "Provided item attribute group is invalid",
};

// http Error Code
export const HTTP_INTERNAL_SERVER_ERROR = 500;
export const HTTP_NOT_FOUND_ERROR = 400;

export {ErrorCodes, ErrorMessages, ErrorsMap};

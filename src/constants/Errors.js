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
};

const ErrorMessages = {
    UNEXPECTED_ERROR: 'Something went wrong',
    PERISCOPE_NOT_ENABLED_OPCO_ERROR: 'The service is not enabled for this business unit',
    INVALID_CUSTOMER_ACCOUNT_ERROR: 'Provided customer account is incorrect',
    INVALID_CUSTOMER_ACCOUNT_TYPE_ERROR: 'The provided customer is not eligible for this pricing',
    INVALID_OLD_PRICE_REQUEST_DATE_ERROR: 'Provided date is too far into the past',
    INVALID_FUTURE_PRICE_REQUEST_DATE_ERROR: 'Provided date is too far into the future',
    PRODUCT_NOT_FOUND_ERROR: 'Could not retrieve the product',
    INVALID_SPLIT_ERROR: 'Invalid split requested',
    UNEXPECTED_PRICING_ENGINE_ERROR: 'Unexpected error occurred while pricing the product',
    PRICING_ENGINE_ERROR: 'Unexpected error occurred while pricing the product',
    PRODUCT_INFO_API_ERROR: 'Could not retrieve the product information',
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
    [ErrorCodes.PRODUCT_INFO_API_ERROR, ErrorMessages.PRODUCT_INFO_API_ERROR]
]);

export { ErrorCodes, ErrorMessages, ErrorsMap }


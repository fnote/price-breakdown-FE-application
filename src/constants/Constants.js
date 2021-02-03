export const LABEL_CUSTOMER_NET_PRICE = 'CUSTOMER NET PRICE';

export const VALUE_KEY_CUSTOMER_REF_PRICE = 'customerReferencePrice';
export const META_DATA_PRICE_BAR = [
    {label: 'LOCAL SEGMENT REFERENCE PRICE', valueKey: 'grossPrice', styleClass: 'group1'},
    {label: 'CUSTOMER REFERENCE PRICE', valueKey: 'customerReferencePrice', styleClass: 'group2'},
    {label: 'DISCOUNT PRICE', valueKey: 'customerPrequalifiedPrice', styleClass: 'group3'},
    {label: 'ORDER UNIT PRICE', valueKey: 'unitPrice', styleClass: 'group4 pad-right'},
    {label: LABEL_CUSTOMER_NET_PRICE, valueKey: 'netPrice', styleClass: 'main-price', insertDivider: false}
];

export const PRICE_UNIT_CASE = 'case';
export const PRICE_UNIT_SPLIT = 'each';
export const PRICE_UNIT_POUND = 'pound';

export const PRICE_SOURCE_DISCOUNT_SERVICE = 'Discount Service';
export const PRICE_SOURCE_SYSTEM = 'System';
export const PRICE_SOURCE_SUS = 'SUS';

export const DESCRIPTION_LOCAL_SEGMENT_REF_PRICE = 'Local Segment Reference Price (Gross)';
export const DESCRIPTION_CUSTOMER_REFERENCE_PRICE = 'Customer Reference Price';
export const DESCRIPTION_DISCOUNT_PRICE = 'Discount Price';
export const DESCRIPTION_ORDER_NET_PRICE = 'Order Unit Price';
export const DESCRIPTION_CUSTOMER_NET_PRICE = 'Customer Net Price';
export const DESCRIPTION_ROUNDING = 'Rounding';
export const DESCRIPTION_VOLUME_TIERS = 'Item/Order Specific promotions';
export const DESCRIPTION_EXCEPTION = 'Exception Deal';
export const DESCRIPTION_PRICE_RULE = 'Price Rule';

export const VOLUME_TIER_OPERATOR_BETWEEN = 'Between';
export const VOLUME_TIER_RANGE_END_ABOVE = 'above';
export const VOLUME_TIER_RANGE_END_EMPTY = '';
export const VOLUME_TIER_RANGE_CONNECTOR_TO = 'to';
export const VOLUME_TIER_RANGE_CONNECTOR_AND = 'and';
export const VOLUME_TIER_RANGE_CONNECTOR_EMPTY = '';

export const DISCOUNT_TYPE_REF_PRICE = 'REFERENCE_PRICE';
export const DISCOUNT_TYPE_PREQUALIFIED = 'PREQUALIFIED';

export const DISCOUNT_CASE_VOLUME = 'CASE_VOLUME_DISCOUNT';

export const DISCOUNT_NAMES_MAP = new Map([
    ['STRATEGIC_RPA_DISCOUNT', 'Strategic RPA Discount'],
    ['NEW_CUSTOMER_DISCOUNT', 'New Customer Discount'],
    ['CASE_SPLIT_UPCHARGE', 'Split Up Charge'],
]);

export const AGREEMENT_CODE_P = 'P';
export const AGREEMENT_CODE_B = 'B';
export const AGREEMENT_CODE_T = 'T';
export const AGREEMENT_CODE_L = 'L';

export const SPLIT_STATUS_NO = 'N';
export const SPLIT_STATUS_YES = 'Y';

export const EMPTY_ADJUSTMENT_VALUE_INDICATOR = ' ';

export const CURRENCY_SYMBOL_USD = '$';
export const APPLICATION_LOCALE = 'en-US';

export const AUTH_STATE_PENDING = 'pending';
export const AUTH_STATE_COMPLETED = 'completed';
export const AUTH_STATE_FAILED = 'failed';

export const AUTH_FAILURE_TYPE_UNAUTHENTICATED = 'UNAUTHENTICATED';
export const AUTH_FAILURE_TYPE_UNEXPECTED_ERROR = 'UNEXPECTED_ERROR';

export const UNEXPECTED_ERROR_CODE = 500;

export const PRICE_FRACTION_DIGITS_THREE = 3;
export const PRICE_FRACTION_DIGITS_TWO = 2;
export const PERCENTAGE_FRACTION_DIGITS = 2;

export const AVAILABLE_PRICE_ZONES = [1, 2, 3, 4, 5];
export const NOT_APPLICABLE_LABEL = 'N/A';

export const FRACTION_DIGITS_CHANGING_MARGIN_VALUE = 10;

export const CORRELATION_ID_HEADER = 'X-Syy-Correlation-Id';

export const ORDER_PRICE_TYPE_HAND = 'H';
export const MAX_VALUE_ALLOWED_FOR_HAND_PRICE_INPUT = 9999999999.999;

export const NAVIGATION_PATH_PRICE_VALIDATION = '/';
export const NAVIGATION_PATH_FILE_UPLOAD = '/file-upload';

export const FILE_UPLOADING_DONE = 'done';
export const FILE_UPLOADING_ERROR = 'error';

export const SUPPORTED_FILE_TYPES = [
    '', 'text/plain', 'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export const UNSUPPORTED_SPECIAL_CHARACTERS = /[ &$@=;:+,?\\{^}%`\]'">[~<#|]/;

export const INVALID_FILE_TYPE = {
    errorType: 'Invalid ContentType',
    errorMessage: 'file upload failed due to unsupported file type.'
};
export const INVALID_FILE_NAME = {
    errorType: 'Invalid FileName',
    errorMessage: 'file upload failed due to unsupported file name.'
};

// job status
export const JOB_INPROGRESS_STATUS = 'INPROGRESS';
export const JOB_ERROR_STATUS = 'ERROR';
export const JOB_COMPLETE_STATUS = 'COMPLETED';
export const JOB_PARTIALLY_COMPLETED_STATUS = 'PARTIALLY_COMPLETED';
export const JOB_DELETING_STATUS = 'DELETING';

// display job status
export const JOB_INPROGRESS_STATUS_DISPLAY = 'File is being processed';
export const JOB_ERROR_STATUS_DISPLAY = 'Failed to process';
export const JOB_COMPLETE_STATUS_DISPLAY = 'File processed successfully';
export const JOB_PARTIALLY_COMPLETED_STATUS_DISPLAY = 'File processed partially';
export const MINOR_ERROR_STATUS_DISPLAY = 'Minor error file';
export const JOB_DELETING_STATUS_DISPLAY = 'Deleting';

export const PCI_FILENAME_PREFIX = 'CPPCI-';

export const MAX_DOWNLOAD_ALLOWED = 25;
export const TIMEOUT_DURING_DOWNLOAD_CLICKS = 1000;
export const FILE_NAME_DISPLAY_LENGTH = 30;

export const TAG_NAME_A = 'a';

export const EMPTY_STRING = '';
export const PERCENTAGE_SIGN = '%';
export const UNKNOWN_BASE_VALUE_NAME = 'UNKNOWN';

// delete confirmation popup
export const DELETE_TITLE = 'Are you sure to delete this?';
export const DELETE_CONFIRM = 'Yes';
export const DELETE_REJECT = 'No';

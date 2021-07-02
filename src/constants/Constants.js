export const CLOUD_PCI_FRONTEND_VERSION = '1.6.0';
// help page url
export const HELP_PAGE_URL = 'https://maincourse.cloud.sysco.com/TVRLearningPortal/Content/ProfitMgmt/8Container/CloudPCI_contain.htm';

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
    ['NEW_ATTRIBUTE_GROUP_DISCOUNT', 'New Attribute Group Discount'],
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
export const NOT_PROVIDED_LABEL = 'N/P';

export const FRACTION_DIGITS_CHANGING_MARGIN_VALUE = 10;

export const CORRELATION_ID_HEADER = 'X-Syy-Correlation-Id';

export const ORDER_PRICE_TYPE_HAND = 'H';
export const MAX_VALUE_ALLOWED_FOR_HAND_PRICE_INPUT = 9999999999.999;

export const NAVIGATION_PATH_PRICE_VALIDATION = '/';
export const NAVIGATION_PATH_FILE_UPLOAD = '/file-upload';
export const NAVIGATION_PATH_HISTORY_INQUIRY = '/history-inquiry';

export const PRICE_VALIDATION_REQUEST = "price_validation";
export const HISTORY_INQUIRY_REQUEST = "history_inquiry";
export const FILE_UPLOADING_DONE = 'done';
export const FILE_UPLOADING_ERROR = 'error';
export const FILE_APPEAR_NOTIFICATION = 'Submitted file(s) will appear in the file list shortly!';

export const FILENAME_DELIMITER = '.';

// this has the supported file extensions and its mimetypes respectively
export const SUPPORTED_FILE_EXTENSIONS_TYPES = [{extension: '', type: ''},
    {extension: '.txt', type: 'text/plain'},
    {extension: '.csv', type: 'text/csv'},
    {extension: '.xls', type: 'application/vnd.ms-excel'},
    {extension: '.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
    {extension: '.doc', type: 'application/msword'},
    {extension: '.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}];

export const UNSUPPORTED_SPECIAL_CHARACTERS = /[ &$@=;:+,?\\{^}%`\]'">[~<#|]/;

export const INVALID_FILE_TYPE = {
    errorType: 'Invalid ContentType',
    errorMessage: 'file upload failed due to unsupported file type.'
};
export const INVALID_FILE_NAME = {
    errorType: 'Invalid FileName',
    errorMessage: 'file upload failed due to unsupported file name.'
};

// A browser is considered supported if it is mentioned in the list and equal or newer than the mentioned versions.
export const SUPPORTED_WEB_BROWSERS = {
        Chrome: 89,
        Edge: 90,
        // Firefox: 84, // Not approved to be used at Sysco
        // Safari: 14  // Deprecated for now
};

export const UNSUPPORTED_WEB_BROWSER = {
    headerMessageLine1: 'We\'re sorry , but',
    headerMessageLine2: 'Your browser isn\'t supported',
    infoMessage: 'Please use one of these options to improve your experience'
};

export const UNSUPPORTED_WEB_BROWSER_SCREEN_CONTINUE_LOCAL_STORAGE = 'unsupported_browser_screen_continue';
export const UNSUPPORTED_WEB_BROWSER_ALERT_CONTINUE_LOCAL_STORAGE = 'unsupported_browser_alert_continue';
export const UNSUPPORTED_WEB_BROWSER_SPLIT_SEPARATOR = '/';

// job status
export const JOB_INPROGRESS_STATUS = 'INPROGRESS';
export const JOB_ERROR_STATUS = 'ERROR';
export const JOB_COMPLETE_STATUS = 'COMPLETED';
export const JOB_PARTIALLY_COMPLETED_STATUS = 'PARTIALLY_COMPLETED';
export const JOB_DELETING_STATUS = 'DELETING';
export const JOB_DOWNLOADING_STATUS = 'DOWNLOADING';
export const JOB_MINOR_ERROR_DOWNLOADING_STATUS = 'DOWNLOADING_MINOR_ERROR';

// display job status
export const JOB_INPROGRESS_STATUS_DISPLAY = 'Processing';
export const JOB_ERROR_STATUS_DISPLAY = 'Failed';
export const JOB_COMPLETE_STATUS_DISPLAY = 'Completed';
export const JOB_PARTIALLY_COMPLETED_STATUS_DISPLAY = 'Partially Completed';
export const MINOR_ERROR_STATUS_DISPLAY = 'Minor Error';
export const JOB_DELETING_STATUS_DISPLAY = 'Deleting';
export const JOB_DOWNLOADING_STATUS_DISPLAY = 'Downloading';
export const JOB_MINOR_ERROR_DOWNLOADING_STATUS_DISPLAY = 'Downloading Minor Error';

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

// batch job list polling interval time
export const JOB_LIST_REFRESH_INTERVAL = 40000;

// batch job time - timezone regex
export const TIMEZONE_ABBREVIATION_REGEX = /[A-Z](?!.*[(])/;
export const TIMEZONE_REGEX = /\(([^)]+)\)/;

// file type
export const MINOR_ERROR_FILE = 'minor error file';
export const COMPLETED_FILE = 'completed file';

// Network online status detection
export const ONLINE_STATUS_CHECK_INTERVAL = 10000;
export const ONLINE_STATUS_CHECK_URL = '/favicon.ico?d=';
export const ONLINE_STATUS_OFFLINE_MSG = 'Please check the internet connection!';

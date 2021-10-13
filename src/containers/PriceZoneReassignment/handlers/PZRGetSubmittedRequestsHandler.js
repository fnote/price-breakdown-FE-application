import {
    generatePaginationParams,
    constructRequestUrl,
    constructFetchRequest,
    handleResponse,
    openNotificationWithIcon
} from '../helper/PZRHelper';
import {getBffUrlConfig} from '../../../utils/Configs';
import {
    REVIEW_RESULT_TABLE_PAGE_SIZE,
    PZ_CHANGE_REQUEST_STATUS_PENDING_APPROVAL
} from '../../../constants/PZRConstants';
import {CIPZErrorMessages, ErrorCodes} from '../../../constants/Errors';

const FILTERING_METADATA = new Map([
    ['site', 'opco'],
    ['customer', 'customer'],
    ['customerGroup', 'customer_group'],
    ['attributeGroup', 'attribute_group'],
    ['transactionLogStatus', 'request_status'],
]);

const addDefaultFilters = (filters) => ({
    ...filters,
    is_exported: 'Y',
    no_exported_days: '180'
});

const generateFilteringParams = (filters) => {
    const formattedFilters = Object.entries(filters)
    .filter((entry) => !!entry[1])
    .map(([key, value]) => ({
        [FILTERING_METADATA.get(key)]: value
    }))
    .reduce((acc, val) => ({...acc, ...val}), {});

    return addDefaultFilters(formattedFilters);
};

const filtersPresent = (filters) => filters !== null;

const generateRequestUrl = (paginationParams, filters) => {
    if (filtersPresent(filters)) {
        return constructRequestUrl(getBffUrlConfig().pzUpdateRequests,
        {...paginationParams, ...generateFilteringParams(filters)});
    }
    return constructRequestUrl(getBffUrlConfig().pzUpdateRequests,
    {...paginationParams, request_status: PZ_CHANGE_REQUEST_STATUS_PENDING_APPROVAL});
};

export const fetchPZChangeRequests = ({page, store, setResultLoading, setTotalResultCount, setDataStore, setCurrentPage, setError}, filters = null) => {
    const paginationParams = generatePaginationParams(page, REVIEW_RESULT_TABLE_PAGE_SIZE);
    const requestUrl = generateRequestUrl(paginationParams, filters);
    setResultLoading(true);
    fetch(requestUrl, constructFetchRequest())
        .then(handleResponse)
        .then((resp) => {
            if (resp.success) {
                const {totalRecords, data: {pzUpdateRequests}} = resp.data;
                const updatedDataStore = {...store, [page]: pzUpdateRequests};
                setTotalResultCount(totalRecords);
                setDataStore(updatedDataStore);
                setError(false);
                setCurrentPage(page);
                setResultLoading(false);
            } else {
                const errorResponseData = resp.data;
                if (errorResponseData && errorResponseData.errorCode === ErrorCodes.CIPZ_PROVIDED_INVALID_OFFSET && page !== 1) {
                    fetchPZChangeRequests({
                        page: 1,
                        store: {},
                        setResultLoading,
                        setTotalResultCount,
                        setDataStore,
                        setCurrentPage,
                        setError
                    });
                } else {
                    setError(true);
                    openNotificationWithIcon('error',
                    CIPZErrorMessages.FETCH_CIPZ_PENDING_APPROVAL_REQUEST_SUMMARY_MESSAGE, CIPZErrorMessages.FETCH_CIPZ_API_DATA_TITLE);
                    setCurrentPage(page);
                    setResultLoading(false);
                }
            }
        })
        .catch(() => {
            openNotificationWithIcon('error', CIPZErrorMessages.UNKNOWN_ERROR_OCCURRED, CIPZErrorMessages.FETCH_CIPZ_API_DATA_TITLE);
            setError(true);
            setCurrentPage(page);
            setResultLoading(false);
        });
};

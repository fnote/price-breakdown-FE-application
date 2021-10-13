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
    CIPZ_TRANSACTION_HISTORY_LOG_NO_OF_DAYS
} from '../../../constants/PZRConstants';
import {CIPZErrorMessages, ErrorCodes} from '../../../constants/Errors';

export const fetchCustomerDetails = ({id, setResultLoading, setError, setCustomers}) => {
    // const paginationParams = generatePaginationParams(page, REVIEW_RESULT_TABLE_PAGE_SIZE);
    const requestUrl = constructRequestUrl(getBffUrlConfig().pzCustomerDetails.replace(':request_id', id),
        {});
    setResultLoading(true);
    fetch(requestUrl, constructFetchRequest())
        .then(handleResponse)
        .then((resp) => {
            if (resp.success) {
                console.log('...........kkkkkkkkkkkkkkkkkkkkkk....................')
                console.log(resp.data.customers)
                // const {totalRecords, data: {pzUpdateRequests}} = resp.data;
                // const updatedDataStore = {...store, [page]: pzUpdateRequests};
                setError(false);
                setResultLoading(false);
                setCustomers(resp.data.customers);
                console.log('......firsts.......')
                console.log(setCustomers)
                console.log('.........second................')
            } else {
                const errorResponseData = resp.data;
                if (errorResponseData && errorResponseData.errorCode === ErrorCodes.CIPZ_PROVIDED_INVALID_OFFSET) {
                    fetchCustomerDetails({
                        setResultLoading,
                        setError,
                        setCustomers
                    });
                } else {
                    setError(true);
                    openNotificationWithIcon('error',
                        CIPZErrorMessages.FETCH_CIPZ_PENDING_APPROVAL_REQUEST_SUMMARY_MESSAGE, CIPZErrorMessages.FETCH_CIPZ_API_DATA_TITLE);
                    setResultLoading(false);
                }
            }
        })
        .catch(() => {
            openNotificationWithIcon('error', CIPZErrorMessages.UNKNOWN_ERROR_OCCURRED, CIPZErrorMessages.FETCH_CIPZ_API_DATA_TITLE);
            setError(true);
            setResultLoading(false);
        });
};

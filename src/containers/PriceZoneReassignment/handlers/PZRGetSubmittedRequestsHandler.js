import {
    generatePaginationParams,
    constructRequestUrl,
    constructFetchRequest,
    handleResponse
} from '../../../utils/PZRUtils';
import {openNotificationWithIcon} from '../helper/PZRHelper';
import {getBffUrlConfig} from '../../../utils/Configs';
import {REVIEW_RESULT_TABLE_PAGE_SIZE,
    PZ_CHANGE_REQUEST_STATUS_PENDING_APPROVAL} from '../../../constants/PZRConstants';

export const fetchPZChangeRequests = ({ page, store, setResultLoading, setTotalResultCount, setDataStore }) => {
    const paginationParams = generatePaginationParams(page, REVIEW_RESULT_TABLE_PAGE_SIZE);
    const requestUrl = constructRequestUrl(getBffUrlConfig().pzUpdateRequests,
        {...paginationParams, request_status: PZ_CHANGE_REQUEST_STATUS_PENDING_APPROVAL});
    setResultLoading(true);
    fetch(requestUrl, constructFetchRequest())
        .then(handleResponse)
        .then((resp) => {
            if (resp.success) {
                const {totalRecords, data: {pzUpdateRequests}} = resp.data;
                const updatedDataStore = {...store, [page]: pzUpdateRequests};
                setTotalResultCount(totalRecords);
                setDataStore(updatedDataStore);
            } else {
                // todo: handle error scenario with a message to user
                console.log(resp);
            }
            setResultLoading(false);
        })
        .catch((err) => {
            openNotificationWithIcon('error', 'Failed to fetch', 'Failure');
            // todo: handle error scenario with a message to user
            console.log(err);
        })
        .finally(() => {
            setResultLoading(false);
        });
};

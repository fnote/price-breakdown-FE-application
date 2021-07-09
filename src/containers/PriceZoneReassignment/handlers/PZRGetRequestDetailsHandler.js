import {
    constructFetchRequest,
    handleResponse,
    openNotificationWithIcon
} from '../helper/PZRHelper';
import {CIPZErrorMessages} from '../../../constants/Errors';

export const fetchPZRequestDetails = ({
                                          requestUrl,
                                          dataStore,
                                          page,
                                          setTotalResultCount,
                                          setDataStore,
                                          setResultLoading,
                                          setCurrentPage,
                                      }) => {
    fetch(requestUrl, constructFetchRequest())
        .then(handleResponse)
        .then((resp) => {
            if (resp.success) {
                const {totalRecords, data: {pzUpdateRequests}} = resp.data;
                const updatedDataStore = {...dataStore, [page]: pzUpdateRequests};
                setTotalResultCount(totalRecords);
                setDataStore(updatedDataStore);
            } else {
                openNotificationWithIcon('error',
                    CIPZErrorMessages.FETCH_CIPZ_REFERENCE_TABLE_ERROR_MESSAGE, CIPZErrorMessages.FETCH_CIPZ_API_DATA_TITLE);
            }
            setResultLoading(false);
        })
        .catch(() => {
            openNotificationWithIcon('error', CIPZErrorMessages.FETCH_CIPZ_API_DATA_TITLE, CIPZErrorMessages.UNKNOWN_ERROR_OCCURRED,);
        })
        .finally(() => {
            setResultLoading(false);
            setCurrentPage(page);
        });
};

import {
    calculateResetIndex,
    removeCompletedRequest,
    constructFetchRequest,
    handleResponse
} from '../../../utils/PZRUtils';
import {HTTP_METHOD_PATCH} from '../../../constants/Constants';

export const handleApproveReject = ({
    requestUrl, payload, dataStore, currentPage, index, dataResetIndex,
    setDataStore, setDataResetIndex, setApproveRejectProgressing,
    successCallback, failureCallback
}) => {
    fetch(requestUrl, constructFetchRequest(HTTP_METHOD_PATCH, payload))
        .then(handleResponse)
        .then((resp) => {
            console.log(resp);
            if (resp.success) {
                successCallback();
                console.log(dataStore);
                console.log(currentPage);
                const updatedDataStore = removeCompletedRequest(dataStore, currentPage, index);
                setDataStore(updatedDataStore);
                setDataResetIndex(calculateResetIndex(dataResetIndex, currentPage));
            } else {
                failureCallback();
                // todo: handle error scenario with a message to user
            }
        })
        .catch((err) => {
            failureCallback();
            // todo: handle error scenario with a message to user
            console.log(err);
        })
        .finally(() => {
            setApproveRejectProgressing(false);
        });
};

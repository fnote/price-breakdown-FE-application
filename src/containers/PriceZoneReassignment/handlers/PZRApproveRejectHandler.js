import {
    calculateResetIndex,
    removeCompletedRequest,
    constructFetchRequest,
    handleResponse,
    openNotificationWithIcon
} from '../helper/PZRHelper';
import {HTTP_METHOD_PATCH, APPROVED} from '../../../constants/Constants';
import {CIPZErrorMessages, ErrorCodes} from '../../../constants/Errors';

const isEmptyPage = (page = []) => page.length === 0;

export const handleApproveReject = ({
                                        requestUrl,
                                        payload,
                                        dataStore,
                                        currentPage,
                                        index,
                                        dataResetIndex,
                                        setDataStore,
                                        setFetchNewData,
                                        setDataResetIndex,
                                        status,
                                        setApproveRejectProgressing,
                                        successCallback,
                                        failureCallback,
                                        alreadyApprovedRejectedCallback
                                    }) => {
    fetch(requestUrl, constructFetchRequest(HTTP_METHOD_PATCH, payload))
        .then(handleResponse)
        .then((resp) => {
            if (resp.success) {
                successCallback();
                const updatedDataStore = removeCompletedRequest(dataStore, currentPage, index);
                setDataStore(updatedDataStore);
                if (isEmptyPage(updatedDataStore[currentPage])) {
                    setFetchNewData(true);
                }
                setDataResetIndex(calculateResetIndex(dataResetIndex, currentPage));
            } else {
                const errorResponseData = resp.data;
                if (errorResponseData && errorResponseData.errorCode === ErrorCodes.CIPZ_ALREADY_APPROVED_OR_REJECTED) {
                    alreadyApprovedRejectedCallback();
                } else {
                    failureCallback();
                    const action = status ? status.toLowerCase() : 'review';
                    const errorTitle = `Sorry we could not ${action} the request. Please try again later`;                    
                    openNotificationWithIcon('error', CIPZErrorMessages.ALREADY_REVIEWED_ALERT_MESSAGE, errorTitle);
                }
            }
        })
        .catch(() => {
            failureCallback();
            const errorTitle = status === APPROVED ? CIPZErrorMessages.APPROVE_CIPZ_API_FAILIURE_TITLE : CIPZErrorMessages.REJECT_CIPZ_API_FAILIURE_TITLE;
            const errorMessage = status === APPROVED ? CIPZErrorMessages.APPROVE_CIPZ_API_FAILIURE_MESSAGE : CIPZErrorMessages.APPROVE_CIPZ_API_FAILIURE_TITLE;
            openNotificationWithIcon('error', errorMessage, errorTitle);
        })
        .finally(() => {
            setApproveRejectProgressing(false);
        });
};

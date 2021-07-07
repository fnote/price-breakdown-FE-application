import {
    calculateResetIndex,
    updateCompletedRequest,
    constructFetchRequest,
    handleResponse,
    openNotificationWithIcon,
    getReviewStatusMsg
} from '../helper/PZRHelper';
import {HTTP_METHOD_PATCH, APPROVED} from '../../../constants/Constants';
import {CIPZErrorMessages, ErrorCodes} from '../../../constants/Errors';

const isReviewPending = ({ reviewStatus }) => !reviewStatus;

const isEmptyPage = (page = []) => page.filter((record) => isReviewPending(record)).length === 0;

const updateState = ({dataStore, currentPage, index, status, dataResetIndex, setDataStore, setFetchNewData, setDataResetIndex}) => {
    const updatedDataStore = updateCompletedRequest(dataStore, currentPage, index, status);
    setDataStore(updatedDataStore);
    if (isEmptyPage(updatedDataStore[currentPage])) {
        setFetchNewData(true);
    }
    setDataResetIndex(calculateResetIndex(dataResetIndex, currentPage));
};

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
                updateState({
                    dataStore,
                    currentPage,
                    index,
                    status: getReviewStatusMsg(status),
                    dataResetIndex,
                    setDataStore,
                    setFetchNewData,
                    setDataResetIndex
                });
            } else {
                const errorResponseData = resp.data;
                if (errorResponseData && errorResponseData.errorCode === ErrorCodes.CIPZ_ALREADY_APPROVED_OR_REJECTED) {
                    updateState({
                        dataStore,
                        currentPage,
                        index,
                        status: getReviewStatusMsg(),
                        dataResetIndex,
                        setDataStore,
                        setFetchNewData,
                        setDataResetIndex
                    });
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

import {
    calculateResetIndex,
    removeCompletedRequest,
    constructFetchRequest,
    handleResponse
} from '../../../utils/PZRUtils';
import {openNotificationWithIcon} from '../helper/PZRHelper';
import {HTTP_METHOD_PATCH, APPROVED} from '../../../constants/Constants';
import { CIPZErrorMessages, ErrorCodes } from '../../../constants/Errors';

export const handleApproveReject = ({
    requestUrl,
    payload,
    dataStore,
    currentPage,
    index,
    dataResetIndex,
    setDataStore,
    setDataResetIndex,
    setApproveRejectProgressing,
    successCallback,
    failureCallback
}) => {
    fetch(requestUrl, constructFetchRequest(HTTP_METHOD_PATCH, payload))
    .then(handleResponse)
    .then((resp) => {
      if (resp.success) {
        successCallback();
        const updatedDataStore = removeCompletedRequest(dataStore, currentPage, index);
        setDataStore(updatedDataStore);
        setDataResetIndex(calculateResetIndex(dataResetIndex, currentPage));
      } else {
        failureCallback();
        const errorResponseData = resp.data;
        if (errorResponseData && errorResponseData.errorCode === ErrorCodes.CIPZ_ALREADY_APPROVED_OR_REJECTED) {
          // Change this to  popup
          openNotificationWithIcon('error', 'this change is already reviewed by another manager', 'This change is already reviewed by another manager');
        } else {
          const errorTitle = status === APPROVED ? CIPZErrorMessages.APPROVE_CIPZ_API_FAILIURE_TITLE : CIPZErrorMessages.REJECT_CIPZ_API_FAILIURE_TITLE;
          const errorMessage = status === APPROVED ? CIPZErrorMessages.APPROVE_CIPZ_API_FAILIURE_MESSAGE : CIPZErrorMessages.APPROVE_CIPZ_API_FAILIURE_TITLE;
          openNotificationWithIcon('error', errorMessage, errorTitle);
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

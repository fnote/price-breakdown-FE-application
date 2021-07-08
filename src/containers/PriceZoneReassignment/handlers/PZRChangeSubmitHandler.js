// Custom components
import {submitReasonModal} from '../PriceZoneResults/PZRHeaderModal';
// Helper functions and constants
import {openNotificationWithIcon, handleResponse} from '../helper/PZRHelper';
import {getBffUrlConfig} from '../../../utils/Configs';
import {CIPZErrorMessages, CIPZErrorsMap} from '../../../constants/Errors';
import {DEFAULT_REQUEST_HEADER} from '../../../constants/Constants';

const handleError = (response) => {
    if (!response || !response.data || !response.data.errorCode) {
        openNotificationWithIcon('error', CIPZErrorMessages.UNEXPECTED_GENERIC_CIPZ_POST_ERROR_MESSAGE, CIPZErrorMessages.CIPZ_POST_ERROR_TITLE);
        return;
    }
    const {errorCode} = {...response.data};
    const errorMessage = errorCode && CIPZErrorsMap[errorCode] ? CIPZErrorsMap[errorCode] : CIPZErrorMessages.GENERIC_CIPZ_POST_ERROR_MESSAGE;
    openNotificationWithIcon('error', errorMessage, CIPZErrorMessages.CIPZ_POST_ERROR_TITLE);
};

const formRequestBody = ({PZRContextData, userDetailContext, submissionNote, getCustomerGroupOfCustomer, newPriceZone, effectiveDate}) => {
    const userDetailsObj = userDetailContext.userDetailsData.userDetails;
    return JSON.stringify({
        businessUnitNumber: PZRContextData.searchParams.opcoId,
        itemAttributeGroup: PZRContextData.searchParams.attributeGroup,
        itemAttributeGroupId: PZRContextData.searchParams.attributeGroupId,
        customerGroup: getCustomerGroupOfCustomer(),
        customerAccount: PZRContextData.searchParams.customer ? PZRContextData.searchParams.customer : null,
        newPriceZone,
        effectiveFromDate: effectiveDate,
        submissionNote,
        submitter: {
            id: userDetailsObj.username,
            givenName: userDetailsObj.firstName,
            surname: userDetailsObj.lastName,
            email: userDetailsObj.email
        }
    });
};

export const submitPriceZoneChangeRequest = ({setSubmitModal, setReferenceId, reqParamsToFormBody}) => {
    setSubmitModal('loading');
    fetch(getBffUrlConfig().pzrUpdateRequestsUrl, {
        method: 'POST',
        body: formRequestBody(reqParamsToFormBody),
        headers: DEFAULT_REQUEST_HEADER,
        credentials: 'include'
    })
        .then(handleResponse)
        .then((resp) => {
            if (resp.success) {
                const requestId = resp.data && resp.data.requestId ? resp.data.requestId : 0;
                setReferenceId(requestId);
                setSubmitModal('success-modal');
            } else {
                handleError(resp);
                setSubmitModal(false);
            }
            return null;
        })
        .catch(() => {
            setSubmitModal(submitReasonModal);
            openNotificationWithIcon('error', CIPZErrorMessages.UNEXPECTED_GENERIC_CIPZ_POST_ERROR_MESSAGE, CIPZErrorMessages.CIPZ_POST_ERROR_TITLE);
        });
};

// Custom components
import {submitReasonModal} from '../PriceZoneResults/PZRHeaderModal';
// Helper functions and constants
import {openNotificationWithIcon} from '../helper/PZRHelper';
import {getBffUrlConfig} from '../../../utils/Configs';
import {CIPZErrorMessages, CIPZErrorsMap} from '../../../constants/Errors';
import {CORRELATION_ID_HEADER, NOT_APPLICABLE_LABEL, DEFAULT_REQUEST_HEADER} from '../../../constants/Constants';

const handleResponse = (response) => {
    const correlationId = response.headers.get(CORRELATION_ID_HEADER) || NOT_APPLICABLE_LABEL;
    return response.json().then((json) => {
        if (response.ok) {
            return {success: true, data: json, headers: {[CORRELATION_ID_HEADER]: correlationId}};
        }
        return {success: false, data: json, headers: {[CORRELATION_ID_HEADER]: correlationId}};
    });
};

const handleError = (response) => {
    if (!response || !response.data || !response.data.errorCode) {
        openNotificationWithIcon('error', CIPZErrorMessages.UNEXPECTED_GENERIC_CIPZ_POST_ERROR_MESSAGE, CIPZErrorMessages.CIPZ_POST_ERROR_TITLE);
        return;
    }
    const {errorCode} = {...response.data};
    const errorMessage = errorCode && CIPZErrorsMap[errorCode] ? CIPZErrorsMap[errorCode] : CIPZErrorMessages.GENERIC_CIPZ_POST_ERROR_MESSAGE;
    openNotificationWithIcon('error', errorMessage, CIPZErrorMessages.CIPZ_POST_ERROR_TITLE);
};

const formRequestBody = ({PZRContextData, userDetailContext, submissionReasonInput, getCustomerGroupOfCustomer, newPriceZone, effectiveDate}) => {
    const userDetailsObj = userDetailContext.userDetailsData.userDetails;
    return JSON.stringify({
        businessUnitNumber: PZRContextData.searchParams.opcoId,
        itemAttributeGroup: PZRContextData.searchParams.attributeGroup,
        itemAttributeGroupId: PZRContextData.searchParams.attributeGroupId,
        customerGroup: getCustomerGroupOfCustomer(),
        customerAccount: PZRContextData.searchParams.customer ? PZRContextData.searchParams.customer : null,
        newPriceZone,
        effectiveFromDate: effectiveDate,
        submissionNote: submissionReasonInput?.current?.state?.value || '',
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

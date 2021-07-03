import {getAttributeGroups, openNotificationWithIcon} from '../helper/PZRHelper';
import {auth} from '../../../utils/security/Auth';
import {getBffUrlConfig} from '../../../utils/Configs';
import {CIPZErrorMessages} from '../../../constants/Errors';
import {CORRELATION_ID_HEADER, NOT_APPLICABLE_LABEL, DEFAULT_REQUEST_HEADER} from '../../../constants/Constants';

const handleGetAttributeGroupResponse = (response) => {
    const correlationId = response.headers.get(CORRELATION_ID_HEADER) || NOT_APPLICABLE_LABEL;
    return response.json().then((json) => {
        if (response.ok) {
            return {success: true, data: json, headers: {[CORRELATION_ID_HEADER]: correlationId}};
        }
        return {
            success: false,
            data: json,
            headers: {[CORRELATION_ID_HEADER]: correlationId},
            httpStatus: response.status
        };
    });
};

export const fetchAttributeGroups = ({pZRContext, userDetailContext, setAttributeGroups, setSearchDisabled}) => {
    fetch(getBffUrlConfig().priceZoneReassignmentGetItemAttributeUrl, {
        method: 'GET',
        headers: DEFAULT_REQUEST_HEADER,
        credentials: 'include'
    })
        .then(handleGetAttributeGroupResponse)
        .then((resp) => {
            if (resp.success) {
                setAttributeGroups(getAttributeGroups(resp.data.attribute_groups));
                pZRContext.setErrorData(null);
                setSearchDisabled(false);
            } else {
                setSearchDisabled(true);
                if (!auth.shouldFetchUserDetailsAgain(userDetailContext)) { // Check this is correct after auth is working
                    openNotificationWithIcon('error', CIPZErrorMessages.FETCH_ITEM_ATTRIBUTE_ERROR_MESSAGE, CIPZErrorMessages.FETCH_ITEM_ATTRIBUTE_ERROR_TITLE);
                }
            }
            return null;
        }).catch(() => {
        if (!auth.shouldFetchUserDetailsAgain(userDetailContext)) {
            openNotificationWithIcon('error', CIPZErrorMessages.UNKNOWN_ERROR_OCCURRED, CIPZErrorMessages.FETCH_ITEM_ATTRIBUTE_ERROR_TITLE);
        }
    });
};

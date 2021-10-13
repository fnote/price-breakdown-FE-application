import {handleResponse, openNotificationWithIcon, prepareBusinessUnitsMap} from '../helper/PZRHelper';
import {auth} from '../../../utils/security/Auth';
import {getBffUrlConfig} from '../../../utils/Configs';
import {CIPZErrorMessages} from '../../../constants/Errors';
import {DEFAULT_REQUEST_HEADER} from '../../../constants/Constants';

const handleUnknownError = (userDetailContext) => {
    if (!auth.shouldFetchUserDetailsAgain(userDetailContext)) {
        openNotificationWithIcon('error', CIPZErrorMessages.UNKNOWN_ERROR_OCCURRED, CIPZErrorMessages.FETCH_ITEM_ATTRIBUTE_ERROR_TITLE);
    }
};

const handleError = (userDetailContext) => {
    if (!auth.shouldFetchUserDetailsAgain(userDetailContext)) { // Check this is correct after auth is working
        openNotificationWithIcon('error', CIPZErrorMessages.FETCH_ITEM_ATTRIBUTE_ERROR_MESSAGE, CIPZErrorMessages.FETCH_ITEM_ATTRIBUTE_ERROR_TITLE);
    }
};

export const fetchTransactedBusinessUnits = ({userDetailContext, setTransactedBusinessUnits}) => {
    fetch(getBffUrlConfig().pzTransactedBusinessUnits, {
        method: 'GET',
        headers: DEFAULT_REQUEST_HEADER,
        credentials: 'include',
    })
        .then(handleResponse)
        .then((resp) => {
            if (resp.success) {
                setTransactedBusinessUnits(prepareBusinessUnitsMap(resp.data.transactedOpcos));
            } else {
                handleError(userDetailContext);
            }
        }).catch(() => {
            handleUnknownError(userDetailContext);
        });
};

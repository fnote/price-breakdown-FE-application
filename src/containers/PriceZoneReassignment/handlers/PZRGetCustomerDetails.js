import {
    constructRequestUrl,
    constructFetchRequest,
    handleResponse,
    openNotificationWithIcon
} from '../helper/PZRHelper';
import {getBffUrlConfig} from '../../../utils/Configs';
import {CIPZErrorMessages, ErrorCodes} from '../../../constants/Errors';

export const fetchCustomerDetails = ({id, setResultLoading, setError, setCustomers}) => {
    const requestUrl = constructRequestUrl(getBffUrlConfig().pzCustomerDetails.replace(':request_id', id),
        {});
    setResultLoading(true);
    fetch(requestUrl, constructFetchRequest())
        .then(handleResponse)
        .then((resp) => {
            if (resp.success) {
                setError(false);
                setResultLoading(false);
                setCustomers(resp.data.customers);

            } else {
                const errorResponseData = resp.data;
                if (errorResponseData && errorResponseData.errorCode === ErrorCodes.CIPZ_PROVIDED_INVALID_OFFSET) {
                    fetchCustomerDetails({
                        setResultLoading,
                        setError,
                        setCustomers
                    });
                } else {
                    setError(true);
                    openNotificationWithIcon('error',
                        CIPZErrorMessages.FETCH_CUSTOMER_ERROR_MESSAGE, CIPZErrorMessages.FETCH_CIPZ_API_DATA_TITLE);
                    setResultLoading(false);
                }
            }
        })
        .catch(() => {
            openNotificationWithIcon('error', CIPZErrorMessages.UNKNOWN_ERROR_OCCURRED, CIPZErrorMessages.FETCH_CIPZ_API_DATA_TITLE);
            setError(true);
            setResultLoading(false);
        });
};

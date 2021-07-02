import {getBffUrlConfig} from '../../../utils/Configs';
import {CORRELATION_ID_HEADER, NOT_APPLICABLE_LABEL} from '../../../constants/Constants';

export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_OFFSET = 0;

const handleResponse = (response) => {
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

const formRequestBody = (requestData) => JSON.stringify({
        business_unit_number: requestData.opcoId,
        item_attribute_group_id: requestData.attributeGroupId,
        customer_account: requestData.customer ? requestData.customer : null,
        customer_group_id: requestData.customerGroup ? requestData.customerGroup : null,
        offset: requestData.offset ? requestData.offset : DEFAULT_OFFSET,
        limit: requestData.limit ? requestData.limit : DEFAULT_PAGE_SIZE,
    });

export const PZRFetchSearchResults = (requestData, pZRContext) => {
    pZRContext.setSearchTableLoading(true);
    fetch(getBffUrlConfig().priceZoneReassignmentSearchUrl, {
        method: 'POST',
        body: formRequestBody(requestData),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then((response) => handleResponse(response))
        .then((resp) => {
            if (resp.success) {
                pZRContext.setSearchResults({...resp.data, correlationId: resp.headers[CORRELATION_ID_HEADER]});
            } else {
                pZRContext.setErrorData({
                    ...resp.data,
                    correlationId: resp.headers[CORRELATION_ID_HEADER],
                    httpStatus: resp.httpStatus
                });
            }
            return null;
        })
        .catch((e) => {
            pZRContext.setErrorData(e);
        })
        .finally(() => {
            pZRContext.setSearchLoading(false);
            pZRContext.setSearchTableLoading(false);
        });
};

import { formatBusinessUnit } from './CommonUtils';
import { CORRELATION_ID_HEADER, NOT_APPLICABLE_LABEL } from '../constants/Constants';

const formatTime = (timestamp) => new Date(timestamp).toLocaleDateString();
export const formatPZRequest = ({
    createdTime, submitter, newPriceZone, businessUnitNumber, effectiveFromDate,
    customerGroup, customerAccount, itemAttributeGroup, itemAttributeGroupId, ...rem
}, { businessUnitMap }) => ({
    submission: {
        createdTime: formatTime(createdTime),
        ...submitter,
    },
    changeSummary: {
        businessUnit: formatBusinessUnit(businessUnitNumber, businessUnitMap),
        newPriceZone,
        effectiveFromDate,
        customerGroup,
        customerAccount,
        itemAttributeGroup,
        itemAttributeGroupId
    },
    other: {
        ...rem,
    }
});

export const generatePaginationOffset = (page, pageSize) => (page - 1) * pageSize;

export const generatePaginationParams = (page, pageSize) => ({
    offset: generatePaginationOffset(page, pageSize),
    limit: pageSize
});

export const constructQueryParams = (params) => Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');

export const constructRequestUrl = (baseUrl, queryObj) => `${baseUrl}?${constructQueryParams(queryObj)}`;

export const handleResponse = (response) => {
    const correlationId = response.headers.get(CORRELATION_ID_HEADER) || NOT_APPLICABLE_LABEL;
    return response.json().then((json) => {
        if (response.ok) {
        return { success: true, data: json, headers: { [CORRELATION_ID_HEADER]: correlationId } };
        }
        return { success: false, data: json, headers: { [CORRELATION_ID_HEADER]: correlationId } };
    });
};

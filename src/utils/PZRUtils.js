import moment from 'moment';
import { formatBusinessUnit } from './CommonUtils';
import { CORRELATION_ID_HEADER, NOT_APPLICABLE_LABEL } from '../constants/Constants';
import { PZ_DISPLAY_DATE_FORMAT } from '../constants/PZRContants';

export const formatDate = (dateStr) => moment(dateStr, 'YYYYMMDD').format(PZ_DISPLAY_DATE_FORMAT);

export const formatUnixEpoch = (epoch) => moment(epoch).format(PZ_DISPLAY_DATE_FORMAT);

export const formatPZRequest = ({
    createdTime, submitter, newPriceZone, businessUnitNumber, effectiveFromDate,
    customerGroup, customerAccount, itemAttributeGroup, itemAttributeGroupId,
    summary, id, submissionNote, ...rem
}, { businessUnitMap }) => ({
    submission: {
        createdTime: formatUnixEpoch(createdTime),
        submissionNote,
        ...submitter,
    },
    changeSummary: {
        id,
        businessUnit: formatBusinessUnit(businessUnitNumber, businessUnitMap),
        newPriceZone,
        effectiveFromDate: formatDate(effectiveFromDate),
        customerGroup,
        customerAccount,
        itemAttributeGroup,
        itemAttributeGroupId,
        ...summary
    },
    other: {
        ...rem,
    }
});

export const formatPZReferenceRecord = (record) => ({ ...record, effectiveFrom: formatDate(record.effectiveFrom)});

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

export const constructPatchPayload = ({ id: requestId }, { reviewNote, status }, reviewer) => JSON.stringify({
    requestId,
    reviewer,
    reviewNote,
    status
});

export const removeCompletedRequest = (dataStore, currentPage, index) => {
    const dataSource = dataStore[currentPage];
    const itemsBeforeIndex = dataSource.slice(0, index);
    const itemsAfterIndex = dataSource.slice(index + 1, dataSource.length);
    const updatedPage = [...itemsBeforeIndex, ...itemsAfterIndex];
    return { ...dataStore, [currentPage]: updatedPage };
};

export const calculateResetIndex = (currentIndex, currentPage) => {
    if (currentIndex === 0) {
        return currentPage;
    }
    return currentIndex > currentPage ? currentPage : currentIndex;
};

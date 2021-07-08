// Core
import React from 'react';
import moment from 'moment';
import {notification, Select} from 'antd';
// Utils
import {formatBusinessUnitsIdShortName} from '../../../utils/CommonUtils';
// Constants
import {
    AVAILABLE_PRICE_ZONES, CORRELATION_ID_HEADER,
    HEADER_NAME_CONTENT_TYPE,
    HEADER_VALUE_APPLICATION_JSON,
    HTTP_METHOD_GET, NOT_APPLICABLE_LABEL
} from '../../../constants/Constants';
import {
    CIPZ_API_DATE_FORMAT,
    PZ_DISPLAY_DATE_FORMAT,
    REVIEW_STATUS_APPROVED,
    REVIEW_STATUS_REJECTED,
    REVIEW_STATUS_APPROVED_MSG,
    REVIEW_STATUS_REJECTED_MSG,
    REVIEW_STATUS_CHANGED_MSG
} from '../../../constants/PZRConstants';

const {Option} = Select;

const formatUnixEpoch = (epoch) => moment(epoch * 1000).format(PZ_DISPLAY_DATE_FORMAT);

const constructQueryParams = (params) => Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');

export const openNotificationWithIcon = (type, description, title) => {
    notification[type]({
        message: title,
        description,
    });
};

export const getPriceZoneOptions = () => {
    const priceZoneOptions = [];
    AVAILABLE_PRICE_ZONES.forEach(((priceZone) => {
        priceZoneOptions.push(
            <Option key={priceZone}
                    value={priceZone}>{priceZone}</Option>
        );
    }));
    return priceZoneOptions;
};

export const getAttributeGroups = (attributeGroupsResponse) => {
    const attributeGroups = [];
    const attributeGroupMap = new Map();
    attributeGroupsResponse.forEach(((attributeGroup) => {
        attributeGroups.push(
            <Option key={attributeGroup.id}
                    value={`${attributeGroup.id}`}>{attributeGroup.name}</Option>
        );
        attributeGroupMap.set(attributeGroup.id, attributeGroup.name);
    }));
    return {attributeGroups, attributeGroupMap};
};

export const calculateOffset = (currentPage, pageSize) => (currentPage - 1) * pageSize;

export const getBusinessUnits = (businessUnitsMap) => {
    const businessUnitOptions = [];
    if (businessUnitsMap) {
        businessUnitsMap.forEach(((businessUnit) => {
            businessUnitOptions.push(
                <Option key={businessUnit.id}
                        value={formatBusinessUnitsIdShortName(businessUnit.id, businessUnitsMap)}>
                            {businessUnit.id} - {businessUnit.shortName}
                </Option>
            );
        }));
    }
    return businessUnitOptions;
};

// line 1 : Disabling weekends
// line 2 : Disabling past days
// line 3 : Disabling future date after next monday
export const disabledDate = (current) => current.day() === 0 || current.day() === 6
    || current < moment().endOf('day')
    || current > moment().startOf('isoWeek').add(1, 'week');

export const formatDate = (dateStr) => moment(dateStr, CIPZ_API_DATE_FORMAT).format(PZ_DISPLAY_DATE_FORMAT);

export const generateReviewer = ({username, firstName, lastName, email}) => ({
    id: username,
    givenName: firstName,
    surname: lastName,
    email
});

export const formatPriceZones = (priceZones = []) => priceZones.join(',');

export const formatPZRequest = ({
                                    createdTime, submitter, newPriceZone, oldPriceZone, businessUnitNumber, effectiveFromDate,
                                    customerGroup, customerAccount, itemAttributeGroup, itemAttributeGroupId,
                                    summary, id, submissionNote, reviewStatus, ...rem
                                }, {businessUnitMap}) => ({
    submission: {
        createdTime: formatUnixEpoch(createdTime),
        submissionNote,
        ...submitter,
    },
    changeSummary: {
        id,
        businessUnit: formatBusinessUnitsIdShortName(businessUnitNumber, businessUnitMap),
        newPriceZone,
        oldPriceZone: formatPriceZones(oldPriceZone),
        effectiveFromDate: formatDate(effectiveFromDate),
        customerGroup,
        customerAccount,
        itemAttributeGroup,
        itemAttributeGroupId,
        ...summary
    },
    reviewStatus,
    other: {
        ...rem,
    }
});

export const constructPatchPayload = ({id: requestId}, {reviewNote, status}, reviewer) => JSON.stringify({
    requestId,
    reviewer,
    reviewNote,
    status
});

export const calculateResetIndex = (currentIndex, currentPage) => {
    if (currentIndex === 0) {
        return currentPage;
    }
    return currentIndex > currentPage ? currentPage : currentIndex;
};

export const updateCompletedRequest = (dataStore, currentPage, index, statusMsg = null) => {
    const dataSource = dataStore[currentPage];
    const dataSourceCopy = [...dataSource];
    dataSourceCopy[index].reviewStatus = statusMsg;
    return {...dataStore, [currentPage]: dataSourceCopy};
};

export const constructFetchRequest = (method = HTTP_METHOD_GET, body = null) => {
    const request = {
        method,
        body,
        credentials: 'include',
        headers: {
            Accept: 'application/json'
        }
    };
    if (method !== HTTP_METHOD_GET) {
        request.headers[HEADER_NAME_CONTENT_TYPE] = HEADER_VALUE_APPLICATION_JSON;
    }
    return request;
};

export const handleResponse = (response) => {
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

export const formatPZReferenceRecord = (record) => ({...record, effectiveFrom: formatDate(record.effectiveFromDate)});

export const generatePaginationParams = (page, pageSize) => ({
    offset: calculateOffset(page, pageSize),
    limit: pageSize
});

export const constructRequestUrl = (baseUrl, queryObj) => `${baseUrl}?${constructQueryParams(queryObj)}`;

export const getReviewStatusMsg = (status = null) => {
    if (status === REVIEW_STATUS_APPROVED) {
        return REVIEW_STATUS_APPROVED_MSG;
    }
    if (status === REVIEW_STATUS_REJECTED) {
        return REVIEW_STATUS_REJECTED_MSG;
    }
    return REVIEW_STATUS_CHANGED_MSG;
};

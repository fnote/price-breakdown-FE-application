// Core
import React from 'react';
import moment from 'moment';
import {notification, Select} from 'antd';
// Utils
import {formatBusinessUnitsIdShortName} from '../../../utils/CommonUtils';
// Constants
import {
    AVAILABLE_PRICE_ZONES,
    CORRELATION_ID_HEADER,
    HEADER_NAME_CONTENT_TYPE,
    HEADER_VALUE_APPLICATION_JSON,
    HTTP_METHOD_GET,
    NOT_APPLICABLE_LABEL
} from '../../../constants/Constants';
import {
    CIPZ_API_DATE_FORMAT,
    PZ_DISPLAY_DATE_FORMAT,
    REVIEW_STATUS_APPROVED,
    REVIEW_STATUS_APPROVED_MSG,
    REVIEW_STATUS_CHANGED_MSG,
    REVIEW_STATUS_REJECTED,
    REVIEW_STATUS_REJECTED_MSG
} from '../../../constants/PZRConstants';
import BUSINESS_UNITS_MAP from '../../../constants/BusinessUnits';

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

export const prepareBusinessUnitsMap = (businessUnitNumbers = []) => {
    const businessUnitsMap = new Map();
    businessUnitNumbers.forEach((number) => {
        const businessUnit = BUSINESS_UNITS_MAP.get(number);
        if (businessUnit) {
            businessUnitsMap.set(number, businessUnit);
        }
    });
    return businessUnitsMap;
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
                                    createdTime, submitter, newPriceZone, oldPriceZone, businessUnitNumber, effectiveFromDate, exportedEffectiveFromDate,
                                    customerGroup, customerAccount, businessCenterItemAttributeGroup, businessCenterItemAttributeGroupId,
                                    summary, id, submissionNote, status, reviewStatus, reviewer, reviewNote, reviewedTime, ...rem
                                }, {businessUnitMap}) => ({
    submission: {
        createdTime: formatUnixEpoch(createdTime),
        submissionNote,
        ...submitter,
    },
    reviewerDetails:{
        createdTime: formatUnixEpoch(reviewedTime),
        submissionNote: reviewNote,
        ...reviewer,
    },
    changeSummary: {
        id,
        businessUnit: formatBusinessUnitsIdShortName(businessUnitNumber, businessUnitMap),
        newPriceZone,
        oldPriceZone: formatPriceZones(oldPriceZone),
        effectiveFromDate: formatDate(effectiveFromDate),
        exportedEffectiveFromDate: formatDate(exportedEffectiveFromDate),
        customerGroup,
        customerAccount,
        businessCenterItemAttributeGroup,
        businessCenterItemAttributeGroupId,
        ...summary
    },
    reviewStatus,
    status,
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

export const getEmptyDataTableMessage = (error = false) => (error ? 'Sorry we could not retrieve the information' : 'No Changes to Review');

/**
 * Truncates a given input string based on the maximum allowed length param provided
 * If the length of the string > maximum allowed length, truncate and attach '...' to the end of the string
 *
 * @param {*} str input string
 * @param {*} n max allowed length
 * @returns string
 */
export const truncate = (str, n) => {
    if (str) {
        return (str.length > n) ? `${str.substr(0, n - 3)}...` : str;
    }
    return '';
};

export const autoSize = (textLength) => {
    let fontsize = 1;
    if (textLength) {
        const length = textLength.length;
        if (length >= 3 && length < 10) {
            fontsize = 1.5;
        } else if (length >= 10) {
            fontsize = 0.9;
        }
    }
    return `${fontsize}rem`;
};

export const getStyleClassByApprovalStatus = (status) => {
    if (status === REVIEW_STATUS_APPROVED) {
        return 'pz-aproved';
    }
    if (status === REVIEW_STATUS_REJECTED) {
        return 'pz-rejected';
    }
    return 'pz-already';
};

export const extractOpCoId = (opco) => (opco.split('-'))[0];

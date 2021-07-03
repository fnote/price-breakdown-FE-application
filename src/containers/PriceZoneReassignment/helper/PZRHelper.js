// Core
import React from 'react';
import moment from 'moment';
import {notification, Select} from 'antd';

// Constants
import {AVAILABLE_PRICE_ZONES} from '../../../constants/Constants';
import {CIPZ_API_DATE_FORMAT, PZ_DISPLAY_DATE_FORMAT} from '../../../constants/PZRConstants';

const {Option} = Select;

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
                        value={`${businessUnit.id}-${businessUnit.shortName}`}>{businessUnit.id} - {businessUnit.shortName}</Option>
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

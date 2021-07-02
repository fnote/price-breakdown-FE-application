import React from 'react';
import {Select} from 'antd';

import {AVAILABLE_PRICE_ZONES} from '../../../constants/Constants';

const {Option} = Select;

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

export const calculateOffset = (currentPage, pageSize) => {
    return (currentPage - 1) * pageSize;
};

export const getBusinessUnits = (businessUnitsMaps) => {
    const businessUnitsMap = new Map([
        ['019', {id: '019', shortName: 'Sysco Cincinnati'}], ['011', {id: '011', shortName: 'Temp'}]
    ]);

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

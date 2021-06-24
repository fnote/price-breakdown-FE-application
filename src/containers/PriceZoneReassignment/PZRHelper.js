import React from 'react';
import {Select} from 'antd';

import {AVAILABLE_PRICE_ZONES} from '../../constants/Constants'

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

export const calculateOffset = (currentPage, pageSize) => {
    return (currentPage - 1) * pageSize;
};

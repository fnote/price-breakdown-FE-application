import React from 'react';
import {Select} from 'antd';
import moment from 'moment';
import {EMPTY_STRING} from '../../constants/Constants';

const {Option} = Select;

export const getBusinessUnits = (businessUnitsMap) => {
    const businessUnitOptions = [];
    if (businessUnitsMap) {
        businessUnitsMap.forEach(((businessUnit) => {
            businessUnitOptions.push(
                <Option key={businessUnit.id}
                        value={businessUnit.id}>{businessUnit.id} - {businessUnit.shortName}</Option>
            );
        }));
    }

    return businessUnitOptions;
};

export const setInitialValues = (requestContext) => {
    if (requestContext.isPriceValidationRequest) {
        const {
            baseRequest: {site, customer, supc, split},
            priceValidationRequest: {quantity, date, handPrice}
        } = requestContext.requestData;
        return {
            site,
            supc,
            customer,
            quantity,
            date,
            handPrice,
            split
        };
    }
    if (requestContext.isHistoryInquiryRequest) {
        const {baseRequest: {site, customer, supc, split}} = requestContext.requestData;
        return {
            site,
            customer,
            supc,
            split,
            quantity: 1,
            date: moment()
        };
    }
    return {
        site: EMPTY_STRING,
        customer: EMPTY_STRING,
        supc: EMPTY_STRING,
        quantity: 1,
        date: moment(),
        split: false
    };
};

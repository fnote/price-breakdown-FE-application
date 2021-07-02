import React from 'react';
import { Select } from 'antd';
import moment from "moment";

const { Option } = Select;

export const getBusinessUnits = (businessUnitsMap) => {
    const businessUnitOptions = [];
    if (businessUnitsMap) {
        businessUnitsMap.forEach(((businessUnit) => {
            businessUnitOptions.push(
                <Option key={businessUnit.id} value={businessUnit.id}>{businessUnit.id} - {businessUnit.shortName}</Option>
            );
        }));
    }

    return businessUnitOptions;
};

export const setInitialValues = (requestContext, bUnitMap) => {

    if (requestContext.isPriceValidationRequest) {
        const {baseRequest: {site, customer, supc, split}, priceValidationRequest: {quantity, date, handPrice}} = requestContext.requestData;
        console.log(site, bUnitMap.get(site));
        const businessUnit = bUnitMap.get(site);
        return {
            site: `${businessUnit.id} - ${businessUnit.name}`,
            supc: supc,
            customer: customer,
            quantity: quantity,
            date: date,
            handPrice: handPrice,
            split: split
        }
    } else if (requestContext.isHistoryInquiryRequest) {
        const {baseRequest: {site, customer, supc, split}} = requestContext.requestData;
        console.log(site, bUnitMap.get(site));
        const businessUnit = bUnitMap.get(site);
        return {
            site: `${businessUnit.id} - ${businessUnit.name}`,
            customer: customer,
            supc: supc,
            split: split,
            quantity: 1,
            date: moment()
        }
    } else {
        return {
            site: "",
            customer: "",
            supc: "",
            quantity: 1,
            date: moment(),
            split: false
        }
    }
}
import React from 'react';

export const setHistoryInquiryInitialValues = (requestContext, bUnitMap) => {
    if (requestContext.isPriceValidationRequest) {
        const {baseRequest: {site, customer, supc, split}} = requestContext.requestData;
        const businessUnit = bUnitMap.get(site);
        return {
            site: businessUnit.id - businessUnit.shortName,
            supc: supc,
            customer: customer,
            rangeDate: "",
            split: split
        }
    } else if (requestContext.isHistoryInquiryRequest) {
        const {
            baseRequest: {site, customer, supc, split},
            historyInquiryRequest: {startDate, endDate}
        } = requestContext.requestData;
        const businessUnit = bUnitMap.get(site);
        return {
            site: businessUnit.id - businessUnit.shortName,
            customer: customer,
            supc: supc,
            rangeDate: {startDate, endDate},
            split: split
        }
    } else {
        return {
            site: "",
            customer: "",
            rangeDate: "",
            supc: "",
            split: false
        }
    }
}

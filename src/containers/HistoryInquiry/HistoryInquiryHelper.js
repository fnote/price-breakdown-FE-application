import React from 'react';

export const setHistoryInquiryInitialValues = (requestContext, bUnitMap) => {
    console.log(bUnitMap);
    if (requestContext.isPriceValidationRequest) {
        const {baseRequest: {site, customer, supc, split}} = requestContext.requestData;
        return {
            site: bUnitMap.get(site),
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
        return {
            site: bUnitMap.get(site),
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

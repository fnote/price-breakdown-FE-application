
export const setHistoryInquiryInitialValues = (requestContext, bUnitMap) => {
    if (requestContext.isPriceValidationRequest) {
        const {baseRequest: {site, customer, supc, split}} = requestContext.requestData;
        const businessUnit = bUnitMap.find(site);
        return {
            site: businessUnit,
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
        const businessUnit = bUnitMap.find(site);
        return {
            site: businessUnit,
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

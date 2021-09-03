export const setHistoryInquiryInitialValues = (requestContext) => {
    if (requestContext.isPriceValidationRequest) {
        const {baseRequest: {site, customer, supc, split}} = requestContext.requestData;
        return {
            site,
            supc,
            customer,
            rangeDate: '',
            split
        };
    }
    if (requestContext.isHistoryInquiryRequest) {
        const {
            baseRequest: {site, customer, supc, split},
            historyInquiryRequest: {startDate, endDate}
        } = requestContext.requestData;
        return {
            site,
            customer,
            supc,
            rangeDate: {startDate, endDate},
            split
        };
    }
    return {
        site: '',
        customer: '',
        rangeDate: '',
        supc: '',
        split: false
    };
};

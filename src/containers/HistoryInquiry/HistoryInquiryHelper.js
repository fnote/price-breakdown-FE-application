
export const setHistoryInquiryInitialValues = (requestContext) => {
    if (requestContext.isPriceValidationRequest) {
        const {baseRequest: {site, customer, supc, split}} = requestContext.requestData;
        return {
            site: site,
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
            site: site,
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

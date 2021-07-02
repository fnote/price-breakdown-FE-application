
export const setHistoryInquiryInitialValues = (requestContext, bUnitMap) => {
    if (requestContext.isPriceValidationRequest) {
        const {baseRequest: {site, customer, supc, split}} = requestContext.requestData;
        console.log(site, bUnitMap.get(site));
        const businessUnit = bUnitMap.get(site);
        return {
            site: `${businessUnit.id} - ${businessUnit.name}`,
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
        console.log(site, bUnitMap.get(site));
        const businessUnit = bUnitMap.get(site);
        return {
            site: `${businessUnit.id} - ${businessUnit.name}`,
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

import moment from 'moment';
import {CLOUD_PCI_DATE_FORMAT, EMPTY_STRING} from '../../constants/Constants';

export const setHistoryInquiryInitialValues = (requestContext) => {
    if (requestContext.isPriceValidationRequest) {
        const {baseRequest: {site, customer, supc, split}} = requestContext.requestData;
        return {
            site,
            supc,
            customer,
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
        site: EMPTY_STRING,
        customer: EMPTY_STRING,
        supc: EMPTY_STRING,
        split: false
    };
};

/* eslint-disable no-template-curly-in-string */
export const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export const rangeConfig = {
    rules: [
        {
            type: 'array',
            required: true,
            message: 'Please select time!',
        },
    ],
};
export const disabledDate = (current) => (current && current > moment().add(1, 'days').endOf('day'));

export const isEmptyDateRange = (rangeDate) => !(Array.isArray(rangeDate) && rangeDate.length);

export const formRequestBody = (requestData) => {
    const product = {
        supc: requestData.supc,
        splitFlag: requestData.split,
    };

    return JSON.stringify({
        businessUnitNumber: requestData.site,
        customerAccount: requestData.customer,
        fromDate: isEmptyDateRange(requestData.rangeDate) ? EMPTY_STRING : requestData.rangeDate[0].format(CLOUD_PCI_DATE_FORMAT),
        toDate: isEmptyDateRange(requestData.rangeDate) ? EMPTY_STRING : requestData.rangeDate[1].format(CLOUD_PCI_DATE_FORMAT),
        product,
    });
};

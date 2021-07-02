import React from "react";

export const extractBaseRequest = ({requestData: { site, customer, supc, split}}) => ({
    site, customer, supc, split
});

export const extractHistoryInquiryRequest = ({requestData: { startDate, endDate}}) => ({
    startDate, endDate
});

export const extractPriceValidationRequest = ({requestData: { date, quantity, handPrice }}) => ({
    date, quantity, handPrice
});

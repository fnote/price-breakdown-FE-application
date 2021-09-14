import React, {useState} from 'react';
import {extractBaseRequest, extractHistoryInquiryRequest, extractPriceValidationRequest} from '../utils/RequestUtils';

import {PRICE_VALIDATION_REQUEST} from '../constants/Constants';

export const RequestContext = React.createContext({
    requestData: {},
    setRequestData: () => {
        // do nothing.
    }
});

const initialState = {
    request: null,
    requestType: PRICE_VALIDATION_REQUEST,
    baseRequest: null,
    priceValidationRequest: null,
    historyInquiryRequest: null,
};

const mapPriceValidationRequest = (data) => ({
    request: data,
    baseRequest: extractBaseRequest(data),
    priceValidationRequest: extractPriceValidationRequest(data),
});

const mapHistoryInquiryRequest = (data) => ({
    baseRequest: extractBaseRequest(data),
    historyInquiryRequest: extractHistoryInquiryRequest(data)
});

const RequestContextProvider = (props) => {
    const [requestDataState, setRequestData] = useState(initialState);
    const [isPriceValidationRequest, setIsPriceValidationRequest] = useState(false);
    const [isHistoryInquiryRequest, setIsHistoryInquiryRequest] = useState(false);

    const RequestDataUpdateHandler = (data) => {
        if (data.requestType === PRICE_VALIDATION_REQUEST) {
            const processedPriceValidationRequest = mapPriceValidationRequest(data);
            setRequestData(processedPriceValidationRequest);
            setIsPriceValidationRequest(true);
            setIsHistoryInquiryRequest(false);
        } else {
            const processedHistoryInquiryRequest = mapHistoryInquiryRequest(data);
            setRequestData(processedHistoryInquiryRequest);
            setIsPriceValidationRequest(false);
            setIsHistoryInquiryRequest(true);
        }
    };

    return (
        <RequestContext.Provider value={{
            setRequestData: RequestDataUpdateHandler,
            requestData: requestDataState,
            isPriceValidationRequest,
            setIsPriceValidationRequest,
            isHistoryInquiryRequest,
            setIsHistoryInquiryRequest
        }}>
            {props.children}
        </RequestContext.Provider>
    );
};

export default RequestContextProvider;

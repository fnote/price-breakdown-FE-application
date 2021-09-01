import React, {useState} from 'react';
import {extractHistoryInquiryRequestInfo, extractItemInfo, extractSiteInfo} from '../../utils/PricingUtils';

export const HistoryInquiryContext = React.createContext({
    historyInquiryData: {},
    setHistoryInquiryData: () => {
    }
});

const initialState = {
    response: null,
    product: null,
    selectedBusinessUnit: {},
    item: null,
    site: null,
    transactions: null,
};

const mapSuccessResponse = (data) => {
    const product = data.product;
    return {
        response: data,
        product,
        item: extractItemInfo(product),
        site: extractSiteInfo(data),
        historyRequest: extractHistoryInquiryRequestInfo(data),
    };
};

const HistoryInquiryContextProvider = (props) => {
    const [historyInquiryDataState, setHistoryInquiryData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const HistoryInquiryDataUpdateHandler = (data) => {
        const processedState = mapSuccessResponse(data);
        setIsLoading(false);
        setError(null);
        setHistoryInquiryData(processedState);
        setResponse(data);
    };

    const errorUpdateHandler = (data) => {
        setIsLoading(false);
        setError(data);
        setResponse(null);
    };

    return (
        <HistoryInquiryContext.Provider value={{
            setHistoryInquiryData: HistoryInquiryDataUpdateHandler,
            historyInquiryData: historyInquiryDataState,
            setErrorData: errorUpdateHandler,
            setIsLoading,
            isLoading,
            error,
            setError,
            response,
            setResponse
        }}>
            {props.children}
        </HistoryInquiryContext.Provider>
    );
};

export default HistoryInquiryContextProvider;

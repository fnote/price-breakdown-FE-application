import React, {useState} from 'react';
import {extractItemInfo, extractPricePoints, extractRequestInfo, extractSiteInfo} from '../../utils/PricingUtils';

export const PriceValidationContext = React.createContext({
    priceData: {},
    setPriceData: () => {
        // do nothing.
    }
});

const initialState = {
    response: null,
    product: null,
    recentSearches: [],
    selectedBusinessUnit: {},
    item: null,
    pricePoints: null,
    site: null,
};

const mapSuccessResponse = (data) => {
    const product = data.product;

    return {
        response: data,
        product,
        item: extractItemInfo(product),
        pricePoints: extractPricePoints(product),
        site: extractSiteInfo(data),
        order: extractRequestInfo(data)
    };
};

const PriceValidationContextProvider = (props) => {
    const [priceDataState, setPriceData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const priceDataUpdateHandler = (data) => {
        const processedState = mapSuccessResponse(data);
        setIsLoading(false);
        setError(null);
        setPriceData(processedState);
        setResponse(data);
    };

    const errorUpdateHandler = (data) => {
        setIsLoading(false);
        setError(data);
        setResponse(null);
    };

    return (
        <PriceValidationContext.Provider value={{
            setPriceData: priceDataUpdateHandler,
            priceData: priceDataState,
            setErrorData: errorUpdateHandler,
            setIsLoading,
            isLoading,
            error,
            setError,
            response,
            setResponse
        }}>
            {props.children}
        </PriceValidationContext.Provider>
    );
};

export default PriceValidationContextProvider;

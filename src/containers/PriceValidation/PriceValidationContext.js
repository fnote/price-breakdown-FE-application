import React, {useState} from 'react'
import {
    extractItemInfo,
    extractPricePoints,
    extractRequestInfo,
    extractSiteInfo,
    prepareDiscountPriceInfo,
    prepareLocalSegmentPriceInfo,
    prepareNetPriceInfo,
    prepareStrikeThroughPriceInfo,
    prepareVolumePricingInfo,
} from "../../utils/PricingUtils";

export const PriceValidationContext = React.createContext({
    priceData: {},
    setPriceData: () => {
    }
});

const initialState = {
    response: null,
    recentSearches: [],
    selectedBusinessUnit: {id: "067", name: "Philadelphia"},
    localSegmentRefPriceSection: [],
    strikeThroughPriceSection: [],
    discountPriceSection: [],
    orderNetPriceSection: [],
    item: null,
    pricePoints: null,
    site: null,
};

const mapSuccessResponse = (data) => {
    const product = data.products[0];

    return {
        response: data,
        localSegmentRefPriceSection: prepareLocalSegmentPriceInfo(product),
        strikeThroughPriceSection: prepareStrikeThroughPriceInfo(product),
        discountPriceSection: prepareDiscountPriceInfo(product),
        orderNetPriceSection: prepareNetPriceInfo(product),
        ...prepareVolumePricingInfo(product),
        ...extractItemInfo(product),
        ...extractPricePoints(product),
        ...extractSiteInfo(data),
        ...extractRequestInfo(data)
    };
};

const PriceValidationContextProvider = props => {

    const [priceDataState, setPriceData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const priceDataUpdateHandler = (data) => {
        console.log("Received data to context", data);
        console.log("Current state", priceDataState);

        const processedState = mapSuccessResponse(data);

        console.log(">>>> SETTING STATE", processedState);
        setIsLoading(false);
        setError(null);
        setPriceData(processedState);
        setResponse(data);
    };

    const errorUpdateHandler = (data) => {
        console.log("Received error data to context", data);
        console.log("Current state", priceDataState);
        setIsLoading(false);
        setError(data);
        setResponse(null)
    };

    return (
        <PriceValidationContext.Provider value={{
            setPriceData: priceDataUpdateHandler,
            priceData: priceDataState,
            setErrorData: errorUpdateHandler,
            setIsLoading, isLoading,
            error, setError,
            response, setResponse
        }}>
            {props.children}
        </PriceValidationContext.Provider>
    )
};

export default PriceValidationContextProvider;

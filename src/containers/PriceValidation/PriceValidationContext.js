import React, {useState} from 'react'
import {
    extractItemInfo,
    extractPricePoints,
    extractSiteInfo,
    extractRequestInfo,
    prepareDiscountPriceInfo,
    prepareLocalSegmentPriceInfo,
    prepareNetPriceInfo,
    prepareStrikeThroughPriceInfo,
    prepareVolumePricingInfo,
} from "../../utils/PricingUtils";
import temp from "../../reducers/temp";

export const PriceValidationContext = React.createContext({
    priceData: {},
    setPriceData: () => {}

});

const initialState = {
    response: null,
    recentSearches: [],
    error: null,
    isLoading: false,
    selectedBusinessUnit: { id: "067", name: "Philadelphia"},
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
        error: null,
        isLoading: false,
        localSegmentRefPriceSection: prepareLocalSegmentPriceInfo(product),
        strikeThroughPriceSection: prepareStrikeThroughPriceInfo(product),
        discountPriceSection: prepareDiscountPriceInfo(product),
        orderNetPriceSection: prepareNetPriceInfo(product),
        ...prepareVolumePricingInfo(product),
        ...extractItemInfo(product),
        ...extractPricePoints(product),
        ...extractSiteInfo(data, { id: "067", name: "Philadelphia"}),
        ...extractRequestInfo(data)
    };
};

const PriceValidationContextProvider = props => {

    const [priceDataState, setPriceData] = useState(initialState);

    const priceDataUpdateHandler = (data) => {
        console.log("Received data to context", data);

        let processedState = {
            recentSearches: [],
            selectedBusinessUnit: { id: "067", name: "Philadelphia"}
        };

        if (data.isLoading === undefined) {
            processedState = { ...processedState, ...mapSuccessResponse(data) };
        } else {
            processedState = {... processedState, ...data };
        }

        setPriceData(processedState);
    };

    return (
        <PriceValidationContext.Provider value={{setPriceData: priceDataUpdateHandler, priceData: priceDataState}}>
            {props.children}
        </PriceValidationContext.Provider>
    )
};


export default PriceValidationContextProvider;

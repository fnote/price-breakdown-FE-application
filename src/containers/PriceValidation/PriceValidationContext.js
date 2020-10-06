import React, {useState} from 'react'
import {
    extractItemInfo, extractPricePoints, extractSiteInfo,
    prepareDiscountPriceInfo,
    prepareLocalSegmentPriceInfo,
    prepareNetPriceInfo,
    prepareStrikeThroughPriceInfo
} from "../../utils/PricingUtils";

export const PriceValidationContext = React.createContext({
    priceData: {},
    setPriceData: () => {}

});

const initialState = {
    response: {},
    recentSearches: [],
    error: null,
    isLoading: false,
    selectedBusinessUnit: { id: "067", name: "Philadelphia"},
    localSegmentRefPriceSection: [],
    strikeThroughPriceSection: [],
    discountPriceSection: [],
    orderNetPriceSection: [],
    item: {},
    pricePoints: {},
    site: {},
};

const PriceValidationContextProvider = props => {

    const [priceDataState, setPriceData] = useState(initialState);

    const priceDataUpdateHandler = (data) => {
        console.log("Received data to context", data);

        const processedState = {
            response: data,
            recentSearches: [],
            error: null,
            isLoading: false,
            selectedBusinessUnit: { id: "067", name: "Philadelphia"},
            localSegmentRefPriceSection: prepareLocalSegmentPriceInfo(data.products[0]),
            strikeThroughPriceSection: prepareStrikeThroughPriceInfo(data.products[0]),
            discountPriceSection: prepareDiscountPriceInfo(data.products[0]),
            orderNetPriceSection: prepareNetPriceInfo(data.products[0]),
            ...extractItemInfo(data.products[0]),
            ...extractPricePoints(data.products[0]),
            ...extractSiteInfo(data, { id: "067", name: "Philadelphia"}),
        };


        setPriceData(processedState);
    };

    return (
        <PriceValidationContext.Provider value={{setPriceData: priceDataUpdateHandler, priceData: priceDataState}}>
            {props.children}
        </PriceValidationContext.Provider>
    )
};


export default PriceValidationContextProvider;

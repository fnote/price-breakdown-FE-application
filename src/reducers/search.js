import { SEARCH_BUTTON_CLICKED, RESPONSE_RECEIVED } from '../actions/ActionType';
import {
    extractItemInfo,
    extractPricePoints,
    extractSiteInfo,
    prepareLocalSegmentPriceInfo,
    prepareStrikeThroughPriceInfo,
    prepareDiscountPriceInfo,
    prepareNetPriceInfo,
    prepareVolumePricingInfo
} from '../utils/PricingUtils';
import temp from './temp';

/**
 * @author Tharuka Jayalath
 * (C) 2020, Sysco Corporation
 * Created: 9/30/20. Wed 2020 13:27
 */

const initialState = {
    response: temp,
    recentSearches: [],
    error: null,
    isLoading: false,
    selectedBusinessUnit: { id: "067", name: "Philadelphia"},
    localSegmentRefPriceSection: prepareLocalSegmentPriceInfo(temp.products[0]),
    strikeThroughPriceSection: prepareStrikeThroughPriceInfo(temp.products[0]),
    discountPriceSection: prepareDiscountPriceInfo(temp.products[0]),
    orderNetPriceSection: prepareNetPriceInfo(temp.products[0]),
    ...prepareVolumePricingInfo(temp.products[0]),
    ...extractItemInfo(temp.products[0]),
    ...extractPricePoints(temp.products[0]),
    ...extractSiteInfo(temp, { id: "067", name: "Philadelphia"}),
};

export default function searchReducer(state = initialState, action = {}) {

    switch (action.type) {
        case SEARCH_BUTTON_CLICKED: {
            return {
                ...state,
                isLoading: true,
                response: {},
                error: null
            };
        }

        case RESPONSE_RECEIVED: {
            return {
                ...state,
                ...extractItemInfo(action.payload),
                ...extractPricePoints(action.payload),
                response: action.payload
            };
        }


    }

    return state;
}

import { SEARCH_BUTTON_CLICKED, RESPONSE_RECEIVED } from '../actions/ActionType';
import {
    extractItemInfo,
    extractPricePoints,
    extractSiteInfo,
    prepareLocalSegmentPriceInfo,
    prepareStrikeThroughPriceInfo,
    prepareDiscountPriceInfo,
    prepareOrderUnitPriceInfo,
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
    localSegmentRefPriceSection: prepareLocalSegmentPriceInfo(temp.product),
    strikeThroughPriceSection: prepareStrikeThroughPriceInfo(temp.product),
    discountPriceSection: prepareDiscountPriceInfo(temp.product),
    orderNetPriceSection: prepareOrderUnitPriceInfo(temp.product),
    ...prepareVolumePricingInfo(temp.product),
    ...extractItemInfo(temp.product),
    ...extractPricePoints(temp.product),
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

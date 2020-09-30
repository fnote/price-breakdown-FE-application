import { SEARCH_BUTTON_CLICKED, RESPONSE_RECEIVED } from '../actions/ActionType';

/**
 * @author Tharuka Jayalath
 * (C) 2020, Sysco Corporation
 * Created: 9/30/20. Wed 2020 13:27
 */

const initialState = {
    response: {},
    recentSearches: [],
    error: null,
    isLoading: false
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
                response: action.payload
            };
        }


    }

    return state;
}

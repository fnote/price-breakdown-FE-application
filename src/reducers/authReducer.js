import {USER_AUTHENTICATION} from '../actions/ActionType';

const initialState = {
    isLoggedCompleted: false,
    error: null
};

const authReducer = (state = initialState, action = {}) => {

    switch (action.type) {
        case USER_AUTHENTICATION: {
            console.log(action)
            return {
                ...state,
                isLoginSucceeded: action.payload.isLoginSucceeded,
                userDetails: action.payload.userDetails,
                error: action.payload.error
            };
        }
    }

    return state;
};

export default authReducer;
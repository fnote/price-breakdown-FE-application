/**
 * Reducer for drawer to open and close accordingly.
 *
 * @author: adis0892 on 6/23/18
 **/
import { OPEN_DRAWER } from "../actions/ActionType";

const OpenDrawerReducer = (state = true, action) => {
    let newState;
    switch (action.type) {
        case OPEN_DRAWER:
            return newState = action.isOpen;
        default:
            return state
    }
};

export default OpenDrawerReducer;

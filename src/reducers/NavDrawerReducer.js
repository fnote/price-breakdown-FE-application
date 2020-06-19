/**
 * Reducer for changes that happens in navigation panel.
 *
 * @author: adis0892 on 6/22/18
 **/

import { SHOW_EXCEL_UPLOAD, NAVIGATE } from "../actions/ActionType";

const NavDrawerReducer = (state = SHOW_EXCEL_UPLOAD, action) => {
    let newState;
    switch (action.type) {
        case NAVIGATE:
            return newState = action.navigationState;
        default:
            return state
    }
};

export default NavDrawerReducer;

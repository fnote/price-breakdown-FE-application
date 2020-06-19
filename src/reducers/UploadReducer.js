/**
 * Reducer for which takes the action of uploading a file.
 *
 * @author: adis0892 on 6/22/18
 **/

import { UPLOAD_FILE } from "../actions/ActionType";

const UploadReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case UPLOAD_FILE:
            return newState = action.excelData;
        default:
            return state
    }
};

export default UploadReducer;

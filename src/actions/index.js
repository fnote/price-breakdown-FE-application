/**
 * Different actions based on different action types.
 *
 * @author: adis0892 on 6/21/18
 **/

import * as actionType from './ActionType';

export const uploadFile = (data) => ({
    type: actionType.UPLOAD_FILE,
    excelData: data
});

export const navigate = (data) => ({
    type: actionType.NAVIGATE,
    navigationState: data
});

export const openDrawer = (data) => ({
    type: actionType.OPEN_DRAWER,
    isOpen: data
});

import {ErrorCodes} from './Errors';

export const notificationTitles = {
    FETCH_ITEM_ATTRIBUTE_ERROR_TITLE: 'Sorry we could not retrieve the information. Please refresh again.',
    FETCH_SEARCH_RESULTS_TITLE: 'Sorry we could not retrieve the information. Please try again later.'
};

export const notificationMessage = {
    FETCH_ITEM_ATTRIBUTE_ERROR_MESSAGE: 'Could not retrieve the attribute group information due to connection issue.',
    FETCH_SEARCH_RESULTS_MESSAGE: 'Could not retrieve the information due to connection issue.'
};

export const notificationMap = new Map([
    [ErrorCodes.INVALID_CUSTOMER_ACCOUNT_PZR_ERROR, {title: notificationTitles.FETCH_SEARCH_RESULTS_TITLE,
         message: notificationMessage.FETCH_SEARCH_RESULTS_MESSAGE}],
    [ErrorCodes.INVALID_CUSTOMER_GROUP_ERROR, {title: notificationTitles.FETCH_SEARCH_RESULTS_TITLE,
         message: notificationMessage.FETCH_SEARCH_RESULTS_MESSAGE}],
    [ErrorCodes.ITEM_ATTRIBUTE_GROUP_FETCH_ERROR, {title: notificationTitles.FETCH_ITEM_ATTRIBUTE_ERROR_TITLE,
         message: notificationMessage.FETCH_ITEM_ATTRIBUTE_ERROR_MESSAGE}],
]);

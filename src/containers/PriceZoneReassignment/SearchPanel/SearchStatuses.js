import React, { useContext } from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { ErrorCodes, ErrorMessages, ErrorsMap, HTTP_INTERNAL_SERVER_ERROR, HTTP_NOT_FOUND_ERROR } from '../../../constants/Errors';
import RequestId from '../../../components/RequestId';
import { PZRContext } from '../PZRContext';
import {notificationMap} from '../../../constants/NotificationDataMap';

const renderWelcomeMessage = () => (
    <div className="search-statuses">
        <div className="section-wrapper">
            <div className="welcome-message message-block">
                <div className="title">
                    <i className="icon fi flaticon-accounting" /> Welcome to the Price Zone Reassignment Tool
                </div>
                <div className="subitle-title">
                    <i className="icon fi flaticon-arrow" /> To start select an item attribute group and enter
                    customer/customer group
                </div>
            </div>
        </div>
    </div>
);

const renderLoader = () => (
    <div className="search-statuses">
        <div className="section-wrapper">
            <div className="loading message-block">
                <div className="title">
                    <SyncOutlined spin className="icon" /> Retrieving Price Zone Information
                </div>
            </div>
        </div>
    </div>
);

const renderError = ({ errorCode, message, correlationId }) => (
    <div className="search-statuses">
        <div className="section-wrapper">
            <div className="error message-block">
                <div className="title">
                    <i className="icon fi flaticon-error-1" /> Sorry we could not retrieve price zones for your search criteria
                </div>
                <div className="subitle-title">
                    Error {errorCode} - {message}
                </div>
                <RequestId requestId={correlationId} />
            </div>
        </div>
    </div>
);

const emptyResponse = (correlationId) => (
    <div className="search-statuses">
        <div className="section-wrapper">
            <div className="info message-block">
                <div className="title">
                    <i className="icon fi flaticon-error-1" />  Your search did not found any match.
                </div>
                <div className="subitle-title">
                    Suggestions
                </div>
                <div className="subitle-title">
                    <ul>
                    <li>Make sure right OpCo is selected.</li>
                    <li>Make sure entered Customer or Customer Group are valid.</li>
                    </ul>
                </div>
                <RequestId requestId={correlationId} />
            </div>
        </div>
    </div>
);

const renderContinueSearch = () => (
    <div className="search-statuses">
        <div className="section-wrapper">
            <div className="welcome-message message-block">
                <div className="title">
                    <i className="icon fi flaticon-accounting" /> Welcome to the Price Zone Reassignment Tool
                </div>
                <div className="subitle-title">
                    <i className="icon fi flaticon-arrow" /> Your price zone change request is sent for the review. Select an item attribute group and enter
                    customer/customer group for more changes.
                </div>
            </div>
        </div>
    </div>
);

const SearchStatuses = () => {
    const PZRContextData = useContext(PZRContext);

    const openNotificationWithIcon = (type, description, msg) => {
        notification[type]({
            message: msg,
            description,
        });
    };

    if (PZRContextData.isSearchLoading) {
        return renderLoader();
    }

    if (PZRContextData.searchResults) {
        const { correlationId } = PZRContextData.searchResults;
        const isResponseEmpty = PZRContext.isResponseEmpty;
        if (isResponseEmpty) {
            return emptyResponse(correlationId);
        }
    }

    if (PZRContextData.searchError) {
        const { errorCode, correlationId, httpStatus } = PZRContextData.searchError;
        if (errorCode) {
            if (errorCode === ErrorCodes.ITEM_ATTRIBUTE_GROUP_FETCH_ERROR) { 
                if (httpStatus !== HTTP_NOT_FOUND_ERROR) {
                    const notificationDetails = notificationMap.get(errorCode);
                    openNotificationWithIcon('error', notificationDetails.title, notificationDetails.message);
                }
            }

            if ([ErrorCodes.INVALID_CUSTOMER_ACCOUNT_PZR_ERROR, ErrorCodes.INVALID_CUSTOMER_GROUP_ERROR].includes(errorCode)) {
                if (httpStatus !== HTTP_NOT_FOUND_ERROR) {
                    const notificationDetails = notificationMap.get(errorCode);
                    openNotificationWithIcon('error', notificationDetails.title, notificationDetails.message);
                }
            }

            if (httpStatus === HTTP_NOT_FOUND_ERROR) {
                const message = ErrorsMap.get(errorCode);
                if (message) {
                    return renderError({ errorCode: ErrorCodes.UNEXPECTED_ERROR, message, correlationId });
                }
                return renderError({ errorCode: ErrorCodes.UNEXPECTED_ERROR, message: ErrorMessages.UNEXPECTED_ERROR });
            }
        }
        if (httpStatus !== HTTP_INTERNAL_SERVER_ERROR) {
            return renderError({ errorCode: ErrorCodes.UNEXPECTED_ERROR, message: ErrorMessages.UNEXPECTED_ERROR });
        }
    }

    if (!PZRContextData.searchResults) {
        if (PZRContextData.isFirstSubmissionDone) {
            return renderContinueSearch();
        }
        return renderWelcomeMessage();
    }

    return null;
};

export default SearchStatuses;

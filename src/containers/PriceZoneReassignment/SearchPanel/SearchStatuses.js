import React, {useContext} from 'react';
import {SyncOutlined} from '@ant-design/icons';
import {notification} from 'antd';
import {
    ErrorCodes,
    CIPZErrorMessages,
    PZRSEEDErrorsMap,
    HTTP_INTERNAL_SERVER_ERROR
} from '../../../constants/Errors';
import {PZRRequestId} from '../../../components/RequestId';
import {PZRContext} from '../PZRContext';

const renderWelcomeMessage = () => (
    <div className="search-statuses cipz-empty-search">
        <div className="section-wrapper">
            <div className="welcome-message message-block">
                <div className="title">
                    <i className="icon fi flaticon-price-zone"/> Welcome to the Price Zone Reassignment Tool
                </div>
                <div className="subitle-title">
                    <i className="icon fi flaticon-arrow"/> To start select an item attribute group and enter
                    customer/customer group
                </div>
            </div>
        </div>
    </div>
);

const renderLoader = () => (
    <div className="search-statuses cipz-empty-search">
        <div className="section-wrapper">
            <div className="loading message-block">
                <div className="title">
                    <SyncOutlined spin className="icon"/> Retrieving Price Zone Information
                </div>
            </div>
        </div>
    </div>
);

const renderError = ({errorCode, message, correlationId}) => (
    <div className="search-statuses cipz-empty-search">
        <div className="section-wrapper">
            <div className="error message-block">
                <div className="title">
                    <i className="icon fi flaticon-error-1"/> Sorry we could not retrieve search results
                </div>
                <div className="pz-error-block">
                    Error {errorCode} - {message}
                </div>
                <PZRRequestId requestId={correlationId}/>
            </div>
        </div>
    </div>
);

const emptyResponse = (correlationId) => (
    <div className="search-statuses cipz-empty-search">
        <div className="section-wrapper">
            <div className="info message-block">
                <div className="title">
                    <i className="icon fi flaticon-error-1"/> Your search did not find any match.
                </div>
                <div className="subitle-title">
                    Suggestions
                </div>
                <div className="pz-search-suggestion-list">
                    <ul>
                        <li>Make sure correct OpCo is selected.</li>
                        <li>Make sure entered Customer or Customer Group are valid.</li>
                    </ul>
                </div>
                <PZRRequestId requestId={correlationId}/>
            </div>
        </div>
    </div>
);

const renderContinueSearch = () => (
    <div className="search-statuses cipz-empty-search">
        <div className="section-wrapper">
            <div className="welcome-message message-block">
                <div className="title">
                    <i className="icon fi flaticon-price-zone"/> Welcome to the Price Zone Reassignment Tool
                </div>
                <div className="subitle-title">
                    <i className="icon fi flaticon-arrow"/> Your price zone change request is sent for the review.
                    Select an item attribute group and enter
                    customer/customer group for more changes.
                </div>
            </div>
        </div>
    </div>
);

const openNotificationWithIcon = (type, description, msg) => {
    notification[type]({
        message: msg,
        description,
    });
};

const SearchStatuses = () => {
    const PZRContextData = useContext(PZRContext);

    if (PZRContextData.isSearchLoading) {
        return renderLoader();
    }

    if (PZRContextData.searchError) {
        // Only SEED Error, BFF Joi validation and unknown errors can reach here and
        const {errorCode, correlationId, httpStatus} = PZRContextData.searchError;
        if (httpStatus === HTTP_INTERNAL_SERVER_ERROR) {
            openNotificationWithIcon('error', CIPZErrorMessages.FETCH_SEARCH_RESULTS_MESSAGE, CIPZErrorMessages.UNKNOWN_ERROR_OCCURRED);
            PZRContextData.setErrorData(null);
            return null;
        }
        if (errorCode) {
            if (errorCode === ErrorCodes.SEED_NO_RESULTS_ERROR) {
                return emptyResponse(correlationId);
            }

            if (errorCode === ErrorCodes.SEED_UNKNOWN_ERROR) {
                openNotificationWithIcon('error', CIPZErrorMessages.FETCH_SEARCH_RESULTS_MESSAGE, CIPZErrorMessages.FETCH_SEARCH_RESULTS_TITLE);
                PZRContextData.setErrorData(null);
                return null;
            }

            const renderMessage = PZRSEEDErrorsMap[errorCode] ? PZRSEEDErrorsMap[errorCode] : CIPZErrorMessages.GENERIC_SEED_SEARCH_ERROR;
            return renderError({errorCode: errorCode, message: renderMessage, correlationId: correlationId});
        }

        return renderError({errorCode: ErrorCodes.UNEXPECTED_ERROR, message: CIPZErrorMessages.UNKNOWN_ERROR_OCCURRED});
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

// Core
import React, {useContext} from 'react';
import {SyncOutlined} from '@ant-design/icons';
// Custom Components
import {PZRRequestId} from '../../../components/RequestId';
// Context
import {PZRContext} from '../PZRContext';
// Helper functions and Constants
import {openNotificationWithIcon} from '../helper/PZRHelper';
import {
    ErrorCodes,
    CIPZErrorMessages,
    PZRSEEDErrorsMap,
    HTTP_INTERNAL_SERVER_ERROR
} from '../../../constants/Errors';

const renderWelcomeMessage = () => (
    <div className="search-statuses cipz-empty-search">
        <div className="section-wrapper">
            <div className="welcome-message message-block">
                <div className="title">
                    <i className="icon fi flaticon-price-zone"/> Welcome to the Price Zone Reassignment Tool
                </div>
                <div className="subitle-title">
                    <i className="icon fi flaticon-arrow"/> To start select a site, customer/customer group and
                     business center – item group – attribute group
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
                        <li>Make sure correct Site OpCo is selected.</li>
                        <li>Make sure entered Customer or Customer Group are valid.</li>
                    </ul>
                </div>
                <PZRRequestId requestId={correlationId}/>
            </div>
        </div>
    </div>
);

export const emptyResponseForTHL = () => (
    <div className="search-statuses cipz-empty-search">
        <div className="section-wrapper">
            <div className="info message-block">
                <div className="title">
                    <i className="icon fi flaticon-error-1"/> Your filter did not find any match.
                </div>
                <div className="subitle-title">
                    Suggestions
                </div>
                <div className="pz-search-suggestion-list">
                    <ul>
                        <li>Make sure correct OpCo is selected. or</li>
                        <li>Make sure entered Customer or Customer Group are valid. or</li>
                        <li>Make sure correct combination of OpCo, Customer or Customer Group & Attribute Group is selected.</li>
                    </ul>
                </div>
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
                    Select a business center - item group - attribute group and enter
                    customer/customer group for more changes.
                </div>
            </div>
        </div>
    </div>
);

function handlingErrorScenarios(errorCode, correlationId, PZRContextData) {
    if (errorCode === ErrorCodes.SEED_NO_RESULTS_ERROR) { // Show empty response screen if SEED returned this error code
        return emptyResponse(correlationId);
    }

    if (errorCode === ErrorCodes.SEED_UNKNOWN_ERROR) { // Notification for SEED server errors
        openNotificationWithIcon('error', CIPZErrorMessages.FETCH_SEARCH_RESULTS_ERROR_MESSAGE, CIPZErrorMessages.FETCH_SEARCH_RESULTS_TITLE);
        PZRContextData.setErrorData(null);
        return null;
    }

    // Everything else will be shown in error page (All HTTP 400 errors from SEED/BFF)
    const renderMessage = PZRSEEDErrorsMap[errorCode] ? PZRSEEDErrorsMap[errorCode] : CIPZErrorMessages.GENERIC_SEED_SEARCH_ERROR;
    PZRContextData.resetSearchResults();
    return renderError({errorCode, message: renderMessage, correlationId});
}

const SearchStatuses = () => {
    const PZRContextData = useContext(PZRContext);

    if (PZRContextData.isSearchLoading) {
        return renderLoader();
    }

    if (PZRContextData.searchError) {
        // Only SEED Error, BFF JOI validation and BFF Server errors during the search can reach here

        const {errorCode, correlationId, httpStatus} = PZRContextData.searchError;
        if (httpStatus === HTTP_INTERNAL_SERVER_ERROR) { // Show Error notification on internal server error without resetting the page
            openNotificationWithIcon('error', CIPZErrorMessages.FETCH_SEARCH_RESULTS_ERROR_MESSAGE, CIPZErrorMessages.UNKNOWN_ERROR_OCCURRED);
            PZRContextData.setErrorData(null);
            return null;
        }
        if (errorCode) {
            return handlingErrorScenarios(errorCode, correlationId, PZRContextData);
        }
        PZRContextData.resetSearchResults();
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

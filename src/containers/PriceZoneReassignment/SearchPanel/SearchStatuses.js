import React, {useContext} from 'react';
import {SyncOutlined} from '@ant-design/icons';
import {ErrorCodes, ErrorMessages, ErrorsMap} from '../../../constants/Errors';
import RequestId from '../../../components/RequestId';
import {PZRContext} from "../PZRContext";

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
                    <i className="icon fi flaticon-error-1"/> Sorry we could not retrieve this item.
                </div>
                <div className="subitle-title">
                    Error {errorCode} - {message}
                </div>
                <RequestId requestId={correlationId}/>
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
                    <i className="icon fi flaticon-arrow"/> Your price zone change request is sent for the review. Select an item attribute group and enter
                    customer/customer group for more changes.
                </div>
            </div>
        </div>
    </div>
);

const SearchStatuses = () => {
    const PZRContextData = useContext(PZRContext);

    if (PZRContextData.isSearchLoading) {
        return renderLoader();
    }

    if (PZRContextData.searchError) {
        const {errorCode, correlationId} = PZRContextData.searchError;
        if (errorCode) {
            const message = ErrorsMap.get(errorCode);
            if (message) {
                return renderError({errorCode, message, correlationId});
            }
        }

        return renderError({errorCode: ErrorCodes.UNEXPECTED_ERROR, message: ErrorMessages.UNEXPECTED_ERROR});
    }

    if (!PZRContextData.searchResults) { // removed ! for debug
        if (PZRContextData.isFirstSubmissionDone) {
            return renderContinueSearch();
        }
        return renderWelcomeMessage();
    }

    return null;
};

export default SearchStatuses;

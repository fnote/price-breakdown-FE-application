import React, {useContext} from 'react';
import {SyncOutlined} from '@ant-design/icons';
import {HistoryInquiryContext} from '../HistoryInquiryContext';
import {ErrorCodes, ErrorMessages, ErrorsMap} from '../../../constants/Errors';
import RequestId from '../../../components/RequestId';

const renderWelcomeMessage = () => (
    <div className="search-statuses">
      <div className="section-wrapper">
        <div className="welcome-message message-block">
          <div className="title">
            <i className="icon fi flaticon-pricing-journey"/> Welcome to the Pricing
            History Inquiry Tool
          </div>
          <div className="subitle-title">
            <i className="icon fi flaticon-arrow"/> To begin fill in the fields
            to your left to see history inquiry details.
          </div>
        </div>
      </div>
    </div>
);

const renderLoader = () => (
    <div className="search-statuses ">
      <div className="section-wrapper">
        <div className="loading message-block">
          <div className="title">
            <SyncOutlined spin className="icon"/> Retrieving History inquiry
            Information
          </div>
        </div>
      </div>
    </div>
);

const renderError = ({ errorCode, message, correlationId }) => (
    <div className="search-statuses ">
      <div className="section-wrapper">
        <div className="error message-block">
          <div className="title">
            <i className="icon fi flaticon-error-1" /> Sorry we could not retrieve this item.
          </div>
          <div className="subitle-title">
            Error {errorCode} - {message}
          </div>
          <RequestId requestId={correlationId} />
        </div>
      </div>
    </div>
);

const SearchStatuses = () => {
  const historyInquiryContext = useContext(HistoryInquiryContext);

  const {response} = historyInquiryContext.historyInquiryData;

  if (historyInquiryContext.isLoading) {
    return renderLoader();
  }

  if (historyInquiryContext.error) {
    const {errorCode, correlationId} = historyInquiryContext.error;
    if (errorCode) {
      const message = ErrorsMap.get(errorCode);
      if (message) {
        return renderError({errorCode, message, correlationId});
      }
    }

    return renderError({errorCode: ErrorCodes.UNEXPECTED_ERROR, message: ErrorMessages.UNEXPECTED_ERROR});
  }

  if (!response) {
    return renderWelcomeMessage();
  }

  return null;
};

export default SearchStatuses;

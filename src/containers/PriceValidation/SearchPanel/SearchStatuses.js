import React, {useContext} from "react";
import { SyncOutlined } from "@ant-design/icons";
import { PriceValidationContext } from '../PriceValidationContext';
import { ErrorCodes, ErrorMessages, ErrorsMap } from "../../../constants/Errors";

const renderWelcomeMessage = () => (
    <div className="search-statuses">
      <div className="section-wrapper">
        <div className="welcome-message message-block">
          <div className="title">
            <i className="icon fi flaticon-accounting" /> Welcome to the Pricing
            Validation Tool
          </div>
          <div className="subitle-title">
            <i className="icon fi flaticon-arrow" /> To begin fill in the fields
            to your left to see pricing details.
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
            <SyncOutlined spin className="icon" /> Retrieving Pricing
            Information
          </div>
        </div>
      </div>
    </div>
);

const renderError = ({ code, message }) => (
    <div className="search-statuses">
      <div className="section-wrapper">
        <div className="error message-block">
          <div className="title">
            <i className="icon fi flaticon-error-1" /> Sorry we could not retrieve this item.
          </div>
          <div className="subitle-title">
            Error {code} - {message}
          </div>
        </div>
      </div>
    </div>
);

const SearchStatuses = () => {
  const priceValidationContext = useContext(PriceValidationContext);

  const { response } = priceValidationContext.priceData;

  if (priceValidationContext.isLoading) {
    return renderLoader();
  }

  if (priceValidationContext.error) {
      const code = priceValidationContext.error.errorCode;

      if (code) {
        const message = ErrorsMap.get(code);
        if (message) {
          return renderError({ code, message });
        }
      }

    return renderError({code: ErrorCodes.UNEXPECTED_ERROR, message: ErrorMessages.UNEXPECTED_ERROR });
  }

  if (!response) {
    return renderWelcomeMessage();
  }

  return null;
};

export default SearchStatuses;

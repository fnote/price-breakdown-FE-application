import React from "react";
import { SyncOutlined } from "@ant-design/icons";

function SearchStatuses() {
  return (
    <div className="search-statuses">
      <div className="section-wrapper">

        {/* Welcome Message status */}
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

        {/* Loading status */}
        <div className="loading message-block hide">
          <div className="title">
            <SyncOutlined spin className="icon" /> Retrieving Pricing
            Information
          </div>
        </div>

        {/* Error status */}
        <div className="error message-block hide">
          <div className="title">
          <i className="icon fi flaticon-error-1" /> Sorry we could not retrieve this item. Please try again.
          </div>
          <div className="subitle-title">
            Error 403 -  Error message comes here
          </div>
        </div>

      </div>
    </div>
  );
}

export default SearchStatuses;

import React from "react";
import { ReactComponent as Browsericon } from "../styles/images/sad_browser.svg";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function ToperrorBar({ msg, close, buttonText, closeButtonClicked }) {
  return (
    <div id="error-bar-base">
      <div id="error-bar-left">
        <Browsericon className="error-bar-icon" />
        <div id="error-bar-msg">{msg}</div>
        {buttonText && (
          <div id="error-bar-moreinfo">
            <button id="error-bar-button">
              {buttonText ? buttonText : "N/A"}
            </button>
          </div>
        )}
      </div>
      {close && (
        <div id="error-bar-right" onClick={ closeButtonClicked }>
          <CloseCircleOutlined style={{ fontSize: "1.6rem", color: "#525252" }} />
        </div>
      )}
    </div>
  );
}

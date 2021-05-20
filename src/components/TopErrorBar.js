import React from "react";
import { ReactComponent as Browsericon } from "../styles/images/sad_browser.svg";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function TopErrorBar({ msg, close, buttonText, onClickClose, classNames }) {
  return (
    <div id="error-bar-base" className={classNames}>
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
        <div id="error-bar-right" onClick={ onClickClose }>
          <CloseCircleOutlined style={{ fontSize: "1.6rem", color: "#525252" }} />
        </div>
      )}
    </div>
  );
}

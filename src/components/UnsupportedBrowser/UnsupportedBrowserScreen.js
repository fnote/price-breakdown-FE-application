import React from "react";
import { List } from "antd";
import {
  SUPPORTED_WEB_BROWSERS,
  UNSUPPORTED_WEB_BROWSER,
  UNSUPPORTED_WEB_BROWSER_SPLIT_SEPARATOR
} from "../../constants/Constants";

import {unsupportedBrowserState} from "../../utils/CommonUtils"

import { ReactComponent as BrowserIcon } from "../../styles/images/sad_browser.svg";
import chrome from "../../styles/images/chrome.svg";
import firefox from "../../styles/images/firefox.svg";
import edge from "../../styles/images/edge.svg";
import safari from "../../styles/images/safari.svg";

function _getSupportedBrowserList(browsers) {
  const supportedBrowserList = [];
  Object.entries(browsers).map(([key, value], i) => {
    return supportedBrowserList.push(key + UNSUPPORTED_WEB_BROWSER_SPLIT_SEPARATOR + value);
  });

  return supportedBrowserList;
}

/**
 * This screen will be shown when the user has an unsupported browser.
 *
 * @param supportedBrowserList
 * @returns {JSX.Element}
 * @private
 */
function _renderBrowserList(supportedBrowserList) {
  return (
    <>
      <List
        grid={{ gutter: 20, column: supportedBrowserList.length }}
        dataSource={supportedBrowserList}
        renderItem={(item) => (
          <List.Item id="browsersupport-list-item">
            {item.split(UNSUPPORTED_WEB_BROWSER_SPLIT_SEPARATOR)[0] === "Chrome" && (
              <img className="browsersupport-icon" src={chrome} alt="chrome" />
            )}
            {item.split(UNSUPPORTED_WEB_BROWSER_SPLIT_SEPARATOR)[0] === "Firefox" && (
              <img className="browsersupport-icon" src={firefox} alt="firefox" />
            )}
            {item.split(UNSUPPORTED_WEB_BROWSER_SPLIT_SEPARATOR)[0] === "Edge" && (
              <img className="browsersupport-icon" src={edge} alt="edge" />
            )}
            {item.split(UNSUPPORTED_WEB_BROWSER_SPLIT_SEPARATOR)[0] === "Safari" && (
              <img className="browsersupport-icon" src={safari} alt="safari" />
            )}
            <div id="browsersupport-browsername">{item.split(UNSUPPORTED_WEB_BROWSER_SPLIT_SEPARATOR)[0]}</div>
            <div id="browersupport-browserversion">
              Version {item.split(UNSUPPORTED_WEB_BROWSER_SPLIT_SEPARATOR)[1]} +
            </div>
          </List.Item>
        )}
      />
    </>
  );
}

function continueButtonOnClickHandler() {
    unsupportedBrowserState.setUnsupportedBrowserScreenContinue();
    window.location.assign('/');
}

function UnsupportedBrowserScreen(props) {

  const supportedBrowsers = _renderBrowserList(
    _getSupportedBrowserList(SUPPORTED_WEB_BROWSERS)
  );

  return (
    <div className="browsersupport-wrapper">
      <div id="browsersupport-logo"></div>

      <div className="browser-support-widget-wrapper">
        <div className="browsersupport-icon-wrapper">
          <BrowserIcon className="browsersupport-icon" />
        </div>

        <div className="browsersupport-header-wrapper">
          <span id="browsersupport-header-msg">{UNSUPPORTED_WEB_BROWSER.headerMessageLine1}</span>
          <span id="browsersupport-sub-msg">{UNSUPPORTED_WEB_BROWSER.headerMessageLine2}</span>
        </div>

        <div className="browsersupport-info">
          {UNSUPPORTED_WEB_BROWSER.infoMessage}
        </div>

        <div id="browsersupport-list">{supportedBrowsers}</div>
        <div id="browersupport-options">
          <div id="browsersupport-separator" />
          <button id="browsersupport-dismiss" onClick={continueButtonOnClickHandler}>continue anyway</button>
        </div>
      </div>
    </div>
  );
}

export default UnsupportedBrowserScreen;

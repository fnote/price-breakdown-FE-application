import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { ReactComponent as Browsericon } from '../styles/images/sad_browser.svg';

export default function TopErrorBar({ msg, close, buttonText, onClickClose, classNames }) {
  return (
    <div id="error-bar-base" className={classNames}>
      <div id="error-bar-left">
        <Browsericon className="error-bar-icon" />
        <div id="error-bar-msg">{msg}</div>
        {buttonText && (
          <div id="error-bar-moreinfo">
            <button id="error-bar-button">
              {buttonText}
            </button>
          </div>
        )}
      </div>
      {close && (
        <div id="error-bar-right" onClick={ onClickClose }>
          <CloseCircleOutlined id="close-circle" />
        </div>
      )}
    </div>
  );
}

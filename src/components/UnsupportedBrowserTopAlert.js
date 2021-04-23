import React, {useState} from 'react';
import {
    UNSUPPORTED_WEB_BROWSER,
    UNSUPPORTED_WEB_BROWSER_ALERT_CONTINUE_LOCAL_STORAGE, UNSUPPORTED_WEB_BROWSER_SCREEN_CONTINUE_LOCAL_STORAGE
} from '../constants/Constants'
import ToperrorBar from "./ToperrorBar";

/**
 * Detects the alert closed local state and shows the if necessary
 * @returns {JSX.Element}
 * @constructor
 */
function UnsupportedBrowserTopAlert(){
    let [unsupportedBrowserAlertContinue, setUnsupportedBrowserAlertContinue] = useState(localStorage.getItem(UNSUPPORTED_WEB_BROWSER_ALERT_CONTINUE_LOCAL_STORAGE));


    const closeButtonClicked = () => {
        localStorage.setItem(UNSUPPORTED_WEB_BROWSER_ALERT_CONTINUE_LOCAL_STORAGE, true);
        setUnsupportedBrowserAlertContinue(true);
    }

    return (
        <React.Fragment>
            { (!unsupportedBrowserAlertContinue && localStorage.getItem(UNSUPPORTED_WEB_BROWSER_SCREEN_CONTINUE_LOCAL_STORAGE)) && (
                <ToperrorBar msg={UNSUPPORTED_WEB_BROWSER.headerMessage} close closeButtonClicked={closeButtonClicked}/>
            )}
        </React.Fragment>
    );
}

export default UnsupportedBrowserTopAlert;
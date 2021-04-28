import React, {useState} from 'react';
import {
    UNSUPPORTED_WEB_BROWSER,
    UNSUPPORTED_WEB_BROWSER_ALERT_CONTINUE_LOCAL_STORAGE,
    UNSUPPORTED_WEB_BROWSER_SCREEN_CONTINUE_LOCAL_STORAGE
} from '../../constants/Constants'
import ToperrorBar from "../ToperrorBar";

/**
 * Detects the alert closed session state and shows the if necessary.
 * This alert may be shown on any screen except for the UnsupportedBrowserScreen.
 *
 * @returns {JSX.Element}
 * @constructor
 */
function UnsupportedBrowserTopAlert(){
    let [unsupportedBrowserAlertContinue, setUnsupportedBrowserAlertContinue] = useState(sessionStorage.getItem(UNSUPPORTED_WEB_BROWSER_ALERT_CONTINUE_LOCAL_STORAGE));


    const onClickCloseHandler = () => {
        sessionStorage.setItem(UNSUPPORTED_WEB_BROWSER_ALERT_CONTINUE_LOCAL_STORAGE, true);
        setUnsupportedBrowserAlertContinue(true);
    }

    return (
        <React.Fragment>
            { (!unsupportedBrowserAlertContinue && sessionStorage.getItem(UNSUPPORTED_WEB_BROWSER_SCREEN_CONTINUE_LOCAL_STORAGE)) && (
                <ToperrorBar msg={UNSUPPORTED_WEB_BROWSER.headerMessageLine2} close onClickClose={onClickCloseHandler}/>
            )}
        </React.Fragment>
    );
}

export default UnsupportedBrowserTopAlert;
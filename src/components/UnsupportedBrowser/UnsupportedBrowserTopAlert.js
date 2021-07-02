import React, {useState} from 'react';
import {
    UNSUPPORTED_WEB_BROWSER
} from '../../constants/Constants';
import {unsupportedBrowserState} from '../../utils/CommonUtils';
import TopErrorBar from '../TopErrorBar';

/**
 * Detects the alert closed session state and shows the if necessary.
 * This alert may be shown on any screen except for the UnsupportedBrowserScreen.
 *
 * @returns {JSX.Element}
 * @constructor
 */
function UnsupportedBrowserTopAlert() {
    const [unsupportedBrowserAlertContinue, setUnsupportedBrowserAlertContinue] = useState(unsupportedBrowserState.isSetUnsupportedBrowserAlertContinue());

    const onClickCloseHandler = () => {
        unsupportedBrowserState.setUnsupportedBrowserAlertContinue();
        setUnsupportedBrowserAlertContinue(true);
    };

    return (
        <React.Fragment>
            { (!unsupportedBrowserAlertContinue && unsupportedBrowserState.isSetUnsupportedBrowserScreenContinue()) && (
                <TopErrorBar msg={UNSUPPORTED_WEB_BROWSER.headerMessageLine2} close onClickClose={onClickCloseHandler}/>
            )}
        </React.Fragment>
    );
}

export default UnsupportedBrowserTopAlert;

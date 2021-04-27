import React, {useEffect, useState} from 'react';
import {checkOnlineStatus} from '../../utils/CommonUtils'
import {
    ONLINE_STATUS_CHECK_INTERVAL,
    ONLINE_STATUS_OFFLINE_MSG
} from '../../constants/Constants'
import ToperrorBar from "../ToperrorBar";

/**
 * Detects the online state and shows the appropriate messages.
 * @returns {JSX.Element}
 * @constructor
 */
function NetworkConnectivityAlert(){
    const [isDisconnected, setIsDisconnected] = useState(!checkOnlineStatus());

    const updateOnlineStatus = async () => {
        const result = await checkOnlineStatus();
        setIsDisconnected(!result);
    };

    useEffect(() =>{
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        const interval = setInterval(
            updateOnlineStatus,
            ONLINE_STATUS_CHECK_INTERVAL
        );

        return function cleanup(){
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
            clearInterval(interval);
        }
    });

    const closeButtonClicked = () => {
        setIsDisconnected(false);
    }

    return (
        <React.Fragment>
            { isDisconnected && (
                <ToperrorBar msg={ONLINE_STATUS_OFFLINE_MSG} close closeButtonClicked={closeButtonClicked}/>
            )}
        </React.Fragment>
    );
}

export default NetworkConnectivityAlert;
import React, {useEffect, useState} from 'react';
import {checkOnlineStatus} from '../../utils/CommonUtils'
import {
    ONLINE_STATUS_CHECK_INTERVAL,
    ONLINE_STATUS_OFFLINE_MSG
} from '../../constants/Constants'
import TopErrorBar from "../TopErrorBar";

/**
 * Detects the online state and shows the alert upon connection issues.
 * Component listens to the online state changes as well as do checks on
 * predefined regular time intervals (ONLINE_STATUS_CHECK_INTERVAL)
 *
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

    const onClickCloseHandler = () => {
        setIsDisconnected(false);
    }

    return (
        <React.Fragment>
            { isDisconnected && (
                <TopErrorBar msg={ONLINE_STATUS_OFFLINE_MSG} close={false} onClickClose={onClickCloseHandler}/>
            )}
        </React.Fragment>
    );
}

export default NetworkConnectivityAlert;

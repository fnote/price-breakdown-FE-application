import React, {useEffect} from 'react';
import {Alert} from "antd";
import {checkOnlineStatus} from '../utils/CommonUtils'
import {ONLINE_STATUS_CHECK_INTERVAL, ONLINE_STATUS_OFFLINE_MSG} from '../constants/Constants'

/**
 * Detects the online state and shows the appropriate messages.
 * @returns {JSX.Element}
 * @constructor
 */
function NetworkDetector(){
    const [isDisconnected, setIsDisconnected] = React.useState(!checkOnlineStatus());

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

    return (
        <div>
            { isDisconnected && (<Alert
                style={{width: "100%"}}
                message={ONLINE_STATUS_OFFLINE_MSG}
                type="error"
                closable
            />)}
        </div>
    );
}

export default NetworkDetector;
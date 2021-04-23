import React from 'react'
import {ReactComponent as Browsericon} from '../styles/images/sad_browser.svg'
import { CloseCircleOutlined } from '@ant-design/icons';

export default function ToperrorBar({msg , close , buttonText}) {
    return (
        <div id="error-bar-base">
            <div id="error-bar-left">
                <Browsericon className="error-bar-icon"/>
                <div id="error-bar-msg">
               {msg}
                </div>
                {buttonText &&
                <div id="error-bar-moreinfo">
                    
                    <button id="error-bar-button">
                       {buttonText ? buttonText : 'N/A'}
                    </button>
                </div>
                }
            </div>
            { close && 
            <div id="error-bar-right">
            <CloseCircleOutlined style={{ fontSize: '20px', color: '#525252' }} />
           </div>
}
        </div>
    )
}

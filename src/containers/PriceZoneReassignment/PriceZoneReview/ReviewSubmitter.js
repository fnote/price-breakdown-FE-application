import React from 'react';
import {Tooltip} from 'antd';
import {truncate} from '../helper/PZRHelper';

export default function ReviewSubmitter({submission: {id, givenName, surname, createdTime, submissionNote}}) {
    return (
        <div className="pz-review-wrapper">
            <div className="pz-review-name">
                <Tooltip title={`${givenName} ${surname}`} color="#fff" overlayClassName="pz-tooltip"
                         overlayStyle={{color: '#000'}}>
                    <div id="review-user-name" className="pz-review-name-username">
                        {truncate(`${givenName} ${surname}`, 32)}
                    </div>
                </Tooltip>
                <div id="review-name-id" className="pz-review-name-id">
                    ({id})
                </div>
            </div>
            <div id="review-date" className="pz-review-date">
                {createdTime}
            </div>
            <div className="pz-review-note">
                <Tooltip id="tooltip" title={submissionNote} color="#fff" overlayClassName="pz-tooltip"
                         overlayStyle={{color: '#000'}}>
                    <i className="icon fi flaticon-note pz-review-note-icon "/>
                </Tooltip>
            </div>

        </div>
    );
}

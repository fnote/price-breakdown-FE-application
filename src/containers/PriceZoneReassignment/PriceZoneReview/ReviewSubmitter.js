import React from 'react';
import {Tooltip} from 'antd';

export default function ReviewSubmitter({submission: {id, givenName, surname, createdTime, submissionNote}}) {
    return (
        <div className="pz-review-wrapper">
            <div className="pz-review-name">
                <div className="pz-review-name-username">
                    {givenName} {surname}
                </div>
                <div className="pz-review-name-id">
                    ({id})
                </div>
            </div>
            <div className="pz-review-date">
                {createdTime}
            </div>
            <div className="pz-review-note">
                <Tooltip title={submissionNote} color="#fff" overlayClassName="pz-tooltip"
                         overlayStyle={{color: '#000'}}>
                    <i className="icon fi flaticon-note pz-review-note-icon "/>
                </Tooltip>
            </div>

        </div>
    );
}

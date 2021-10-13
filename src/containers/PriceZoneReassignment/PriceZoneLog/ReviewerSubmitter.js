import { Tooltip } from 'antd'
import React from 'react'

export default function ReviewerSubmitter({submission: {id, givenName, surname, createdTime, submissionNote}}) {
    return (
        <div className="pz-log-review-base">
           <div className="pz-log-review-details-base">
            <div className="pz-log-review-details-name">
                <div className="pz-log-review-name">
                    {givenName} {surname}
                </div>
                <div className="pz-log-review-subname">
                   (&nbsp;{id}&nbsp;)
                </div>
            </div>
            <div className="pz-log-review-details-date">
                {createdTime}
            </div>
           </div>

           <div className="pz-log-review-info">
           <Tooltip id="tooltip" title={submissionNote} color="#fff" overlayClassName="pz-tooltip"
                         overlayStyle={{color: '#000'}}>
                    <i className="icon fi flaticon-note pz-log-review-note-icon "/>
                </Tooltip>
           </div>
        </div>
    )
}

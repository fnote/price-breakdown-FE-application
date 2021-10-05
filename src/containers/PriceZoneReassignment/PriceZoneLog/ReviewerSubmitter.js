import { Tooltip } from 'antd'
import React from 'react'

export default function ReviewerSubmitter({subn , un}) {
    return (
        <div className="pz-log-review-base">
           <div className="pz-log-review-details-base">
            <div className="pz-log-review-details-name">
                <div className="pz-log-review-name">
                    {un}
                </div>
                <div className="pz-log-review-subname">
                   (&nbsp;{subn}&nbsp;)
                </div>
            </div>
            <div className="pz-log-review-details-date">
            04 Aug 2020
            </div>
           </div>

           <div className="pz-log-review-info">
           <Tooltip id="tooltip" title="note goes here" color="#fff" overlayClassName="pz-tooltip"
                         overlayStyle={{color: '#000'}}>
                    <i className="icon fi flaticon-note pz-log-review-note-icon "/>
                </Tooltip>
           </div>
        </div>
    )
}
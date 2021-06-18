import React from 'react'
import {FileTextFilled} from '@ant-design/icons'
export default function ReviewSubmitter() {
    return (
        <div className="pz-review-wrapper">
          
           <div className="pz-review-name">
 
           <div className="pz-review-name-username">
           Michael Lu
           </div>
           <div className="pz-review-name-id">
           (milu8609)
           </div>
           </div>
           <div className="pz-review-date">
           04 Aug 2020
           </div>
           <div className="pz-review-note">
           <FileTextFilled />
           </div>
        </div>
    )
}

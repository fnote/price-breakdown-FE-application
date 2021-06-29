import React from 'react'
import {FileTextFilled} from '@ant-design/icons'
import { Tooltip } from 'antd'
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
               <Tooltip title="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt, perferendis! Dignissimos corporis autem repellendus repudiandae officia in laboriosam nostrum corrupti." color="#fff" overlayClassName="pz-tooltip" overlayStyle={{color:'#000'}}>
           <FileTextFilled />
           </Tooltip>
           </div>
           

        </div>
    )
}


import React from 'react';
import { Tooltip } from 'antd';

export default function ReviewSubmitter({ submission: { id, givenName, surname, createdTime }}) {
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
               <Tooltip title="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt, perferendis! Dignissimos corporis autem repellendus repudiandae officia in laboriosam nostrum corrupti." color="#fff" overlayClassName="pz-tooltip" overlayStyle={{color: '#000'}}>
               <i className="icon fi flaticon-note"/>
           </Tooltip>
           </div>

        </div>
    );
}

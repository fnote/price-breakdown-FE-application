import React from "react";

export default function PriceZoneStatus({status}) {

const Approved = ()=>{
    return(<div id="pz-log-approved" className="pz-log-status-tag pz-log-approved">APPROVED</div>)
}
const Rejected = ()=>{
    return(<div id="pz-log-rejected" className="pz-log-status-tag pz-log-rejected">REJECTED</div>)
}
const Discarded = ()=>{
    return(<div id="pz-log-discarded" className="pz-log-status-tag pz-log-discarded">DISCARDED</div>)
}
  return (
      // ADDED FOR TESTING PURPOSES
    <>
      {
        {
          'APPROVED': <Approved />,
          'REJECTED': <Rejected />,
          'DISCARDED': <Discarded />,
        }[status]
      }
    </>
  );
}

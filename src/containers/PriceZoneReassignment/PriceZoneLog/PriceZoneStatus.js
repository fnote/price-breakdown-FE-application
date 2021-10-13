import React from "react";

export default function PriceZoneStatus({reviewStatus}) {

const Approved = ()=>{
    return(<div className="pz-log-status-tag pz-log-approved">APPROVED</div>)
}
const Rejected = ()=>{
    return(<div className="pz-log-status-tag pz-log-rejected">REJECTED</div>)
}
const Discarded = ()=>{
    return(<div className="pz-log-status-tag pz-log-discarded">DISCARDED</div>)
}
  return (
      // ADDED FOR TESTING PURPOSES
    <>
      {
        {
          'Approved': <Approved />,
          'Rejected': <Rejected />,
          'Discarded': <Discarded />,
        }[reviewStatus]
      }
    </>
  );
}

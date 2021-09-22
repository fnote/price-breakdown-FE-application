import React from "react";

export default function PzPopover() {
  const custgroup = [
    31223, 32112, 34223, 34556, 45654, 53452, 73217, 23423, 21231, 45345,
  ];

  return (
    <div className="pz-log-pop-over">
      <div className="pz-log-pop-header">
        <div className="log-pop-header-left">
          <div className="log-pop-header-top">CUSTOMER GROUP</div>
          <div className="log-pop-header-bottom">31223</div>
        </div>
        <div className="log-pop-header-right">10 customers</div>
      </div>

      <div className="pz-log-pop-body">
        <ul className="pz-log-pop-ul">
          {custgroup.map((cg, i) => {
            return (
              <li key={i} className="pz-log-pop-li">
                {cg}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

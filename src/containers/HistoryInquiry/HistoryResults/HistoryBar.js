import React from "react";

export default function HistoryBar() {
  return (
    <div className="history-bar-wrapper">
    
      <div className="history-column">
      
        <div className="history-column-wrapper">
          
          <div className="history-item history-item-title">ITEM</div>
          <div className="history-item history-item-number">0002353</div>
          <div className="history-item history-item-name">
            Cookie Choc Filled Trpl IW
          </div>
          <div className="history-item history-row-3">
            <div className="history-row-item">
              <div className="history-row-title">brand</div>
              <div className="history-row-value">RICH'S</div>
            </div>
            <div className="history-row-item">
              <div className="history-row-title">pack</div>
              <div className="history-row-value">120</div>
            </div>
            <div className="history-row-item">
              <div className="history-row-title">size</div>
              <div className="history-row-value">1.7 Oz</div>
            </div>
          </div>

          <div className="history-item history-row-3">
            <div className="history-row-item">
              <div className="history-row-title">STOCK</div>
              <div className="history-row-value">S</div>
            </div>
            <div className="history-row-item">
              <div className="history-row-title">CATCH WEIGHT</div>
              <div className="history-row-value">N</div>
            </div>
            <div className="history-row-item">
              <div className="history-row-title">AVG WEIGHT</div>
              <div className="history-row-value">14.78</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="history-column">
      <div className="history-column-wrapper">
          <div className="history-item history-item-title">OPCO</div>
          <div className="history-item history-item-number-row2">067 - SYSCO Food Services of Houston</div>
        
          <div className="history-item history-row-2">
            <div className="history-row-item">
              <div className="history-row-title">customer</div>
              <div className="history-row-value-num">055437</div>
              <div className="history-row-value-customer">Mikes Seafood and Grill</div>
            </div>
            <div className="history-row-item">
              <div className="history-row-title">type</div>
              <div className="history-row-value-num">trs</div>
            </div>
          </div>

        </div>
      </div>
      <div className="history-column">
      <div className="history-column-wrapper-date">
     <div className="history-date-title">Date</div>
     <div className="history-date-wrapper">
         <div className="history-date-from-to">06 July 2020</div>
         <div className="history-date-from-to">06 Aug 2020</div>
     </div>
        </div>
      </div>
    </div>
  );
}

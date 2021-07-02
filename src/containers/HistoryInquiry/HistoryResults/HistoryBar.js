import React from "react";
import { NOT_PROVIDED_LABEL } from '../../../constants/Constants';

export default function HistoryBar(props) {
    const {historyInquiryData: {historyRequest, item, site}} = props;
    return (
        <div className="history-bar-wrapper">

            <div className="history-column">

                <div className="history-column-wrapper">

                    <div className="history-item history-item-title">ITEM</div>
                    <div className="history-item history-item-number">{item.id}</div>
                    <div className="history-item history-item-name">
                        {item.name}
                    </div>
          <div className="history-item history-row-3">
            <div className="history-row-item">
                <div className="history-row-title">brand</div>
                <div className="history-row-value">{item.brand}</div>
            </div>
            <div className="history-row-item">
                <div className="history-row-title">pack</div>
                <div className="history-row-value">{item.pack}</div>
            </div>
            <div className="history-row-item">
                <div className="history-row-title">size</div>
                <div className="history-row-value">{item.size}</div>
            </div>
          </div>

          <div className="history-item history-row-3">
            <div className="history-row-item">
                <div className="history-row-title">STOCK</div>
                <div className="history-row-value">{item.stockIndicator}</div>
            </div>
            <div className="history-row-item">
                <div className="history-row-title">CATCH WEIGHT</div>
                <div className="history-row-value">{item.catchWeightIndicator}</div>
            </div>
            <div className="history-row-item">
                <div className="history-row-title">AVG WEIGHT</div>
                <div className="history-row-value">{item.averageWeight}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="history-column">
      <div className="history-column-wrapper">
          <div className="history-item history-item-title">OPCO</div>
          <div className="history-item history-item-number-row2">{site.businessUnitNumber}</div>
        
          <div className="history-item history-row-2">
              <div className="history-row-item">
                  <div className="history-row-title">customer</div>
                  <div className="history-row-value-num">{site.customerAccount}</div>
                  <div className="history-row-value-customer">{site.customerName}</div>
              </div>
              <div className="history-row-item">
                  <div className="history-row-title">type</div>
                  <div className="history-row-value-num">{site.customerType}</div>
              </div>
          </div>

        </div>
      </div>
      <div className="history-column">
          <div className="history-column-wrapper">
              <div className="history-item history-row-2">
                  <div className="history-column-wrapper-date">
                      <div className="history-date-title">Date</div>
                      <div className="history-date-wrapper">
                      <div className="history-date-from-to">{historyRequest.fromDate ? historyRequest.fromDate : NOT_PROVIDED_LABEL }</div>
                      <div className="history-date-from-to">{historyRequest.toDate ? historyRequest.toDate : NOT_PROVIDED_LABEL }</div>
                      </div>
                  </div>
                  <div className="history-row-item">
                      <div className="history-row-title">Split Flag</div>
                      <div className="history-row-value-num">{historyRequest.splitStatus}</div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

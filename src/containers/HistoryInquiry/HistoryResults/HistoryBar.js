import React from 'react';
import {Tooltip} from 'antd';
import {NOT_PROVIDED_LABEL} from '../../../constants/Constants';
import {formatBusinessUnit} from '../../../utils/CommonUtils';

export default function HistoryBar(props) {
    const {historyInquiryData: {historyRequest, item, site}, userData: {businessUnitMap}} = props;
    const businessUnit = formatBusinessUnit(site.businessUnitNumber, businessUnitMap);

    // truncating
     const truncate = (str, n) => {
        if (str) {
            return (str.length > n) ? `${str.substr(0, n - 3)}...` : str;
        }
        return '';
    };
    return (
        <div className="history-bar-wrapper">

            <div className="history-column">

                <div className="history-column-wrapper">

                    <div className="history-item history-item-title">ITEM</div>
                    <div className="history-item history-item-number">{item.id}</div>
                    <Tooltip title={item.name} color="blue">
                        <div className="history-item history-item-name">
                            {truncate(item.name, 38)}
                        </div>
                    </Tooltip>
          <div className="history-item history-row-3">
            <div className="history-row-item">
                <div className="history-row-title">brand</div>
                <Tooltip title={item.brand} color="blue">
                    <div className="history-row-value">
                        {truncate(item.brand, 15)}</div>
                </Tooltip>
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
          <div className="history-item history-item-title">Site</div>
          <Tooltip title={businessUnit} color="blue">
            <div className="history-item history-item-number-row2">{businessUnit}</div>
          </Tooltip>
          <div className="history-item history-row-2">
              <div className="history-row-item history-row2-customer">
                  <div className="history-row-title">customer</div>
                  <div className="history-row-value-num">{site.customerAccount}</div>
                  <Tooltip title={site.customerName} color="blue">
                      <div className="history-row-value-customer">
                          {truncate(site.customerName, 38)}
                      </div>
                  </Tooltip>
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
                      <div className="history-row-title">Split</div>
                      <div className="history-row-value-num">{historyRequest.splitStatus}</div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

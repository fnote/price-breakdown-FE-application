import React from 'react';
import {Table, Tooltip} from 'antd';
import moment from 'moment';
import {extractTransactions} from '../../../utils/PricingUtils';

const columns = [
  {
    // eslint-disable-next-line react/display-name
    title: () => <Tooltip title="OBLIGATION NUMBER">OBLIGATION #</Tooltip>,
    dataIndex: 'obligationId',
    width: '10%',
  },
  {
    // eslint-disable-next-line react/display-name
    title: () => <Tooltip title="LINE NUMBER">LINE #</Tooltip>,
    dataIndex: 'lineNumber',
    width: '6%',
    className: 'history-right-text'

  },
  {
    // eslint-disable-next-line react/display-name
    title: () => <Tooltip title="TRANSACTION DATE">TRANS. DATE</Tooltip>,
    dataIndex: 'transactionDate',
    defaultSortOrder: 'descend',
    width: '9%',
    sorter: (a, b) => moment(a.transactionDate).unix() - moment(b.transactionDate).unix(),
  },
  {
    // eslint-disable-next-line react/display-name
    title: () => <Tooltip title="SHIPPED QUANTITY">SHIPPED QTY</Tooltip>,
    dataIndex: 'shippedQuantity',
    width: '10%',
    className: 'history-right-text'
  },
  {
    // eslint-disable-next-line react/display-name
    title: () => <Tooltip title="TOTAL CATCH WEIGHT">CATCH WEIGHT</Tooltip>,
    dataIndex: 'totalCatchWeight',
    width: '10%',
    className: 'history-right-text',
  },
  {
    title: 'UNIT PRICE',
    dataIndex: 'unitPrice',
    className: 'history-right-text',
    width: '10%',
  },
  {
    title: 'NET PRICE',
    dataIndex: 'netPrice',
    className: 'history-right-text',
    width: '10%',
  },
  {
    title: 'EXTENDED PRICE',
    dataIndex: 'extendedPrice',
    width: '10%',
    className: 'history-right-text'
  },
  {
    // eslint-disable-next-line react/display-name
    title: () => <Tooltip title="PRICE SOURCE">SOURCE</Tooltip>,
    dataIndex: 'priceSourceType',
    width: '7%',
  },
  {
    title: 'CREATE DATE / TIME',
    dataIndex: ['createDateTime'],
    width: '14%',
  },
];

export default function HistoryTable({historyInquiryData: {product: {transactionHistory}}}) {
  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  extractTransactions(transactionHistory);

  return (
      <div className="history-table">
        <div className="history-table-header">
          <div className="history-table-header-wrapper">
            <i className="icon fi flaticon-pricing-journey history-title-icon"></i>
            <div className="history-table-title">
              Recent Transactions
            </div>
          </div>
        </div>
        <Table
          className="history-table-option-disable"
            pagination={{pageSize: 8}}
            rowKey={transactionHistory.obligationId + transactionHistory.lineNumber}
            columns={columns} dataSource={transactionHistory} onChange={onChange}/>
      </div>
  );
}

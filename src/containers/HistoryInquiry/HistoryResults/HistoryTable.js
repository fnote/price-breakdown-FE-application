import React from 'react';
import {Table, Tooltip} from 'antd';
import moment from 'moment';
import {extractTransactions} from '../../../utils/PricingUtils';

const historyClassName = 'history-right-text';
const columns = [
  {
    title: <Tooltip title="OBLIGATION NUMBER">OBLIGATION #</Tooltip>,
    dataIndex: 'obligationId',
    width: '10%',
  },
  {
    title: <Tooltip title="LINE NUMBER">LINE #</Tooltip>,
    dataIndex: 'lineNumber',
    width: '6%',
    className: historyClassName

  },
  {
    title: <Tooltip title="TRANSACTION DATE">TRANS. DATE</Tooltip>,
    dataIndex: 'transactionDate',
    defaultSortOrder: 'descend',
    width: '9%',
    sorter: (a, b) => moment(a.transactionDate).unix() - moment(b.transactionDate).unix(),
  },
  {

    title: <Tooltip title="SHIPPED QUANTITY">SHIPPED QTY</Tooltip>,
    dataIndex: 'shippedQuantity',
    width: '10%',
    className: historyClassName
  },
  {

    title: <Tooltip title="TOTAL CATCH WEIGHT">CATCH WEIGHT</Tooltip>,
    dataIndex: 'totalCatchWeight',
    width: '10%',
    className: historyClassName
  },
  {
    title: 'UNIT PRICE',
    dataIndex: 'unitPrice',
    className: historyClassName,
    width: '10%',
  },
  {
    title: 'NET PRICE',
    dataIndex: 'netPrice',
    className: historyClassName,
    width: '10%',
  },
  {
    title: 'EXTENDED PRICE',
    dataIndex: 'extendedPrice',
    width: '10%',
    className: historyClassName
  },
  {
    title: <Tooltip title="PRICE SOURCE">SOURCE</Tooltip>,
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
  extractTransactions(transactionHistory);

  return (
      <div className="history-table">
        <div className="history-table-header">
          <div className="history-table-header-wrapper">
            <i className="icon fi flaticon-pricing-journey history-title-icon"></i>
            <div className="history-table-title">
              Transaction History
            </div>
          </div>
        </div>
        <Table
            className="history-table-option-disable"
            pagination={{pageSize: 8}}
            rowKey={transactionHistory.obligationId + transactionHistory.lineNumber}
            columns={columns} dataSource={transactionHistory}/>
      </div>
  );
}

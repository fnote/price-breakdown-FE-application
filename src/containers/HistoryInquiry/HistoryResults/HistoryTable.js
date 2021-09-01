import React from 'react';
import {Table} from 'antd';
import {extractTransactions} from '../../../utils/PricingUtils';

const columns = [
  {
    title: 'OBLIGATION NUM',
    dataIndex: 'obligationId',
  },
  {
    title: 'LINE NUM',
    dataIndex: 'lineNumber',

  },
  {
    title: 'TRANSACTION DATE',
    dataIndex: 'transactionDate',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.transactionDate - b.transactionDate,
  },
  {
    title: 'SHIPPED QTY',
    dataIndex: 'shippedQuantity',
  },
  {
    title: 'TOTAL CATCH WEIGHT',
    dataIndex: 'totalCatchWeight',
  },
  {
    title: 'UNIT PRICE',
    dataIndex: 'unitPrice',
  },
  {
    title: 'NET PRICE',
    dataIndex: 'netPrice',
    style: {color: 'red !important'}
  },
  {
    title: 'EXTENDED PRICE',
    dataIndex: 'extendedPrice',
  },
  {
    title: 'PRICE SOURCE',
    dataIndex: 'priceSourceType',
  },
  {
    title: 'CREATE DATE / TIME',
    dataIndex: ['createDateTime'],
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
            <i class="icon fi flaticon-pricing-journey history-title-icon"></i>
            <div className="history-table-title">
              Recent Transactions
            </div>
          </div>
        </div>
        <Table
            pagination={{pageSize: 10}}
            scroll={{x: 'auto', y: '30vh'}}
               rowKey={transactionHistory.obligationId + transactionHistory.lineNumber}
               columns={columns} dataSource={transactionHistory} onChange={onChange}/>
      </div>
  );
}

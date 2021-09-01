import React from 'react';
import {Table} from 'antd';
import {extractTransactions} from '../../../utils/PricingUtils';

const columns = [
  {
    title: 'OBLIGATION NUM',
    dataIndex: 'obligationId',
  },
  {
   
    title: "LINE #",
    dataIndex: "lineNumber",
    width:80,
    className:'history-right-text'

  },
  {
    title: "TRANS.DATE",
    dataIndex: "transactionDate",
    defaultSortOrder: "descend",
    width:150,
    sorter: (a, b) => a.transactionDate - b.transactionDate,
  },
  {
    title: "SHIPPED QTY",
    dataIndex: "shippedQuantity",
    width:130,
    className:'history-right-text'
  },
  {
    title: 'TOTAL CATCH WEIGHT',
    dataIndex: 'totalCatchWeight',
    width:200,
    className:'history-right-text'
  },
  {
    title: 'UNIT PRICE',
    dataIndex: 'unitPrice',
    width:150,
    className:'history-right-text'
  },
  {
    title: 'NET PRICE',
    dataIndex: 'netPrice',
    className:'history-right-text'
  
  },
  {
    title: 'EXTENDED PRICE',
    dataIndex: 'extendedPrice',
    width:150,
    className:'history-right-text'
  },
  {
    title: 'PRICE SOURCE',
    dataIndex: 'priceSourceType',
    width:150,
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

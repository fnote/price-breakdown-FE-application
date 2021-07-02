import React from "react";
import {Table} from "antd";
import {extractTransactions} from "../../../utils/PricingUtils";


const columns = [
  {
    title: "Obligation Num",
    dataIndex: "obligationId",
  },
  {
    title: "Line Num",
    dataIndex: "lineNumber",

  },
  {
    title: "Transacted Date",
    dataIndex: "transactionDate",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.Transacted_Date - b.Transacted_Date,
  },
  {
    title: "Shipped qty",
    dataIndex: "shippedQuantity",
  },
  {
    title: "Total Catch Weight",
    dataIndex: "totalCatchWeight",
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
  },
  {
    title: "Net Price",
    dataIndex: "netPrice",
    style: {color: 'red !important'}
  },
  {
    title: "Extended Price",
    dataIndex: "extendedPrice",
  },
  {
    title: "Price source",
    dataIndex: "priceSourceType",
  },
  {
    title: "Create Date / Time",
    dataIndex: ['createDateTime'],
  },
];

export default function HistoryTable({historyInquiryData: {product: {transactionHistory}}}) {
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  extractTransactions(transactionHistory);

  return (
      <div className="history-table">
        <div className="history-table-header">
          <div className="history-table-header-wrapper">
            <div className="history-table-title">
              Transaction History
            </div>
          </div>
        </div>
        <Table pagination={{pageSize: 10}}
               rowKey={transactionHistory.obligationId + transactionHistory.lineNumber}
               columns={columns} dataSource={transactionHistory} onChange={onChange}/>
      </div>
  );
}

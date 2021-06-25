import React from 'react'
import { Table } from "antd";

const columns = [
    {
      title: "ITEM(SUPC)",
      dataIndex: "item_supc",
      defaultSortOrder: "descend",
      sorter: (a, b) => a - b,
    },
    {
      title: "ITEM DESCRIPTION",
      dataIndex: "item_des",
     
    },
    {
      title: "CUSTOMER",
      dataIndex: "customer",
     
    },
    {
      title: "CUSTOMER NAME",
      dataIndex: "customer_name",
    },
    {
      title: "SOURCE ID",
      dataIndex: "source_id",
    },
    {
      title: "PRICE ZONE",
      dataIndex: "price_zone",
    },
    {
      title: "EFFECTIVE DATE",
      dataIndex: "effective_price",
    },
   
  ];
  
  
export default function PriceZoneTable() {
    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
      }
    return (
        <div className="pz-table-wrapper">
            <Table pagination={{pageSize: 10 }}  
      columns={columns}  onChange={onChange} />
        </div>
    )
}

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
  
  const data = [
    {
      key: "1",
      Obligation_Num: "ON123456",
      Line_Num:123,
      Transacted_Date: '7 July 2020' ,
      Shipped_Qty: 1234,
      Total_Catch_Weight:'6000kg',
      Unit_Price:'$ 100.00',
      Net_Price:'$ 85.00',
      Create_Date_Time:'06 Jul 2020  11:15 AM'
    },
    {
      key: "2",
      Obligation_Num: "ON123456",
      Line_Num:123,
      Transacted_Date: '8 July 2020' ,
      Shipped_Qty: 1234,
      Total_Catch_Weight:'6000kg',
      Unit_Price:'$ 100.00',
      Net_Price:'$ 85.00',
      Create_Date_Time:'06 Jul 2020  11:15 AM'
    },
    {
      key: "3",
      Obligation_Num: "ON123456",
      Line_Num:123,
      Transacted_Date: '10 July 2020' ,
      Shipped_Qty: 1234,
      Total_Catch_Weight:'6000kg',
      Unit_Price:'$ 100.00',
      Net_Price:'$ 85.00',
      Create_Date_Time:'06 Jul 2020  11:15 AM'
    },
    {
      key: "4",
      Obligation_Num: "ON123456",
      Line_Num:123,
      Transacted_Date: '13 July 2020' ,
      Shipped_Qty: 1234,
      Total_Catch_Weight:'6000kg',
      Unit_Price:'$ 100.00',
      Net_Price:'$ 85.00',
      Create_Date_Time:'06 Jul 2020  11:15 AM'
    },
    {
      key: "5",
      Obligation_Num: "ON123456",
      Line_Num:123,
      Transacted_Date: '15 July 2020' ,
      Shipped_Qty: 1234,
      Total_Catch_Weight:'6000kg',
      Unit_Price:'$ 100.00',
      Net_Price:'$ 85.00',
      Create_Date_Time:'06 Jul 2020  11:15 AM'
    },
    {
      key: "6",
      Obligation_Num: "ON123456",
      Line_Num:123,
      Transacted_Date: '20 July 2020' ,
      Shipped_Qty: 1234,
      Total_Catch_Weight:'6000kg',
      Unit_Price:'$ 100.00',
      Net_Price:'$ 85.00',
      Create_Date_Time:'06 Jul 2020  11:15 AM'
    },
    {
      key: "7",
      Obligation_Num: "ON123456",
      Line_Num:123,
      Transacted_Date: '22 July 2020' ,
      Shipped_Qty: 1234,
      Total_Catch_Weight:'6000kg',
      Unit_Price:'$ 100.00',
      Net_Price:'$ 85.00',
      Create_Date_Time:'06 Jul 2020  11:15 AM'
    },
    {
      key: "8",
      Obligation_Num: "ON123456",
      Line_Num:123,
      Transacted_Date: '22 July 2020' ,
      Shipped_Qty: 1234,
      Total_Catch_Weight:'6000kg',
      Unit_Price:'$ 100.00',
      Net_Price:'$ 85.00',
      Create_Date_Time:'06 Jul 2020  11:15 AM'
    },
    {
      key: "9",
      Obligation_Num: "ON123456",
      Line_Num:123,
      Transacted_Date: '22 July 2020' ,
      Shipped_Qty: 1234,
      Total_Catch_Weight:'6000kg',
      Unit_Price:'$ 100.00',
      Net_Price:'$ 85.00',
      Create_Date_Time:'06 Jul 2020  11:15 AM'
    },
    {
      key: "10",
      Obligation_Num: "ON123456",
      Line_Num:123,
      Transacted_Date: '22 July 2020' ,
      Shipped_Qty: 1234,
      Total_Catch_Weight:'6000kg',
      Unit_Price:'$ 100.00',
      Net_Price:'$ 85.00',
      Create_Date_Time:'06 Jul 2020  11:15 AM'
    },
    {
      key: "11",
      Obligation_Num: "ON123456",
      Line_Num:123,
      Transacted_Date: '22 July 2020' ,
      Shipped_Qty: 1234,
      Total_Catch_Weight:'6000kg',
      Unit_Price:'$ 100.00',
      Net_Price:'$ 85.00',
      Create_Date_Time:'06 Jul 2020  11:15 AM'
    },
    {
      key: "12",
      Obligation_Num: "ON123456",
      Line_Num:123,
      Transacted_Date: '22 July 2020' ,
      Shipped_Qty: 1234,
      Total_Catch_Weight:'6000kg',
      Unit_Price:'$ 100.00',
      Net_Price:'$ 85.00',
      Create_Date_Time:'06 Jul 2020  11:15 AM'
    },
    {
      key: "13",
      Obligation_Num: "ON123456",
      Line_Num:123,
      Transacted_Date: '22 July 2020' ,
      Shipped_Qty: 1234,
      Total_Catch_Weight:'6000kg',
      Unit_Price:'$ 100.00',
      Net_Price:'$ 85.00',
      Create_Date_Time:'06 Jul 2020  11:15 AM'
    },
    {
      key: "14",
      Obligation_Num: "ON123456",
      Line_Num:123,
      Transacted_Date: '22 July 2020' ,
      Shipped_Qty: 1234,
      Total_Catch_Weight:'6000kg',
      Unit_Price:'$ 100.00',
      Net_Price:'$ 85.00',
      Create_Date_Time:'06 Jul 2020  11:15 AM'
    },
   
  ];

export default function PriceZoneTable() {
    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
      }
    return (
        <div className="pz-table-wrapper">
            <Table pagination={{pageSize: 10 }}  
      columns={columns} dataSource={data} onChange={onChange} />
        </div>
    )
}

import React from "react";
import ScrollableTable from "../../../components/ScrollableTable";
import ReviewerSubmitter from "./ReviewerSubmitter";
import PriceZoneStatus from './PriceZoneStatus'
import {Space} from 'antd';

export default function PriceZoneLog() {

  const columns = [
    {
      title: "SUBMITTED BY",
      dataIndex: "name",
      key: "sb",
      width: "20%",
    },
    {
      title: "REVIEWED BY",
      dataIndex: "rb",
      key: "rb",
      width: "20%",
    },
    {
      title: "SUMMARY",
      dataIndex: "sum",
      key: "sum",
      width: "40%",
    },
    {
      title: "STATUS",
      dataIndex: "st",
      key: "st",
      width: "20%",
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      subname: 'jbrown',
      tel: '0571-22098909',
      phone: 18889898989,
      address: 'New York No. 1 Lake Park',
    },
]
  return (
    <div>
     <PriceZoneStatus type="Discarded"/>
      <ScrollableTable columns={columns} data={data}></ScrollableTable>
    </div>
  );
}

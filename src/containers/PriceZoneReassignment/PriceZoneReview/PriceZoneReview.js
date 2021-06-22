import React from "react";
import { Table, Tag, Space } from "antd";

import ReviewSubmitter from '../PriceZoneReview/ReviewSubmitter'
import ReviewSummery from '../PriceZoneReview/ReviewSummery'
import AproveRejectButtons from '../PriceZoneReview/AproveRejectButtons'

const columns = [
  {
    title: "SUBMITTED BY",
    dataIndex: "name",
    key: "name",
    width: '20%',
    render: (cell, row, index) => (
      <Space size="middle">
        <ReviewSubmitter></ReviewSubmitter>
      </Space>
    ),
  },
  {
    title: "SUMMARY OF CHANGES",
    dataIndex: "opco",
    key: "opco",
    width: '40%',
    render: (cell, row, index) => (
      <Space size="middle">
        <ReviewSummery></ReviewSummery>
      </Space>
    ),
  },
  {
    title: "ACTION",
    dataIndex: "accept",
    key: "accept",
    width: '20%',
    render: (cell, row, index) => (
      <Space size="middle">
        <AproveRejectButtons></AproveRejectButtons>
      </Space>
    ),
  },
];

// sample data

const data = [
    {
      key: '1',
      name: 'John Brown',
      opco: 2,
      accept:true
    },
    {
      key: '2',
      name: 'Jim Green',
      opco: 1,
      accept:true
     
    },
    {
      key: '3',
      name: 'Joe Black',
      opco: 4,
      accept:true
    },
  ];

export default function PriceZoneReview() {
  return <div className="pz-review-base-wrapper">
      <Table columns={columns} dataSource={data} />
  </div>;
}

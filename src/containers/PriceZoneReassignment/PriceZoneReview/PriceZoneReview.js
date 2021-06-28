import React from "react";
import { Table, Space } from "antd";

import ReviewSubmitter from "../PriceZoneReview/ReviewSubmitter";
import ReviewSummery from "../PriceZoneReview/ReviewSummery";
import AproveRejectButtons from "../PriceZoneReview/AproveRejectButtons";

import useModal from "../../../hooks/useModal";

// =========================
// Referance table temp data
// =========================

const datareference = [
  {
    key: "1",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "2",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "3",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "4",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "5",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "6",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "7",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "8",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "9",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "10",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "11",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "12",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "13",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "14",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "15",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "16",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "17",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "18",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
  {
    key: "19",
    item_supc: "10101",
    item_des: "item description",
    customer: "customer description",
    source_id: "001001",
    price_zone: "1",
    effective_price: "100$",
  },
];

const columnsreference = [
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

export default function PriceZoneReview() {


  const columns = [
    {
      title: "SUBMITTED BY",
      dataIndex: "name",
      key: "name",
      width: "20%",
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
      width: "40%",
      render: (cell, row, index) => (
        <Space size="middle" onClick={toggle}>
          <ReviewSummery></ReviewSummery>
        </Space>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "accept",
      key: "accept",
      width: "20%",
      render: (cell, row, index) => (
        <Space size="middle">
          <AproveRejectButtons></AproveRejectButtons>
        </Space>
      ),
    },
  ];



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
    {
      key: '4',
      name: 'Joe Black',
      opco: 4,
      accept:true
    },
    {
      key: '5',
      name: 'Joe Black',
      opco: 4,
      accept:true
    },
    {
      key: '6',
      name: 'Joe Black',
      opco: 4,
      accept:true
    },
  ];


  const { on, Modal, toggle } = useModal();
  // on is the modal status =>  on || off

  const ReferenceTable = () => {
    return (
      <div>
        {Modal(
          {
            title: "",
            centered: "true",
            onOK: () => toggle,
            okText: "PROCEED",
            cancelText: "CANCEL",
            width: "60vw",
            footer: "", // no buttons
          },

          <div className="pz-confirm-pop-base-table">
            <div className="pz-pop-table">
              <div className="pop-table-summary">
                <div className="pop-sum-customer-grp">
                    <div className="pop-sum-text">CUSTOMER GROUP</div>
                    <div className="pop-sum-tag">31223</div>
                    <div className="pop-sum-total">241 Customers</div>
                </div>
                <div className="pop-sum-Attrib-grp">
                <div className="pop-sum-text">ATTRIBUTE  GROUP</div>
                    <div className="pop-sum-tag pz-tag-blue">Milk</div>
                    <div className="pop-sum-total">221 Items</div>
                </div>
              </div>
              <Table
                columns={columnsreference}
                pagination={{ defaultPageSize: 10 }}
                dataSource={datareference}
                style={{ width: "60vw", height: "60vh" }}
                className="pz-pop-table-ant"
              />
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="pz-review-base-wrapper">
      <Table columns={columns} dataSource={data}  pagination={{ pageSize: 4 , defaultPageSize:4 }}  />
      <ReferenceTable />
    </div>
  );
}

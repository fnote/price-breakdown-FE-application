import React from "react";
import { Table, Tag, Space } from "antd";

import ReviewSubmitter from '../PriceZoneReview/ReviewSubmitter'
import ReviewSummery from '../PriceZoneReview/ReviewSummery'
import AproveRejectButtons from '../PriceZoneReview/AproveRejectButtons'

import useModal from "../../../hooks/useModal";


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


  // =========================
  // Referance table temp data
  // =========================


  


export default function PriceZoneReview() {

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
        <Space size="middle"  onClick={toggle}>
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
            width:500
          },

          <div className="pz-confirm-pop-base">
            <div className="pz-pop-table">
            <Table columns={columns} dataSource={data} />
            </div>
          </div>
        )}
      </div>
    );
  };
  return <div className="pz-review-base-wrapper">
      <Table columns={columns} dataSource={data} />
      <ReferenceTable/>
  </div>;
}

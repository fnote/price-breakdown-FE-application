/* eslint-disable react/display-name */
import React from 'react';
import { Table, Space } from 'antd';

import ReviewSubmitter from './ReviewSubmitter';
import ReviewSummery from './ReviewSummery';
import AproveRejectButtons from './AproveRejectButtons';

const columns = [
  {
    title: 'SUBMITTED BY',
    dataIndex: 'submitter',
    key: 'submitter',
    width: '20%',
    render: (submitter) => (
      <Space size='middle'>
        <ReviewSubmitter submitter={submitter} />
      </Space>
    ),
  },
  {
    title: 'SUMMARY OF CHANGES',
    dataIndex: 'opco',
    key: 'opco',
    width: '40%',
    render: (cell, row, index) => (
      <Space size='middle'>
        <ReviewSummery />
      </Space>
    ),
  },
  {
    title: 'ACTION',
    dataIndex: 'accept',
    key: 'accept',
    width: '20%',
    render: (cell, row, index) => (
      <Space size='middle'>
        <AproveRejectButtons />
      </Space>
    ),
  },
];

// sample data

const data = [
  {
    'id': 121,
    'businessUnitNumber': '020',
    'itemAttributeGroup': 'VEGETABLE PUREES/SEASONINGS/PASTES',
    'itemAttributeGroupId': '12345',
    'customerGroupId': '221',
    'customerAccount': '700001',
    'customerGroup': 'El Cerro',
    'newPriceZone': 3,
    'status': 'APPROVED',
    'effectiveFromDate': '20210530',
    'submitter': {
        'submitterId': 'vvit5827',
        'givenName': 'Vithulan',
        'surname': 'MV',
        'email': 'vvit5827@sysco.com'
    },
    'summary': {
        'customerCount': 12,
        'supcCount': 123
    },
    'createdTime': 1621837508,
    'approver': null,
    'approverUpdatedTime': null,
    'exportedTime': null
  }
];

export default function PriceZoneReview() {
  return <div className='pz-review-base-wrapper'>
      <Table columns={columns} dataSource={data} />
  </div>;
}

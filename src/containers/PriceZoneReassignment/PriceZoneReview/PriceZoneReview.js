/* eslint-disable react/display-name */
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Table, Space, Spin } from 'antd';
import useModal from '../../../hooks/useModal';
import {getBffUrlConfig} from '../../../utils/Configs';
import {
  formatPZRequest,
  generatePaginationParams,
  constructRequestUrl,
  handleResponse,
  constructPatchPayload,
  removeCompletedRequest,
  calculateResetIndex
} from '../../../utils/PZRUtils';
import { REVIEW_RESULT_TABLE_PAGE_SIZE } from '../../../constants/PZRContants';
// import { PZRContext } from '../PZRContext';
import { UserDetailContext } from '../../UserDetailContext';
import ReviewSubmitter from './ReviewSubmitter';
import ReviewSummery from './ReviewSummery';
import AproveRejectButtons from './AproveRejectButtons';
import CustomPagination from '../../../components/CustomPagination';
import businessUnitMap from '../../../constants/BusinessUnits';

export default function PriceZoneReview() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataResetIndex, setDataResetIndex] = useState(0);
  const [dataStore, setDataStore] = useState({});
  const [totalResultCount, setTotalResultCount] = useState(REVIEW_RESULT_TABLE_PAGE_SIZE);
  const [resultLoading, setResultLoading] = useState(false);
  // const userDetailsContext = useContext(UserDetailContext);
  const reviewer = {
    id: 'sams5625',
    givenName: 'Sanjaya',
    surname: 'Amarasinghe',
    email: 'sams5625@sysco.com'
  };

  const dataSource = useMemo(() => {
    const currentPageData = dataStore[currentPage];
    if (currentPageData) {
      return dataStore[currentPage].map((record) => formatPZRequest(record, { businessUnitMap }));
    }
    return [];
  }, [dataStore, currentPage]);

  const { on, Modal, toggle } = useModal();

  const fetchPZChangeRequests = (page) => {
    const paginationParams = generatePaginationParams(page, REVIEW_RESULT_TABLE_PAGE_SIZE);
    const requestUrl = constructRequestUrl(getBffUrlConfig().pzUpdateRequests, paginationParams);
    setResultLoading(true);
    fetch(requestUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      credentials: 'include'
    })
    .then(handleResponse)
    .then((resp) => {
      if (resp.success) {
        const { totalRecords, data: { pzUpdateRequests } } = resp.data;
        const updatedDataStore = { ...dataStore, [page]: pzUpdateRequests };
        setTotalResultCount(totalRecords);
        setDataStore(updatedDataStore);
      } else {
        // todo: handle error scenario with a message to user
        console.log(resp);
      }
      setResultLoading(false);
    })
    .catch((err) => {
      // todo: handle error scenario with a message to user
      console.log(err);
    })
    .finally(() => {
      setResultLoading(false);
    });
  };

  const approveRejectPZChangeRequests = ({ id, index }, { reviewNote, status }) => {
    const payload = constructPatchPayload({ id }, { reviewNote, status }, reviewer);
    const requestUrl = getBffUrlConfig().pzUpdateRequests;
    fetch(requestUrl, {
      method: 'PATCH',
      body: payload,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(handleResponse)
    .then((resp) => {
      console.log(resp);
      if (resp.success) {
        console.log(dataStore);
        console.log(currentPage);
        const updatedDataStore = removeCompletedRequest(dataStore, currentPage, index);
        setDataStore(updatedDataStore);
        setDataResetIndex(calculateResetIndex(dataResetIndex, currentPage));
      } else {
        // todo: handle error scenario with a message to user
      }
    })
    .catch((err) => {
      // todo: handle error scenario with a message to user
      console.log(err);
    });
  };

  const loadTableData = (page = 1) => {
    if (!dataStore[page]) {
      fetchPZChangeRequests(page);
    }
  };

  const cleanInvalidData = () => {
    if (dataResetIndex > 0) {
      const dataStoreCopy = { ...dataStore };
      Object.keys(dataStoreCopy).forEach((key) => delete dataStoreCopy[key]);
      setDataStore(dataStoreCopy);
    }
  };

  const approve = (row, index) => {
    console.log(row);
    console.log(index);
  };

  const reject = (row, index) => {
    console.log(row);
    console.log(index);
  };

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

  useEffect(() => {
    loadTableData();
  }, []);


  const columns = [
    {
      title: 'SUBMITTED BY',
      dataIndex: 'submission',
      key: 'submission',
      width: '20%',
      render: (submission) => (
        <Space size='middle'>
          <ReviewSubmitter submission={submission} />
        </Space>
      ),
    },
    {
      title: 'SUMMARY OF CHANGES',
      dataIndex: 'changeSummary',
      key: 'changeSummary',
      width: '40%',
      render: (changeSummary) => (
        <Space size='middle' onClick={toggle}>
          <ReviewSummery changeSummary={changeSummary} />
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
          <AproveRejectButtons row={row} index={index} approve={approve} reject={reject} handle={approveRejectPZChangeRequests}/>
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
  
  const ReferenceTable = () => {
    return (
      <div>
        {Modal(
          {
            title: '',
            centered: 'true',
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

  const renderLoader = () => (
    <Space size='middle' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Spin size='large' />
    </Space>
  );

  const renderDataTable = () => (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
      <ReferenceTable/>
    </>    
  );

  return (
    <div className='pz-review-base-wrapper'>
      {!resultLoading ? renderDataTable() : renderLoader()}
      <CustomPagination
        total={totalResultCount}
        current={currentPage}
        onChange={(current) => {
          if (!resultLoading) {
            setCurrentPage(current);
            cleanInvalidData();
            loadTableData(current);
          }
        }}
        pageSize={REVIEW_RESULT_TABLE_PAGE_SIZE}
      />
    </div>
  );
}

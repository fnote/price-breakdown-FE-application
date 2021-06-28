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

  const ReferenceTable = () => {
    return (
      <div>
        {Modal(
          {
            title: '',
            centered: 'true',
            onOK: () => toggle,
            okText: 'PROCEED',
            cancelText: 'CANCEL',
            width: 500
          },

          <div className='pz-confirm-pop-base'>
            <div className='pz-pop-table'>
            <Table columns={columns} dataSource={dataSource} />
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

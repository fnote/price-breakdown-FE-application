/* eslint-disable react/display-name */
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Table, Space, Spin } from 'antd';
import useModal from "../../../hooks/useModal";
import {getBffUrlConfig} from '../../../utils/Configs';
import {
  formatPZRequest,
  generatePaginationParams,
  constructRequestUrl,
  handleResponse
} from '../../../utils/PZRUtils';
import { REVIEW_RESULT_TABLE_PAGE_SIZE } from '../../../constants/PZRContants';
import { PZRContext } from '../PZRContext';
import ReviewSubmitter from './ReviewSubmitter';
import ReviewSummery from './ReviewSummery';
import AproveRejectButtons from './AproveRejectButtons';
import CustomPagination from '../../../components/CustomPagination';
import businessUnitMap from '../../../constants/BusinessUnits';

export default function PriceZoneReview() {
  const [totalResultCount, setTotalResultCount] = useState(REVIEW_RESULT_TABLE_PAGE_SIZE);
  const [resultLoading, setResultLoading] = useState(false);

  const pzrContext = useContext(PZRContext);

  const dataSource = useMemo(() => {
    const currentPageData = pzrContext.dataStore[pzrContext.currentPage];
    if (currentPageData) {
      return pzrContext.dataStore[pzrContext.currentPage].map((record) => formatPZRequest(record, { businessUnitMap }));
    }
    return [];
  }, [pzrContext.dataStore, pzrContext.currentPage]);

  const { on, Modal, toggle } = useModal();

  const fetchPZChangeRequests = (page) => {
    const paginationParams = generatePaginationParams(page, REVIEW_RESULT_TABLE_PAGE_SIZE);
    const requestUrl = constructRequestUrl(getBffUrlConfig().getPZUpdateRequests, paginationParams);
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
        const updatedDataStore = { ...pzrContext.dataStore, [page]: pzUpdateRequests };
        setTotalResultCount(totalRecords);
        pzrContext.setDataStore(updatedDataStore);
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

  const loadTableData = (page = 1) => {
    console.log('loading data');
    if (!pzrContext.dataStore[page]) {
      fetchPZChangeRequests(page);
    }
  };

  const cleanInvalidData = () => {
    if (pzrContext.dataResetIndex > 0) {
      const dataStoreCopy = { ...pzrContext.dataStore };
      Object.keys(dataStoreCopy).forEach((key) => delete dataStoreCopy[key]);
      pzrContext.setDataStore(dataStoreCopy);
    }
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
          <AproveRejectButtons row={row} index={index}/>
        </Space>
      ),
    },
  ];

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
            <Table columns={columns} dataSource={dataSource} />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderLoader = () => (
    <Space size="middle" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Spin size="large" />
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
        current={pzrContext.currentPage}
        onChange={(current) => {
          if (!resultLoading) {
            pzrContext.setCurrentPage(current);
            cleanInvalidData();
            loadTableData(current);
          }
        }}
        pageSize={REVIEW_RESULT_TABLE_PAGE_SIZE}
      />
    </div>
  );
}

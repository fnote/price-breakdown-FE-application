/* eslint-disable react/display-name */
import React, {useState, useEffect, useContext, useMemo} from 'react';
import {Table, Space } from 'antd';
import useModal from '../../../hooks/useModal';
import {getBffUrlConfig} from '../../../utils/Configs';
import {
    formatPZRequest,
    constructPatchPayload,
    generateReviewer
} from '../../../utils/PZRUtils';
import {
    REVIEW_RESULT_TABLE_PAGE_SIZE
} from '../../../constants/PZRConstants';
import {UserDetailContext} from '../../UserDetailContext';
import ReviewSubmitter from './ReviewSubmitter';
import ReviewSummary from './ReviewSummary';
import AproveRejectButtons from './AproveRejectButtons';
import ReferenceDataTable from './ReferenceDataTable';
import CustomPagination from '../../../components/CustomPagination';
import {fetchPZChangeRequests} from '../handlers/PZRGetSubmittedRequestsHandler';
import {handleApproveReject} from '../handlers/PZRApproveRejectHandler';

const generateColumns = ({ setSelectedRecord, toggle, approveRejectPZChangeRequests, approveRejectProgressing }) => ([
    {
        title: 'SUBMITTED BY',
        dataIndex: 'submission',
        key: 'submission',
        width: '20%',
        render: (submission) => (
            <Space size='middle'>
                <ReviewSubmitter submission={submission}/>
            </Space>
        ),
    },
    {
        title: 'SUMMARY OF CHANGES',
        dataIndex: 'changeSummary',
        key: 'changeSummary',
        width: '40%',
        render: (changeSummary) => (
            <Space
                size='middle'
                onClick={() => {
                    console.log(changeSummary);
                    setSelectedRecord(changeSummary);
                    toggle();
                }}
            >
                <ReviewSummary changeSummary={changeSummary}/>
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
                <AproveRejectButtons row={row} index={index} handle={approveRejectPZChangeRequests}
                                     disable={approveRejectProgressing}/>
            </Space>
        ),
    },
]);

export default function PriceZoneReview() {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataResetIndex, setDataResetIndex] = useState(0);
    const [dataStore, setDataStore] = useState({});
    const [totalResultCount, setTotalResultCount] = useState(REVIEW_RESULT_TABLE_PAGE_SIZE);
    const [resultLoading, setResultLoading] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [approveRejectProgressing, setApproveRejectProgressing] = useState(false);
    const [fetchNewData, setFetchNewData] = useState(false);
    const userDetailContext = useContext(UserDetailContext);
    const {activeBusinessUnitMap: businessUnitMap} = userDetailContext.userDetailsData.userDetails;

    const dataSource = useMemo(() => {
        const currentPageData = dataStore[currentPage];
        if (currentPageData) {
            return dataStore[currentPage].map((record) => formatPZRequest(record, {businessUnitMap}));
        }
        return [];
    }, [dataStore, currentPage, businessUnitMap]);

    const {Modal, toggle} = useModal();

    const approveRejectPZChangeRequests = ({ id, index }, { reviewNote, status }, { successCallback, failureCallback }) => {
        setApproveRejectProgressing(true);
        const payload = constructPatchPayload({ id }, { reviewNote, status }, generateReviewer(userDetailContext.userDetailsData.userDetails));
        const requestUrl = getBffUrlConfig().pzUpdateRequests;
        handleApproveReject({
            requestUrl,
            payload,
            dataStore,
            currentPage,
            index,
            dataResetIndex,
            status,
            setDataStore,
            setFetchNewData,
            setDataResetIndex,
            setApproveRejectProgressing,
            successCallback,
            failureCallback
        });
    };

    const loadTableData = (page = 1, store = {}) => {
        if (!store[page]) {
            fetchPZChangeRequests({ page, store, setResultLoading, setTotalResultCount, setDataStore });
        }
    };

    const cleanInvalidData = () => {
        if (dataResetIndex > 0) {
            const dataStoreCopy = {...dataStore};
            Object.keys(dataStoreCopy)
                .forEach((key) => {
                    if (key >= dataResetIndex) {
                        delete dataStoreCopy[key];
                    }
                });
            setDataStore(dataStoreCopy);
            setDataResetIndex(0);
            return dataStoreCopy;
        }
        return dataStore;
    };

    const updateDataStore = (page) => {
        const updatedDataStore = cleanInvalidData();
        loadTableData(page, updatedDataStore);
    };

    useEffect(() => {
        loadTableData();
    }, []);

    useEffect(() => {
        if (fetchNewData) {
            updateDataStore(currentPage);
            setFetchNewData(false);
        }
    }, [fetchNewData, currentPage]);

    const ReferenceTable = () => (
        <div>
            {Modal(
                {
                    title: '',
                    centered: 'true',
                    onOK: () => toggle,
                    okText: 'PROCEED',
                    cancelText: 'CANCEL',
                    width: '60vw',
                    footer: '',
                },
                <ReferenceDataTable record={selectedRecord} setSelectedRecord={setSelectedRecord}/>
            )}
        </div>
    );

    const renderDataTable = () => (
        <>
            <Table
                columns={generateColumns({ setSelectedRecord, toggle, approveRejectPZChangeRequests, approveRejectProgressing })}
                dataSource={dataSource}
                pagination={false}
                loading={resultLoading}
            />
            {selectedRecord && <ReferenceTable record={selectedRecord}/>}
        </>
    );

    return (
        <div className='pz-review-base-wrapper'>
            {renderDataTable()}
            <CustomPagination
                total={totalResultCount}
                current={currentPage}
                onChange={(current) => {
                    if (!resultLoading) {
                        setCurrentPage(current);
                        updateDataStore(current);
                    }
                }}
                pageSize={REVIEW_RESULT_TABLE_PAGE_SIZE}
            />
        </div>
    );
}

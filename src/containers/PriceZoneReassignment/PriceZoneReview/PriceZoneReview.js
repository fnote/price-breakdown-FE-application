/* eslint-disable react/display-name */
import React, {useState, useEffect, useContext, useMemo} from 'react';
import {Table, Space, notification} from 'antd';
import useModal from '../../../hooks/useModal';
import {getBffUrlConfig} from '../../../utils/Configs';
import {
    formatPZRequest,
    generatePaginationParams,
    constructRequestUrl,
    handleResponse,
    constructPatchPayload,
    removeCompletedRequest,
    calculateResetIndex,
    constructFetchRequest,
    generateReviewer
} from '../../../utils/PZRUtils';
import {
    REVIEW_RESULT_TABLE_PAGE_SIZE,
    PZ_CHANGE_REQUEST_STATUS_PENDING_APPROVAL
} from '../../../constants/PZRConstants';
import {HTTP_METHOD_PATCH} from '../../../constants/Constants';
import {UserDetailContext} from '../../UserDetailContext';
import ReviewSubmitter from './ReviewSubmitter';
import ReviewSummary from './ReviewSummary';
import AproveRejectButtons from './AproveRejectButtons';
import ReferenceDataTable from './ReferenceDataTable';
import CustomPagination from '../../../components/CustomPagination';

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
    const userDetailContext = useContext(UserDetailContext);
    const {activeBusinessUnitMap: businessUnitMap} = userDetailContext.userDetailsData.userDetails;

    const dataSource = useMemo(() => {
        const currentPageData = dataStore[currentPage];
        if (currentPageData) {
            return dataStore[currentPage].map((record) => formatPZRequest(record, {businessUnitMap}));
        }
        return [];
    }, [dataStore, currentPage]);

    const {Modal, toggle} = useModal();

    const openNotificationWithIcon = (type, description, msg) => {
        notification[type]({
            message: msg,
            description,
        });
    };

    const fetchPZChangeRequests = (page, store) => {
        const paginationParams = generatePaginationParams(page, REVIEW_RESULT_TABLE_PAGE_SIZE);
        const requestUrl = constructRequestUrl(getBffUrlConfig().pzUpdateRequests,
            {...paginationParams, request_status: PZ_CHANGE_REQUEST_STATUS_PENDING_APPROVAL});
        setResultLoading(true);
        fetch(requestUrl, constructFetchRequest())
            .then(handleResponse)
            .then((resp) => {
                if (resp.success) {
                    const {totalRecords, data: {pzUpdateRequests}} = resp.data;
                    const updatedDataStore = {...store, [page]: pzUpdateRequests};
                    setTotalResultCount(totalRecords);
                    setDataStore(updatedDataStore);
                } else {
                    // todo: handle error scenario with a message to user
                    console.log(resp);
                }
                setResultLoading(false);
            })
            .catch((err) => {
                openNotificationWithIcon('error', 'Failed to fetch', 'Failure');
                // todo: handle error scenario with a message to user
                console.log(err);
            })
            .finally(() => {
                setResultLoading(false);
            });
    };

    const approveRejectPZChangeRequests = ({id, index}, {reviewNote, status}, {successCallback, failureCallback}) => {
        setApproveRejectProgressing(true);
        const payload = constructPatchPayload({id}, {reviewNote, status}, generateReviewer(userDetailContext.userDetailsData.userDetails));
        const requestUrl = getBffUrlConfig().pzUpdateRequests;
        fetch(requestUrl, constructFetchRequest(HTTP_METHOD_PATCH, payload))
            .then(handleResponse)
            .then((resp) => {
                console.log(resp);
                if (resp.success) {
                    successCallback();
                    console.log(dataStore);
                    console.log(currentPage);
                    const updatedDataStore = removeCompletedRequest(dataStore, currentPage, index);
                    setDataStore(updatedDataStore);
                    setDataResetIndex(calculateResetIndex(dataResetIndex, currentPage));
                } else {
                    failureCallback();
                    // todo: handle error scenario with a message to user
                }
            })
            .catch((err) => {
                failureCallback();
                // todo: handle error scenario with a message to user
                console.log(err);
            })
            .finally(() => {
                setApproveRejectProgressing(false);
            });
    };

    const loadTableData = (page = 1, store = {}) => {
        if (!store[page]) {
            fetchPZChangeRequests(page, store);
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

    useEffect(() => {
        loadTableData();
    }, []);

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
                        const updatedDataStore = cleanInvalidData();
                        loadTableData(current, updatedDataStore);
                    }
                }}
                pageSize={REVIEW_RESULT_TABLE_PAGE_SIZE}
            />
        </div>
    );
}

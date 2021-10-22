/* eslint-disable react/display-name */
// Core
import React, {useState, useEffect, useContext, useMemo, useRef} from 'react';
import {Space, Empty, Button, Spin} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
// Custom components
import useModal from '../../../hooks/useModal';
import ReviewSubmitter from './ReviewerSubmitter';
import ReviewSummary from './PzLogSummery';
import PriceZoneStatus from './PriceZoneStatus';
import ReferenceDataTable from './ReferenceDataTable';
import CustomPagination from '../../../components/CustomPagination';
import ScrollableTable from '../../../components/ScrollableTable';
// Contexts
import {UserDetailContext} from '../../UserDetailContext';
import {PZRContext} from '../PZRContext';
// Handlers
import {fetchPZChangeRequests} from '../handlers/PZRGetSubmittedRequestsHandler';
import {handleApproveReject} from '../handlers/PZRApproveRejectHandler';
// utils, configs
import {getBffUrlConfig} from '../../../utils/Configs';
import {
    formatPZRequest,
    constructPatchPayload,
    generateReviewer,
    getEmptyDataTableMessage
} from '../helper/PZRHelper';
// constants
import {
    REVIEW_RESULT_TABLE_PAGE_SIZE
} from '../../../constants/PZRConstants';

const generateColumns = ({setSelectedRecord, toggle}) => ([
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
        title: 'REVIEWED BY',
        dataIndex: 'submission',
        key: 'submission',
        width: '20%',
        render: (reviewerDetails) => (
            <Space size='middle'>
                <ReviewSubmitter submission={reviewerDetails}/>
            </Space>
        ),
    },
    {
        title: 'SUMMARY',
        dataIndex: 'changeSummary',
        key: 'changeSummary',
        width: '40%',
        render: (changeSummary) => (
            <Space
                size='middle'
            >
                <ReviewSummary changeSummary={changeSummary}/>
            </Space>
        ),
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status',
        width: '20%',
        render: (status) => {
            console.log('llllllllllllllllllllllll')
            console.log(status)
            return(
                // <Space size='middle'>
                    <PriceZoneStatus status={status}/>
                // </Space>
            )
        }
    },
]);

export default function PriceZoneLog() {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataResetIndex, setDataResetIndex] = useState(0);
    const [dataStore, setDataStore] = useState({});
    const [totalResultCount, setTotalResultCount] = useState(REVIEW_RESULT_TABLE_PAGE_SIZE);
    const [resultLoading, setResultLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [approveRejectProgressing, setApproveRejectProgressing] = useState(false);
    const [fetchNewData, setFetchNewData] = useState(false);
    const userDetailContext = useContext(UserDetailContext);
    const {activeBusinessUnitMap: businessUnitMap} = userDetailContext.userDetailsData.userDetails;
    const pZRContext = useContext(PZRContext);

    const dataSource = useMemo(() => {
        const currentPageData = dataStore[currentPage];
        if (currentPageData) {
            console.log(dataStore[currentPage]);
            return dataStore[currentPage].map((record) => formatPZRequest(record, {businessUnitMap}));
        }
        return [];
    }, [dataStore, currentPage, businessUnitMap]);

    useEffect(() => {
        pZRContext.setIsOnTransactionLog(true);
    }, []);

    const {Modal, toggle} = useModal();

    const approveRejectPZChangeRequests = (
        {id, index}, {reviewNote, status}, {successCallback, failureCallback, alreadyApprovedRejectedCallback}
    ) => {
        setApproveRejectProgressing(true);
        const payload = constructPatchPayload({id}, {
            reviewNote,
            status
        }, generateReviewer(userDetailContext.userDetailsData.userDetails));
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
            failureCallback,
            alreadyApprovedRejectedCallback
        });
    };

    const loadTableData = (page = 1, store = {}) => {
        if (!store[page]) {
            fetchPZChangeRequests({page, store, setResultLoading, setTotalResultCount, setDataStore, setCurrentPage, setError}, pZRContext.filterParams);
        } else {
            setCurrentPage(page);
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
        loadTableData();
    }, [pZRContext.filterParams]);

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

    const [tableSize, setTableSize] = useState({
        width: 0,
        height: 0
    });

    const tableRef = useRef();

    const calcSize = () => {
        if (tableRef.current) {
            setTableSize({...tableSize, width: tableRef.current.clientWidth, height: tableRef.current.clientHeight});
        }
    };

    window.onresize = () => {
        calcSize();
    };

    useEffect(() => {
        calcSize();
    }, [tableRef.current]);

    const renderDataTable = () => {
        if (pZRContext.isOnTransactionLog) {
            return (
                <>
                    <ScrollableTable
                        columns={generateColumns({
                            setSelectedRecord,
                            toggle,
                            approveRejectPZChangeRequests,
                            approveRejectProgressing
                        })}
                        dataSource={dataSource}
                        pagination={false}
                        loading={resultLoading}
                        scroll={{ y: tableSize.height - 80 }}
                        locale={{emptyText: <Empty description={getEmptyDataTableMessage(error)}/>}}
                        onChange={calcSize}
                    />
                    {selectedRecord && <ReferenceTable record={selectedRecord}/>}
                </>
            );
        }
        return null;
    };

    return (
        <div className='pz-review-base-wrapper' ref={tableRef}>
            {/*<Button id="pz-review-refresh" shape="round" icon={<ReloadOutlined />} size="small" disabled={resultLoading}*/}
            {/*        onClick={() => fetchPZChangeRequests({*/}
            {/*            page: 1, store: {}, setResultLoading, setTotalResultCount, setDataStore, setCurrentPage, setError*/}
            {/*        }, pZRContext.filterParams)}*/}
            {/*>*/}
            {/*    Refresh*/}
            {/*</Button>*/}
            {renderDataTable()}
            <CustomPagination
                className="pz-review-pagination"
                total={totalResultCount}
                current={currentPage}
                onChange={(current) => {
                    updateDataStore(current);
                }}
                pageSize={REVIEW_RESULT_TABLE_PAGE_SIZE}
                disabled={resultLoading}
            />
        </div>
    );
}

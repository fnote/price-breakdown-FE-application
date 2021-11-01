/* eslint-disable react/display-name */
// Core
import React, {useState, useEffect, useContext, useMemo, useRef} from 'react';
import {Space, Empty} from 'antd';
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
import {
    formatPZRequest,
    getTHLEmptyDataTableMessage
} from '../helper/PZRHelper';
// constants
import {
    REVIEW_RESULT_TABLE_PAGE_SIZE
} from '../../../constants/PZRConstants';
import {emptyResponseForTHL} from "../SearchPanel/SearchStatuses";

const generateColumns = () => ([
    {
        title: 'SUBMITTED BY',
        dataIndex: 'submission',
        key: 'submission',
        width: '20%',
        render: (submission) => (
            <Space size='middle'>
                <ReviewSubmitter submission={submission} type="submit"/>
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
                <ReviewSubmitter submission={reviewerDetails} type="review"/>
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
            return(
                    <PriceZoneStatus status={status}/>
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
    const [fetchNewData, setFetchNewData] = useState(false);
    const userDetailContext = useContext(UserDetailContext);
    const {activeBusinessUnitMap: businessUnitMap} = userDetailContext.userDetailsData.userDetails;
    const pZRContext = useContext(PZRContext);

    const dataSource = useMemo(() => {
        const currentPageData = dataStore[currentPage];
        if (currentPageData) {
            return dataStore[currentPage].map((record) => formatPZRequest(record, {businessUnitMap}));
        }
        return [];
    }, [dataStore, currentPage, businessUnitMap]);

    useEffect(() => {
        pZRContext.setIsOnTransactionLog(true);
    }, []);

    const {Modal, toggle} = useModal();

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
            if (totalResultCount===0 && pZRContext.isFilterUsed){
                return (
                    emptyResponseForTHL()
                )
            }
            return (
                <>
                    <ScrollableTable
                        columns={generateColumns()}
                        dataSource={dataSource}
                        pagination={false}
                        loading={resultLoading}
                        scroll={{ y: tableSize.height - 80 }}
                        locale={{emptyText: <Empty description={getTHLEmptyDataTableMessage(error)}/>}}
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
            {renderDataTable()}
            <CustomPagination
                className="pz-review-pagination"
                total={totalResultCount}
                current={currentPage}
                onChange={(current) => {
                    updateDataStore(current);
                }}
                pageSize={REVIEW_RESULT_TABLE_PAGE_SIZE}
                disabled={resultLoading || totalResultCount===0}
            />
        </div>
    );
}

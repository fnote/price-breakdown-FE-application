import React, { useState, useEffect, useMemo } from 'react';
import { Table } from 'antd';
import CustomPagination from '../../../components/CustomPagination';
import {
    REVIEW_REFERENCE_RESULT_TABLE_PAGE_SIZE
} from '../../../constants/PZRConstants';
import {
    generatePaginationParams,
    constructRequestUrl,
    formatPZReferenceRecord
} from '../../../utils/PZRUtils';
import { getBffUrlConfig } from '../../../utils/Configs';
import { fetchPZRequestDetails} from '../handlers/PZRGetRequestDetailsHandler';
  
const columns = [
    {
        title: 'ITEM(SUPC)',
        dataIndex: 'supc',
    },
    {
        title: 'ITEM DESCRIPTION',
        dataIndex: 'productName',
    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customerAccount',
    },
    {
        title: 'CUSTOMER NAME',
        dataIndex: 'customerName',
    },
    {
        title: 'SOURCE ID',
        dataIndex: 'source',
    },
    {
        title: 'PRICE ZONE',
        dataIndex: 'currentPriceZone',
    },
    {
        title: 'EFFECTIVE DATE',
        dataIndex: 'effectiveFrom',
    },
];

export default function ReferenceDataTable({
                                               record: {id, customerAccount, customerGroup, itemAttributeGroup, customerCount, supcCount},
                                               setSelectedRecord
                                           }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataStore, setDataStore] = useState({});
    const [resultLoading, setResultLoading] = useState(false);
    const [totalResultCount, setTotalResultCount] = useState(REVIEW_REFERENCE_RESULT_TABLE_PAGE_SIZE);

    const dataSource = useMemo(() => {
        const currentPageData = dataStore[currentPage];
        if (currentPageData) {
            return dataStore[currentPage].map((record) => formatPZReferenceRecord(record));
        }
        return [];
    }, [dataStore, currentPage]);

    const fetchPZChangeRequests = (page) => {
        const paginationParams = generatePaginationParams(page, REVIEW_REFERENCE_RESULT_TABLE_PAGE_SIZE);
        const requestUrl = constructRequestUrl(
            getBffUrlConfig().pzUpdates.replace(':request_id', id),
            paginationParams
        );
        setResultLoading(true);
        fetchPZRequestDetails({
            requestUrl,
            dataStore,
            page,
            setTotalResultCount,
            setDataStore,
            setResultLoading, 
        });
    };

    const loadPageData = (page = 1) => {
        if (!dataStore[page]) {
            fetchPZChangeRequests(page);
        }
    };

    useEffect(() => {
        loadPageData();
        return () => setSelectedRecord(null);
    }, []);

    const renderCustomerInfo = () => {
        if (customerGroup) {
            return (
                <>
                    <div className='pop-sum-text'>CUSTOMER GROUP</div>
                    <div className='pop-sum-tag'>{customerGroup}</div>
                    <div className='pop-sum-total'>{customerCount} Customers</div>
                </>
            );
        }
        return (
            <>
                <div className='pop-sum-text'>CUSTOMER</div>
                <div className='pop-sum-tag-customer'>{customerAccount}</div>
                <div className='pop-sum-total-empty'>|</div>
            </>
        );
    };

    const renderTable = () => (
        <>
            <div className='pop-table-summary'>
                <div className='pop-sum-customer-grp'>
                    {renderCustomerInfo()}
                </div>
                <div className='pop-sum-Attrib-grp'>
                    <div className='pop-sum-text'>ATTRIBUTE GROUP</div>
                    <div className='pop-sum-tag pz-tag-blue'>{itemAttributeGroup}</div>
                    <div className='pop-sum-total'>{supcCount} Items</div>
                </div>
            </div>
            <Table
                columns={columns}
                pagination={false}
                dataSource={dataSource}
                style={{width: '60vw', height: '60vh'}}
                className='pz-pop-table-ant'
                loading={resultLoading}
            />
            <CustomPagination
                total={totalResultCount}
                current={currentPage}
                onChange={(current) => {
                    if (!resultLoading) {
                        setCurrentPage(current);
                        loadPageData(current);
                    }
                }}
                pageSize={REVIEW_REFERENCE_RESULT_TABLE_PAGE_SIZE}
            />
        </>
    );

    return (
        <div className='pz-confirm-pop-base-table'>
            <div className='pz-pop-table'>
                {renderTable()}
            </div>
        </div>
    );
}

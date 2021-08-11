// Core
import React, {useState, useEffect, useMemo} from 'react';
// Custom components
import CustomPagination from '../../../components/CustomPagination';
import ScrollableTable from '../../../components/ScrollableTable';
// Handlers
import {fetchPZRequestDetails} from '../handlers/PZRGetRequestDetailsHandler';
// Utils, Configs
import {
    generatePaginationParams,
    constructRequestUrl,
    formatPZReferenceRecord,
} from '../helper/PZRHelper';
import {getBffUrlConfig} from '../../../utils/Configs';
// Constants
import {
    REVIEW_REFERENCE_RESULT_TABLE_PAGE_SIZE
} from '../../../constants/PZRConstants';

const columns = [
    {
        title: 'ITEM(SUPC)',
        dataIndex: 'supc',
        width: '12%',
    },
    {
        title: 'ITEM DESCRIPTION',
        dataIndex: 'productName',
        width: '20%',
    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customerAccount',
        width: '12%',
    },
    {
        title: 'CUSTOMER NAME',
        dataIndex: 'customerName',
        width: '18%',
    },
    {
        title: 'SOURCE ID',
        dataIndex: 'source',
        width: '12%',
    },
    {
        title: 'PRICE ZONE',
        dataIndex: 'currentPriceZone',
        width: '12%',
    },
    {
        title: 'EFFECTIVE DATE',
        dataIndex: 'effectiveFrom',
        width: '14%',
    },
];

export default function ReferenceDataTable({
                                               record: {id, customerAccount, customerGroup, businessCenterItemAttributeGroup, customerCount, supcCount},
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
            setCurrentPage
        });
    };

    const loadPageData = (page = 1) => {
        if (!dataStore[page]) {
            fetchPZChangeRequests(page);
        } else {
            setCurrentPage(page);
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
                    <div id="customer-group-label" className='pop-sum-text'>CUSTOMER GROUP</div>
                    <div id="customer-group" className='pop-sum-tag'>{customerGroup}</div>
                    <div id="customer-count" className='pop-sum-total'>{customerCount} Customers</div>
                </>
            );
        }
        return (
            <>
                <div id="customer-label" className='pop-sum-text'>CUSTOMER</div>
                <div id="customer-account" className='pop-sum-tag-customer'>{customerAccount}</div>
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
                    <div id="attribute-group-label" className='pop-sum-text'>ATTRIBUTE GROUP</div>
                    <div id="attribute-group" className='pop-sum-tag pz-tag-blue'>{businessCenterItemAttributeGroup}</div>
                    <div id="items" className='pop-sum-total'>{supcCount} Items</div>
                </div>
            </div>
            <ScrollableTable
                columns={columns}
                pagination={false}
                dataSource={dataSource}
                style={{width: '60vw'}}
                className='pz-pop-table-ant'
                loading={resultLoading}
            />
            <CustomPagination
                className="pz-pop-table-pagination"
                total={totalResultCount}
                current={currentPage}
                onChange={(current) => {
                    loadPageData(current);
                }}
                pageSize={REVIEW_REFERENCE_RESULT_TABLE_PAGE_SIZE}
                disabled={resultLoading}
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

// Core
import React, {useContext, useState} from 'react';
// Custom components
import CustomPagination from '../../../components/CustomPagination';
import ScrollableTable from '../../../components/ScrollableTable';
// Context
import {PZRContext} from '../PZRContext';
// Request Handlers
import {DEFAULT_PAGE_SIZE, fetchSearchResults} from '../handlers/PZRSearchHandler';
// Constants and helper functions
import {calculateOffset, formatDate} from '../helper/PZRHelper';

const columns = [
    {
        title: 'ITEM(SUPC)',
        dataIndex: 'supc',
        textWrap: 'word-break',
        width: '10%'
    },
    {
        title: 'ITEM DESCRIPTION',
        dataIndex: 'product_name',
        textWrap: 'word-break',
        width: '25%'
    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customer_account',
        textWrap: 'word-break',
        width: '10%'
    },
    {
        title: 'CUSTOMER NAME',
        dataIndex: 'customer_name',
        textWrap: 'word-break',
        width: '20%'
    },
    {
        title: 'SOURCE ID',
        dataIndex: 'source',
        textWrap: 'word-break',
        width: '10%'
    },
    {
        title: 'PRICE ZONE',
        dataIndex: 'price_zone',
        textWrap: 'word-break',
        width: '10%'
    },
    {
        title: 'EFFECTIVE DATE',
        dataIndex: 'effective_from_date',
        render: formatDate,
        textWrap: 'word-break',
        width: '15%'
    },
];

export default function PriceZoneTable() {
    const PZRContextData = useContext(PZRContext);

    const [currentPage, setCurrentPage] = useState(1);

    const onChange = (page) => {
        setCurrentPage(page);
        const offset = calculateOffset(page, DEFAULT_PAGE_SIZE);
        fetchSearchResults({
            ...PZRContextData.searchParams,
            offset,
            limit: DEFAULT_PAGE_SIZE
        }, PZRContextData);
    };

    const searchResults = PZRContextData.searchResults;

    const renderPageContent = () => (
        <div className="pz-table-wrapper">
                <div className="pz-table-header">
                    Existing Customer Item Price Zone
                </div>
            <ScrollableTable pagination={false}
                   columns={columns}
                   dataSource={searchResults?.data?.item_price_zones || []}
                   loading={PZRContextData.isSearchTableLoading}
                   rowKey={(obj) => obj.supc + obj.customer_account + obj.price_zone + obj.effective_from_date + obj.source}
            />
            <CustomPagination
                onChange={onChange}
                total={searchResults?.total_records || 0}
                current={currentPage}
                pageSize={DEFAULT_PAGE_SIZE}
                disabled={PZRContextData.isSearchTableLoading}
            />
        </div>
    );

    if (!PZRContextData.isOnReviewPage) {
        return renderPageContent();
    }
    return null;
}

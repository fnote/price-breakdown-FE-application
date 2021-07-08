// Core
import React, {useContext, useState} from 'react';
import {Table} from 'antd';
// Custom components
import CustomPagination from '../../../components/CustomPagination';
// Context
import {PZRContext} from '../PZRContext';
// Request Handlers
import {DEFAULT_PAGE_SIZE, fetchSearchResults} from '../handlers/PZRSearchHandler';
// Constants and helper functions
import {calculateOffset, formatDate} from '../helper/PZRHelper';
import { useEffect } from 'react';

const columns = [
    {
        title: 'ITEM(SUPC)',
        dataIndex: 'supc',
    },
    {
        title: 'ITEM DESCRIPTION',
        dataIndex: 'product_name',

    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customer_account',

    },
    {
        title: 'CUSTOMER NAME',
        dataIndex: 'customer_name',
    },
    {
        title: 'SOURCE ID',
        dataIndex: 'source',
    },
    {
        title: 'PRICE ZONE',
        dataIndex: 'price_zone',
    },
    {
        title: 'EFFECTIVE DATE',
        dataIndex: 'effective_from_date',
        render: formatDate
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

    

    return (
        <div className="pz-table-wrapper">

            <Table pagination={false}
                   columns={columns}
                   dataSource={searchResults?.data?.item_price_zones || []}
                   loading={PZRContextData.isSearchTableLoading}
                   rowKey={(obj) => obj.supc + obj.customer_account + obj.price_zone + obj.effective_from_date + obj.source}
                   scroll={{ y: tableSize.height - 120 , x:false}}
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
}

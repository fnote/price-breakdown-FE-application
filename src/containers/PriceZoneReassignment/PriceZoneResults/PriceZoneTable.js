// Core
import React, {useContext, useState, useRef, useEffect} from 'react';
import {Table} from 'antd';
// Custom components
import CustomPagination from '../../../components/CustomPagination';
// Context
import {PZRContext} from '../PZRContext';
// Request Handlers
import {DEFAULT_PAGE_SIZE, fetchSearchResults} from '../handlers/PZRSearchHandler';
// Constants and helper functions
import {calculateOffset, formatDate, getTableScroll} from '../helper/PZRHelper';

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

const ScrollTable = (props) => {
    const [scrollY, setScrollY] = useState();
    const countRef = useRef(null);
    useEffect(() => {
      const scrolly = getTableScroll({ ref: countRef });
      setScrollY(scrolly);
    }, [props]);
    return (
      <div ref={countRef}>
        <Table {...props} scroll={{ x: false, y: scrollY }} />
      </div>
    );
};

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
            <ScrollTable pagination={false}
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

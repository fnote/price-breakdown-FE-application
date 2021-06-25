import React, {useContext, useState} from 'react'
import {Table} from "antd";

import {PZRContext} from "../PZRContext";

import {calculateOffset} from '../PZRHelper';
import {DEFAULT_PAGE_SIZE, PZRFetchSearchResults} from '../PZRSearchHandler';
import CustomPagination from '../../../components/CustomPagination';


const columns = [
    {
        title: "ITEM(SUPC)",
        dataIndex: "supc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a - b,
    },
    {
        title: "ITEM DESCRIPTION",
        dataIndex: "product_name",

    },
    {
        title: "CUSTOMER",
        dataIndex: "customer_account",

    },
    {
        title: "CUSTOMER NAME",
        dataIndex: "customer_name",
    },
    {
        title: "SOURCE ID",
        dataIndex: "source",
    },
    {
        title: "PRICE ZONE",
        dataIndex: "price_zone",
    },
    {
        title: "EFFECTIVE DATE",
        dataIndex: "effective_from_date",
    },

];


export default function PriceZoneTable() {
    const PZRContextData = useContext(PZRContext);

    const [currentPage, setCurrentPage] = useState(1);

    const onChange = (page) => {
        setCurrentPage(page);
        console.log("params", page);
        const offset = calculateOffset(page, DEFAULT_PAGE_SIZE);
        PZRFetchSearchResults({
            ...PZRContextData.searchParams,
            offset: offset,
            limit: DEFAULT_PAGE_SIZE
        }, PZRContextData);
        console.log(offset);
    };

    const searchResults = PZRContextData.searchResults;

    return (
        <div className="pz-table-wrapper">

            <Table pagination={false}
                   columns={columns}
                   dataSource={searchResults.data && searchResults.data.item_price_zones ? searchResults.data.item_price_zones : []}
            />
            <CustomPagination
                onChange={onChange}
                total={searchResults.total_records ? searchResults.total_records : 0}
                current={currentPage}
                pageSize={DEFAULT_PAGE_SIZE}
            />
        </div>
    )
}

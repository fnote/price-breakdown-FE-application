import React, {useContext, useState} from 'react'
import {Table} from "antd";
import CustomPagination from '../../../components/CustomPagination';
import {PZRContext} from "../PZRContext";
import {calculateOffset} from '../PZRHelper';

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

const PAGE_SIZE = 20;

export default function PriceZoneTable() {
    const PZRContextData = useContext(PZRContext);

    const [currentPage, setCurrentPage] = useState(1);

    const onChange = (page) => {
        setCurrentPage(page);
        console.log("params", page);
        const offset = calculateOffset(page, PAGE_SIZE);
        console.log(offset);
        //TODO fetch and update context
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
                pageSize={PAGE_SIZE}
            />
        </div>
    )
}

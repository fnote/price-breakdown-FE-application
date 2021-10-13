import React, {useEffect, useState} from "react";
import { Spin } from 'antd';
import {fetchCustomerDetails} from "../handlers/PZRGetCustomerDetails";
import {REVIEW_RESULT_TABLE_PAGE_SIZE} from "../../../constants/PZRConstants";

export default function PzPopover({id}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [dataStore, setDataStore] = useState({});
    const [totalResultCount, setTotalResultCount] = useState(REVIEW_RESULT_TABLE_PAGE_SIZE);
    const [resultLoading, setResultLoading] = useState(false);
    const [error, setError] = useState(false);
    const [customers, setCustomers] = useState(null);

  const custgroup = [
    31223, 32112, 34223, 34556, 45654, 53452, 73217, 23423, 21231, 45345,
  ];


    const loadPopOverWithCustomerData = ()=> fetchCustomerDetails({id, setResultLoading,setError, setCustomers});

    useEffect(() => {
        loadPopOverWithCustomerData();
    }, []);

    console.log('we are here')
    console.log(customers)
    return(
        <div>
            {customers ? (
                    <div className="pz-log-pop-over">
                        <div className="pz-log-pop-header">
                            <div className="log-pop-header-left">
                                <div className="log-pop-header-top">CUSTOMER GROUP</div>
                                <div className="log-pop-header-bottom">31223</div>
                            </div>
                            <div className="log-pop-header-right">10 customers</div>
                        </div>

                        <div className="pz-log-pop-body">
                            <ul className="pz-log-pop-ul">
                                {customers.map((customer, i) => {
                                    console.log('we here 2 ')
                                    console.log(customers)
                                    return (
                                        <li key={i} className="pz-log-pop-li">
                                            {customer.id}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <Spin></Spin>
                )
            }
        </div>
    )
}

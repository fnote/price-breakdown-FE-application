import React, {useEffect, useState} from "react";
import { Spin } from 'antd';
import {fetchCustomerDetails} from "../handlers/PZRGetCustomerDetails";

export default function PzPopover({id,customerGroup,customerAccount}) {

    const [resultLoading, setResultLoading] = useState(false);
    const [error, setError] = useState(false);
    const [customers, setCustomers] = useState(null);

    const loadPopOverWithCustomerData = ()=> fetchCustomerDetails({id, setResultLoading,setError, setCustomers});

    useEffect(() => {
        loadPopOverWithCustomerData();
    }, []);

    const calcHeight = (cust)=>{
        if(cust){
            if(cust.length <= 3){
                return `${cust.length * 7}rem`;
            }
        }
    }

    return(
        <div>
            {customers ? (
                    <div className="pz-log-pop-over" style={{height:calcHeight(customers)}}>
                        <div className="pz-log-pop-header">
                            <div className="log-pop-header-left">
                                <div className="log-pop-header-top">CUSTOMER GROUP</div>
                                <div className="log-pop-header-bottom">{customerGroup}</div>
                            </div>
                            <div className="log-pop-header-right">{customers.length} customers</div>
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

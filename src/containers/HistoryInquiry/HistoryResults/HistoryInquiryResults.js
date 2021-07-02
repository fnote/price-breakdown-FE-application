import React, {useContext} from 'react';
import RequestId from '../../../components/RequestId';
import {HistoryInquiryContext} from "../HistoryInquiryContext";
import HistoryTable from "./HistoryTable";
import HistoryBar from "./HistoryBar";
import {UserDetailContext} from "../../UserDetailContext";

function HistoryInquiryResults() {
    const historyInquiryContext = useContext(HistoryInquiryContext);
    const historyInquiryData = historyInquiryContext.historyInquiryData;
    const userDetailContext = useContext(UserDetailContext);
    const { userDetails } = userDetailContext.userDetailsData;
    const response = historyInquiryContext.response;

    if (response) {
        const {correlationId} = historyInquiryContext.response;

        return (
            <div className="pricing-results">
                <div className="section-wrapper">
                    <HistoryBar historyInquiryData={historyInquiryData} userData={userDetails}/>
                    <HistoryTable historyInquiryData={historyInquiryData}/>
                    <RequestId requestId={correlationId}/>
                </div>
            </div>
        );
    }

    return null;
}

export default HistoryInquiryResults;

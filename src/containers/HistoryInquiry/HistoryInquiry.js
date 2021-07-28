import React from 'react'
import AppBar from '../../components/AppBar/AppBar'
import SearchPanel from './SearchPanel/SearchPanel'
import SearchStatuses from './SearchPanel/SearchStatuses'
import HistoryInquiryContextProvider from "./HistoryInquiryContext";
import HistoryInquiryResults from "./HistoryResults/HistoryInquiryResults";


export default function HistoryInquiry() {
    return (
        <div className="wrapper cloudpricing-wrapper">
            <AppBar/>
            <div className="content history-content">
                <HistoryInquiryContextProvider>
                    <SearchPanel/>
                    <SearchStatuses/>
                    {/*<HistoryBar/>*/}
                    {/*<HistoryTable/>*/}
                    <div className="pricing-type-label"><strong>PERISCOPE</strong> PRICING</div>
                    <HistoryInquiryResults/>
                </HistoryInquiryContextProvider>
        </div>
      </div>
    )
}

import React from 'react'
import AppBar from '../../components/AppBar/AppBar'
import PriceValidationContextProvider from '../PriceValidation/PriceValidationContext'
import SearchPanel from './SearchPanel/SearchPanel'
import SearchStatuses from './SearchPanel/SearchStatuses'
import HistoryBar from './HistoryResults/HistoryBar'
import HistoryTable from './HistoryResults/HistoryTable'


export default function HistoryInquiry() {
    return (
        <div className="wrapper cloudpricing-wrapper">
        <AppBar />
        <div className="content">
            <PriceValidationContextProvider>
              <SearchPanel />
              <div className="history-wrapper">
              {/* <SearchStatuses/> */}
              <HistoryBar/>
              <HistoryTable/>
              </div>
             
         
             
                <div className="pricing-type-label"><strong>PERISCOPE</strong> PRICING</div>
                {/* <PricingResults /> */}
            </PriceValidationContextProvider>
        </div>
      </div>
    )
}

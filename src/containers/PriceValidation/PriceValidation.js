import React from 'react';
import AppBar from '../../components/AppBar/AppBar';
import SearchPanel from './SearchPanel/SearchPanel';
import SearchStatuses from './SearchPanel/SearchStatuses';
import PricingResults from './PricingResults/PricingResults';
import PriceValidationContextProvider from './PriceValidationContext';

function PriceValidation() {
  return (
    <div className="wrapper cloudpricing-wrapper">
      <AppBar />
      <div className="content">
          <PriceValidationContextProvider>
            <SearchPanel />
            <SearchStatuses />
              <div className="pricing-type-label"><strong>PERISCOPE</strong> PRICING</div>
              <PricingResults />
          </PriceValidationContextProvider>
      </div>
    </div>
  );
}

export default PriceValidation;

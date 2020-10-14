import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import SearchPanel from "./SearchPanel/SearchPanel";
import SearchStatuses from "./SearchPanel/SearchStatuses";
import PricingResults from "./PricingResults/PricingResults";


function PriceValidation() {
  return (
    <div className="wrapper cloudpricing-wrapper">
      <AppBar />
      <div className="content">
        <SearchPanel />
        {/* <SearchStatuses />     Status message collection. */}
        <div className="pricing-type-label"><strong>PERISCOPE</strong> PRICING</div>
        <PricingResults />        
      </div>
    </div>
  );
}

export default PriceValidation;
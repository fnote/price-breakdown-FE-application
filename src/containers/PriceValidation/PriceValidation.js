import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import SearchPanel from "./SearchPanel/SearchPanel";
import PricingResults from "./PricingResults/PricingResults";

function PriceValidation() {
  return (
    <div className="wrapper cloudpricing-wrapper">
      <AppBar />
      <div className="content">
        <SearchPanel />
        <PricingResults />
      </div>
    </div>
  );
}

export default PriceValidation;

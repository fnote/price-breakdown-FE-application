import React from "react";
import {connect} from "react-redux";
import AppBar from "../../components/AppBar/AppBar";
import SearchPanel from "./SearchPanel/SearchPanel";
import SearchStatuses from "./SearchPanel/SearchStatuses";
import PricingResults from "./PricingResults/PricingResults";
import PriceValidationContextProvider from './PriceValidationContext'



function PriceValidation() {
  return (
    <div className="wrapper cloudpricing-wrapper">
      <AppBar />
      <div className="content">
          <PriceValidationContextProvider>
            <SearchPanel />
            {/* <SearchStatuses />     Status message collection. */}
            <PricingResults />
          </PriceValidationContextProvider>
      </div>
    </div>
  );
}

function mapState(state) {
    console.log(state);
    return state;
}

export default connect(mapState, {})(PriceValidation);

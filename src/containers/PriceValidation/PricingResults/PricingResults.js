import React from "react";
import PricingResultsMeta from "./PricingResultsMeta";
import PriceBar from "./PriceBar";
import PriceBarDetailed from "./PriceBarDetailed";

function PricingResults() {
  return (
    <div className="pricing-results">
      <div className="section-wrapper">
        <PricingResultsMeta />
        <PriceBar />
        <PriceBarDetailed />
      </div>
    </div>
  );
}

export default PricingResults;

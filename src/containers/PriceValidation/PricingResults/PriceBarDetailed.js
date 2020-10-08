import React from "react";
import PriceBarDetailedHeader from "./PriceBarDetailedHeader";

const renderHeaderRow = ({ description, validityPeriod, adjustmentValue, calculatedValue }, { className }) => (
    <div className="row">
      <div className={className}>
        <div className="title">
          {description}
        </div>
        {validityPeriod ? <div className="sub-title">{validityPeriod}</div> : null}
        <div className="small-divider"/>
      </div>
      {adjustmentValue ? <div className="adjustment-col">{adjustmentValue}</div> : null}
      {calculatedValue? <div className="calculated-col">{calculatedValue}</div> : null}
    </div>
);

const renderSubRow = ({ description, adjustmentValue, calculatedValue, source, validityPeriod }, { className }) => (
    <div className="row sub-row">
      <div className={className}>
        <div className="subrow-title">
          <i className="icon fi flaticon-circle" />
          {description}
        </div>
        {validityPeriod ? <div className="subrow-sub-title">{validityPeriod}</div> : null}
      </div>
      {adjustmentValue ? <div className="adjustment-col">{adjustmentValue}</div> : null}
      {calculatedValue ? <div className="calculated-col">{calculatedValue}</div> : null}
      {source ? <div className="source-col">{source}</div> : null}
    </div>
);

const renderDetailedSection = (pricingDataList, additionalRows = null, styleMetadataHeaderRow = { className: "description-col" },
                               styleMetadataSubRow = { className: "description-col" }) => (
    <React.Fragment>
      <div className="icon-col">
        <i className="icon fi flaticon-diamond" />
      </div>
      <div className="data-fields">
        {pricingDataList.map((dataRow, index) => index === 0 ? renderHeaderRow(dataRow, styleMetadataHeaderRow)
            : renderSubRow(dataRow, styleMetadataSubRow))}
        {additionalRows}
      </div>
    </React.Fragment>
);

const renderTableRow = ({ description: { rangeStart, rangeEnd, rangeConnector }, adjustmentValue, calculatedValue, source, isSelected }) => (
    <li className={isSelected ? "selected" : null}>
        <div className="description-col">{rangeStart} <span>{rangeConnector}</span> {rangeEnd}</div>
        <div className="adjustment-col">{adjustmentValue}</div>
        <div className="calculated-col">{calculatedValue}</div>
        {isSelected ? <div className="source-col"><i className="icon fi flaticon-tick-1"/>{source}</div> : null}
    </li>
);

const generateVolumeTierRows = (volumePricingHeaderRow, volumePricingTiers) => (
    <React.Fragment>
        {renderSubRow(volumePricingHeaderRow, { className: "description-col colspan-2" })}
        <div className="row sub-row">
            <ul className="value-table">
                {volumePricingTiers.map(tier => renderTableRow(tier))}
            </ul>
        </div>
    </React.Fragment>
);

function PriceBarDetailed({ priceData: { localSegmentRefPriceSection, strikeThroughPriceSection, discountPriceSection, orderNetPriceSection,
    volumePricingHeaderRow, volumePricingTiers }}) {
  return (
    <div className="price-bar-detailed">
      <div className="price-bar-divider"/>
      <section className="detailed-left">
        <PriceBarDetailedHeader />
        <div className="block group1">
          {renderDetailedSection(localSegmentRefPriceSection, null, { className: "description-col colspan-2" })}
        </div>
        <div className="block group2">
          {renderDetailedSection(strikeThroughPriceSection)}
        </div>
      </section>
      <div className="price-bar-divider overlap"/>
      <section className="detailed-right">
        <PriceBarDetailedHeader />
        <div className="block group3">
          {renderDetailedSection(discountPriceSection, generateVolumeTierRows(volumePricingHeaderRow, volumePricingTiers))}
        </div>
        <div className="block group4">
          {renderDetailedSection(orderNetPriceSection)}
        </div>
      </section>
    </div>
  );
}

export default PriceBarDetailed;

import React from "react";
import PriceBarDetailedHeader from "./PriceBarDetailedHeader";
import {
    prepareCustomerNetPriceInfo,
    prepareDiscountPriceInfo,
    prepareLocalSegmentPriceInfo,
    prepareOrderUnitPriceInfo,
    prepareStrikeThroughPriceInfo,
    prepareVolumePricingHeaderRow,
    prepareVolumePricingTiers
} from "../../../utils/PricingUtils";

const renderHeaderRow = ({
 description, validityPeriod, adjustmentValue, calculatedValue 
}, { className }, showSmallDivider = true) => (
    <div className="row">
      <div className={className}>
        <div className="title">
          {description}
        </div>
          {validityPeriod ? <div className="sub-title">{validityPeriod}</div> : null}
          {showSmallDivider ? <div className="small-divider"/> : null }
      </div>
        {calculatedValue ? <div className="value-col">{calculatedValue}</div> : null}
        {adjustmentValue ? <div className="adjustment-col">{adjustmentValue}</div> : null}
    </div>
);

const renderSubRow = ({
 description, adjustmentValue, calculatedValue, validityPeriod, zone, id 
}, { className }) => (
    <div className="row sub-row">
      <div className={className}>
        <div className="subrow-title">
          <i className="icon fi flaticon-circle" />
          {description}
        </div>
          {zone ? <div className="subrow-sub-title">{zone}</div> : null}
          {id ? <div className="subrow-sub-title">ID: {id}</div> : null}
          {validityPeriod ? <div className="subrow-sub-title">{validityPeriod}</div> : null}
      </div>
        {adjustmentValue ? <div className="value-col">{adjustmentValue}</div> : null}
        {calculatedValue ? <div className="adjustment-col">{calculatedValue}</div> : null}
    </div>
);

const DESCRIPTION_COL_CLASSNAME = "description-col";

const renderDetailedSection = (pricingDataList, additionalRows = null, styleMetadataHeaderRow = { className: DESCRIPTION_COL_CLASSNAME },
                                                                    styleMetadataSubRow = { className: DESCRIPTION_COL_CLASSNAME }) => (
    <React.Fragment>
      <div className="icon-col">
        <i className="icon fi flaticon-diamond" />
      </div>
      <div className="data-fields">
        {
            pricingDataList.map((dataRow, index) => (index === 0
                ? renderHeaderRow(dataRow, styleMetadataHeaderRow, (pricingDataList.length > 1))
                : renderSubRow(dataRow, styleMetadataSubRow)))
        }
        {additionalRows}
      </div>
    </React.Fragment>
);

const renderTableRow = ({
 description: { rangeStart, rangeEnd, rangeConnector }, adjustmentValue, calculatedValue, isSelected 
}) => (
    <li className={isSelected ? "selected" : null}>
        <div className="description-col">{rangeStart} <span>{rangeConnector}</span> {rangeEnd}</div>
        <div className="value-col">{adjustmentValue}</div>
        <div className="adjustment-col">{calculatedValue}</div>
        {/* See whether we need to use source here */}
        {isSelected ? <div className="tick-col"><i className="icon fi flaticon-tick-1"/></div> : null}
    </li>
);

const doGenerateVolumeTierRows = (volumePricingHeaderRow, volumePricingTiers) => (
    <React.Fragment>
        {renderSubRow(volumePricingHeaderRow, { className: "description-col colspan-2" })}
        <div className="row sub-row">
            <ul className="value-table">
                {volumePricingTiers.map((tier) => renderTableRow(tier))}
            </ul>
        </div>
    </React.Fragment>
);

const generateVolumeTierRows = (volumePricingHeaderRow, volumePricingTiers) => ((volumePricingTiers && volumePricingTiers.length > 0)
? doGenerateVolumeTierRows(volumePricingHeaderRow, volumePricingTiers) : null);

function PriceBarDetailed({ priceData: { product }}) {
    const customerNetPriceInfo = prepareCustomerNetPriceInfo(product);
    const volumePricingTiers = prepareVolumePricingTiers(product);
    const volumePricingHeaderRow = prepareVolumePricingHeaderRow(product);
    const volumeTierRows = generateVolumeTierRows(volumePricingHeaderRow, volumePricingTiers);
    const orderUnitPriceSection = prepareOrderUnitPriceInfo(product);
    const discountPriceSection = prepareDiscountPriceInfo(product);
    const strikeThroughPriceSection = prepareStrikeThroughPriceInfo(product);
    const localSegmentRefPriceSection = prepareLocalSegmentPriceInfo(product);

  return (
    <div className="price-bar-detailed">
      <div className="price-bar-divider"/>
      <section className="detailed-left">
        <PriceBarDetailedHeader />
        <div className="block group1">
          {renderDetailedSection(localSegmentRefPriceSection, null, { className: DESCRIPTION_COL_CLASSNAME })}
        </div>
        <div className="block group2">
          {renderDetailedSection(strikeThroughPriceSection, volumeTierRows)}
        </div>
      </section>
      <div className="price-bar-divider overlap"/>
      <section className="detailed-right">
        <PriceBarDetailedHeader />
        <div className="block group3">
          {renderDetailedSection(discountPriceSection)}
        </div>
        <div className="block group4">
          {renderDetailedSection(orderUnitPriceSection)}
        </div>
          <div className="block group5">
              {renderDetailedSection(customerNetPriceInfo)}
          </div>
      </section>
    </div>
  );
}

export default PriceBarDetailed;

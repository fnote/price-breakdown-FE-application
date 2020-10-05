import React from "react";
import { connect } from "react-redux";

import PriceBarDetailedHeader from "./PriceBarDetailedHeader";


const t = [
  {description: 'Local Segment Reference Price (Gross)', validityPeriod: 'Valid 01 Jul 2020 - 7 Jul 2020', calculatedValue: '61.00'},
  {description: 'Strategic Discount', adjustmentValue: '- $0.220 /case', calculatedValue: '- $0.88', source: 'Price Advisor'},
  {description: 'Strategic Discount', adjustmentValue: '- $0.220 /case', calculatedValue: '- $0.88', source: 'Price Advisor'},
  {description: 'Rounding', adjustmentValue: '-', calculatedValue: '$0.005', source: 'System'}
];

const s = [
  {description: 'Strike Through Price', validityPeriod: 'Valid 01 Jul 2020 - 7 Jul 2020', calculatedValue: '- $0.88', adjustmentValue: '- 1.500%'},
  {description: 'Behavioral Discounts', adjustmentValue: '- $0.120 /case', calculatedValue: '- $1.44', source: 'Discount Service'},

];

const getFormattedPrice = value => `$${value}`;

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
      {calculatedValue? <div className="calculated-col">{getFormattedPrice(calculatedValue)}</div> : null}
    </div>
);

const renderSubRow = ({ description, adjustmentValue, calculatedValue, source, validityPeriod }) => (
    <div className="row sub-row">
      <div className="description-col">
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

const renderDetailedSection = (pricingDataList, styleMetadata = { className: "description-col" }) => (
    <React.Fragment>
      <div className="icon-col">
        <i className="icon fi flaticon-diamond" />
      </div>
      <div className="data-fields">
        {pricingDataList.map((dataRow, index) => index === 0 ? renderHeaderRow(dataRow, styleMetadata) : renderSubRow(dataRow))}
      </div>
    </React.Fragment>
);

// TODO: populate discount and order net weight sections
function PriceBarDetailed({ localSegmentRefPriceSection, strikeThroughPriceSection, discountPriceSection, orderNetPriceSection }) {
  return (
    <div className="price-bar-detailed">
      <div className="price-bar-divider"></div>

      <section className="detailed-left">
        <PriceBarDetailedHeader />
        <div className="block group1">
          {renderDetailedSection(localSegmentRefPriceSection, { className: "description-col colspan-2"})}
        </div>
        <div className="block group2">
          {renderDetailedSection(strikeThroughPriceSection)}
        </div>
      </section>

      <div className="price-bar-divider overlap"></div>

      <section className="detailed-right">
        <PriceBarDetailedHeader />
        <div className="block group3">
          <div className="icon-col">
            <i className="icon fi flaticon-diamond" />
          </div>
          <div className="data-fields">
            <div className="row">
              <div className="description-col">
                <div className="title">Discount Price</div>
                <div className="sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
                <div className="small-divider"></div>
              </div>
              <div className="adjustment-col">- $0.220 /case</div>
              <div className="calculated-col">$61.00</div>
            </div>
            <div className="row sub-row">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  Post processing / Legal
                </div>
                <div className="subrow-sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
              </div>
              <div className="adjustment-col">- $0.220 /case</div>
              <div className="calculated-col">- $0.88</div>
              <div className="source-col">Price Advisor</div>
            </div>
            <div className="row sub-row">
              <div className="description-col colspan-2">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  Item/Order Specific promotions
                </div>
                <div className="subrow-sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
              </div>
            </div>
            <div className="row sub-row">
              <ul className="value-table">
                <li>
                  <div className="description-col">0 <span>to</span> 5</div>
                  <div className="adjustment-col">- 0.000%</div>
                  <div className="calculated-col">- $0.000</div>
                </li>
                <li>
                  <div className="description-col">6 <span>to</span> 10</div>
                  <div className="adjustment-col">- 0.250%</div>
                  <div className="calculated-col">- $0.153</div>
                </li>
                <li className="selected">
                  <div className="description-col">11 <span>to</span> 15</div>
                  <div className="adjustment-col">- 0.500%</div>
                  <div className="calculated-col">- $0.287 </div>
                  <div className="source-col"><i className="icon fi flaticon-tick-1"/> Discount Service</div>
                </li>
                <li>
                  <div className="description-col">16 <span>to</span> 25</div>
                  <div className="adjustment-col">- 0.750%</div>
                  <div className="calculated-col">- $0.458</div>
                </li>
                <li>
                  <div className="description-col">26 <span>and</span> above</div>
                  <div className="adjustment-col">- 1.000%</div>
                  <div className="calculated-col">- $0.610</div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="block group4">
          <div className="icon-col">
            <i className="icon fi flaticon-diamond" />
          </div>
          <div className="data-fields">
            <div className="row">
              <div className="description-col">
                <div className="title">Order Net Price w/o Exceptions</div>
                <div className="sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
                <div className="small-divider"></div>
              </div>
              <div className="adjustment-col">- $3.40</div>
              <div className="calculated-col">-$3.40</div>
            </div>
            <div className="row sub-row">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  OFFL and OFFT
                </div>
                <div className="subrow-sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
              </div>
              <div className="adjustment-col">- $3.40</div>
              <div className="calculated-col">- $3.40</div>
              <div className="source-col">SUS</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function mapState(state) {
  console.log(state);
  const { search: {
    localSegmentRefPriceSection,
    strikeThroughPriceSection,
    discountPriceSection,
    orderNetPriceSection
  } } = state;

  return {
    localSegmentRefPriceSection,
    strikeThroughPriceSection,
    discountPriceSection,
    orderNetPriceSection
  };
}

export default connect(mapState, {})(PriceBarDetailed);

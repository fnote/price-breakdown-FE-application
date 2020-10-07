import React from "react";

import { getPriceUnitBySplitFlag } from '../../../utils/PricingUtils';
import { META_DATA_PRICE_BAR } from '../../../utils/Constants';

const renderPricePoint = ({ label, valueKey, styleClass, insertDivider = true }, pricingData) => (
    <section className={styleClass}>
        <label>{label}</label>
        <div className="price-block">
            <div className="value">{pricingData[valueKey]}</div>
            <div className="unit-block">
                { insertDivider && <div className="divider"/>}
                <div className="unit">/ {getPriceUnitBySplitFlag(pricingData)}</div>
            </div>
        </div>
    </section>
);

const renderPricePoints = (priceBarMetaData, pricingData) =>
    priceBarMetaData.map(pricePointMetaData => renderPricePoint(pricePointMetaData, pricingData));

function PriceBar(props) {
  const { priceData: { pricePoints } } = props;
  return (
    <div className="price-bar">
        <div className="price-bar-divider"/>
        {renderPricePoints(META_DATA_PRICE_BAR, { ...pricePoints, isSplit: false })}
    </div>
  );
}

export default PriceBar;

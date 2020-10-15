import React from "react";
import { getPriceUnitBySplitFlag } from '../../../utils/PricingUtils';
import { META_DATA_PRICE_BAR, LABEL_CUSTOMER_NET_PRICE } from '../../../constants/Constants';

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
        {label === LABEL_CUSTOMER_NET_PRICE ? <div className="price-source">Source: <strong>Price Advisor</strong></div> : null}
    </section>
);

const renderPricePoints = (priceBarMetaDataList, pricingData) =>
    priceBarMetaDataList.map(pricePointMetaData => renderPricePoint(pricePointMetaData, pricingData));

function PriceBar(props) {
  const { priceData: { pricePoints, product: { splitFlag } } } = props;
  return (
    <div className="price-bar">
        <div className="price-bar-divider"/>
        {renderPricePoints(META_DATA_PRICE_BAR, { ...pricePoints, isSplit: splitFlag })}
    </div>
  );
}

export default PriceBar;

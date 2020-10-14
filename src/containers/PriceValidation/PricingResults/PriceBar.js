import React from "react";
import {LABEL_CUSTOMER_NET_PRICE} from "../../../constants/Constants"

import { getPriceUnitBySplitFlag } from '../../../utils/PricingUtils';
import { META_DATA_PRICE_BAR } from '../../../constants/Constants';

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

const renderPricePoints = (priceBarMetaData, pricingData) =>
    priceBarMetaData.map(pricePointMetaData => renderPricePoint(pricePointMetaData, pricingData));

function PriceBar(props) {
  const { priceData: { pricePoints, response } } = props;
  return (
    <div className="price-bar">
        <div className="price-bar-divider"/>
        {/*TODO: sanjayaa Correct data retrieval here*/}
        {renderPricePoints(META_DATA_PRICE_BAR, { ...pricePoints, isSplit: response.products[0].splitFlag })}
    </div>
  );
}

export default PriceBar;

import React from "react";
import { getPriceUnit, formatPriceWithoutCurrency, isFixedFractionDigits } from '../../../utils/PricingUtils';
import { META_DATA_PRICE_BAR, LABEL_CUSTOMER_NET_PRICE, VALUE_KEY_CUSTOMER_REF_PRICE } from '../../../constants/Constants';

const renderPricePoint = ({ label, valueKey, styleClass, insertDivider = true }, pricingData) => (
    <section className={styleClass}>
        <label>{label}</label>
        <div className="price-block">
            <div className="value">{formatPriceWithoutCurrency(pricingData[valueKey], {
                perWeightFlag: pricingData.perWeightFlag,
                useFixedFractionDigits: valueKey === VALUE_KEY_CUSTOMER_REF_PRICE ?
                isFixedFractionDigits(pricingData.perWeightFlag, pricingData.priceSource, pricingData.grossPrice) : false
            })}</div>
            <div className="unit-block">
                { insertDivider && <div className="divider"/>}
                <div className="unit">/ {getPriceUnit(pricingData)}</div>
            </div>
        </div>
        {label === LABEL_CUSTOMER_NET_PRICE ? <div className="price-source">Source: <strong>{pricingData.priceSourceName}</strong></div> : null}
    </section>
);

const renderPricePoints = (priceBarMetaDataList, pricingData) =>
    priceBarMetaDataList.map(pricePointMetaData => renderPricePoint(pricePointMetaData, pricingData));

function PriceBar(props) {
  const { priceData: { pricePoints, product: { splitFlag, perWeightFlag, priceSourceName } } } = props;
  return (
    <div className="price-bar">
        <div className="price-bar-divider"/>
        {renderPricePoints(META_DATA_PRICE_BAR, { ...pricePoints, splitFlag, perWeightFlag, priceSourceName })}
    </div>
  );
}

export default PriceBar;

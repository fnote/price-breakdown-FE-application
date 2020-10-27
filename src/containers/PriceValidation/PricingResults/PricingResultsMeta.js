import React from "react";
import { Tooltip } from "antd";
import { formatBusinessUnit } from "../../../utils/CommonUtils";

function renderItemInfo({ id, name, brand, pack, size, stockIndicator, catchWeightIndicator, averageWeight }) {
  return (
      <section className="item-info">
        <div className="item-info-block">
          <div className="block">
            <label>Item</label>
            <div className="value bold">{id}</div>
            <Tooltip title={name} color="blue">
              <div className="value full-width-ellipsis">
                {name}
              </div>
            </Tooltip>
          </div>
          <div className="block row">
            <div className="sub-block">
              <label>BRAND</label>
              <Tooltip title={brand} color="blue">
                <div className="value brand">{brand}</div>
              </Tooltip>
            </div>
            <div className="sub-block">
              <label>PACK</label>
              <div className="value">{pack}</div>
            </div>
            <div className="sub-block">
              <label>SIZE</label>
              <div className="value">{size}</div>
            </div>
          </div>
          <div className="block row">
            <div className="sub-block">
              <label>STOCK</label>
              <div className="value">{stockIndicator}</div>
            </div>
            <div className="sub-block">
              <label>CATCH WEIGHT</label>
              <div className="value">{catchWeightIndicator}</div>
            </div>
            <div className="sub-block">
              <label>AVG WEIGHT</label>
              <div className="value">{averageWeight}</div>
            </div>
          </div>
        </div>
      </section>
  );
}

function renderSiteInfo({ businessUnitNumber, customerAccount, customerName, customerType, priceZone }, { businessUnitMap }) {
  const site = formatBusinessUnit(businessUnitNumber, businessUnitMap);
  return (
      <section className="site-info">
        <div className="block">
          <label>Site</label>
          <Tooltip title={site} color="blue">
            <div className="value bold full-width-ellipsis">
              {site}
            </div>
          </Tooltip>
        </div>
        <div className="block row">
          <div className="sub-block">
            <label>CUSTOMER</label>
            <div className="value bold">{customerAccount}</div>
          </div>
          <div className="sub-block">
            <label>TYPE</label>
            <div className="value bold">{customerType}</div>
          </div>
          <div className="sub-block">
            <label>PRICE ZONE</label>
            <div className="value bold">{priceZone}</div>
          </div>
        </div>
        <div className="block custname">
          <Tooltip title={customerName} color="blue">
            <div className="value full-width-ellipsis">
              {customerName}
            </div>
          </Tooltip>
        </div>
      </section>
  );
}

function renderOrderInfo({ priceRequestDate, quantity, splitStatus }) {
  return (
      <section className="order-info">
        <div className="block">
          <label>Date</label>
          <div className="value bold">{priceRequestDate}</div>
        </div>
        <div className="block">
          <label>QTY</label>
          <div className="value bold">{quantity}</div>
        </div>
        <div className="block">
          <label>Split</label>
          <div className="value bold">{splitStatus}</div>
        </div>
      </section>
  );
}

function PricingResultsMeta(props) {
  console.log("########################");
  console.log(props);
  const { priceData, userData } = props;
  return (
    <div className="pricing-result-meta">
      { renderItemInfo(priceData.item) }
      { renderSiteInfo(priceData.site, userData) }
      { renderOrderInfo(priceData.order) }
    </div>
  );
}

export default PricingResultsMeta;

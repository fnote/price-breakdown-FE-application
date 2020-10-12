import React from "react";
import { Tooltip } from "antd";
import sampleitemimage from "../../../styles/images/sampleitemimage.png";

function PricingResultsMeta() {
  return (
    <div className="pricing-result-meta">      
      <section className="item-info">
        <div
          className="item-image"
          style={{ backgroundImage: "url(" + sampleitemimage + ")" }}></div>

        <div className="item-info-block">
          <div className="block">
            <label>Item</label>
            <div className="value bold">452332</div>
            <Tooltip title="Cookie Choc Filled Trpl IW" color="blue">
              <div className="value full-width-ellipsis">
                Cookie Choc Filled Trpl IW
              </div>
            </Tooltip>
          </div>
          <div className="block row">
            <div className="sub-block">
              <label>BRAND</label>
              <Tooltip title="RICH'S" color="blue">
                <div className="value brand">RICH'S</div>
              </Tooltip>
            </div>
            <div className="sub-block">
              <label>PACK</label>
              <div className="value">120</div>
            </div>
            <div className="sub-block">
              <label>SIZE</label>
              <div className="value">1.7 Oz</div>
            </div>
          </div>
          <div className="block row">
            <div className="sub-block">
              <label>STOCK</label>
              <div className="value">S</div>
            </div>
            <div className="sub-block">
              <label>CATCH WEIGHT</label>
              <div className="value">N</div>
            </div>
            <div className="sub-block">
              <label>AVG WEIGHT</label>
              <div className="value">14.78</div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-info">
        <div className="block">
          <label>Site</label>
          <Tooltip title="067 - SYSCO Food Services of Houston" color="blue">
            <div className="value bold full-width-ellipsis">
              067 - SYSCO Food Services of Houston
            </div>
          </Tooltip>
        </div>
        <div className="block row">
          <div className="sub-block">
            <label>CUSTOMER</label>
            <div className="value bold">055437</div>
          </div>
          <div className="sub-block">
            <label>TYPE</label>
            <div className="value bold">TRS</div>
          </div>
          <div className="sub-block">
            <label>PRICE ZONE</label>
            <div className="value bold">Zone 02-04</div>
          </div>
        </div>
        <div className="block custname">
          <Tooltip title="Mikes Seafood and Grill" color="blue">
            <div className="value full-width-ellipsis">
              Mikes Seafood and Grill
            </div>
          </Tooltip>
        </div>
      </section>

      <section className="order-info">
        <div className="block">
          <label>Date</label>
          <div className="value bold">07 Mar 2020</div>
        </div>
        <div className="block">
          <label>QTY</label>
          <div className="value bold">12</div>
        </div>
        <div className="block">
          <label>Split</label>
          <div className="value bold">N</div>
        </div>
      </section>
    </div>
  );
}

export default PricingResultsMeta;

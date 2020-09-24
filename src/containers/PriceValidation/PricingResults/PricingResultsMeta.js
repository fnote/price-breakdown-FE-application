import React from "react";
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
            <div className="value">Cookie Choc Filled Trpl IW</div>
          </div>
          <div className="block row">
            <div className="sub-block">
              <label>BRAND</label>
              <div className="value">RICH'S</div>
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
          <div className="value bold">067 - SYSCO Food Services of Houston</div>
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
          <div className="value">Mikes Seafood and Grill</div>
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

import React from "react";

function PriceBar() {
  return (
    <div className="price-bar">
      <div className="price-bar-divider"></div>
      <section className="group1">
        <label>LOCAL SEGMENT REFERENCE PRICE</label>
        <div className="price-block">
          <div className="value">61.00</div>
          <div className="unit-block">
            <div className="divider"></div>
            <div className="unit">/ case</div>
          </div>
        </div>
      </section>
      <section className="group2">
        <label>STRIKE THROUGH PRICE</label>
        <div className="price-block">
          <div className="value">58.36</div>
          <div className="unit-block">
            <div className="divider"></div>
            <div className="unit">/ case</div>
          </div>
        </div>
      </section>
      <section className="group3">
        <label>DISCOUNT PRICE</label>
        <div className="price-block">
          <div className="value">57.19</div>
          <div className="unit-block">
            <div className="divider"></div>
            <div className="unit">/ case</div>
          </div>
        </div>
      </section>
      <section className="group4 pad-right">
        <label>ORDER UNIT PRICE</label>
        <div className="price-block">
          <div className="value">57.19</div>
          <div className="unit-block">
            <div className="divider"></div>
            <div className="unit">/ case</div>
          </div>
        </div>
      </section>
      <section className="main-price">
        <label>CUSTOMER NET PRICE</label>
        <div className="price-block">
          <div className="value">52.79</div>
          <div className="unit-block">            
            <div className="unit">/ case</div>
          </div>
        </div>
        <div className="price-source">Source: <strong>Price Advisor</strong></div>
      </section>
    </div>
  );
}

export default PriceBar;

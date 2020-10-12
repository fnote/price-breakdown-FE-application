import React from "react";

function PriceBar() {
  return (
    <div className="price-bar">
      <div className="price-bar-divider"></div>
      <section className="group1">
        <label>LOCAL SEGMENT REFERENCE PRICE</label>
        <div className="price-block">
          <div className="value">22.00</div>
          <div className="unit-block">
            <div className="divider"></div>
            <div className="unit">/ case</div>
          </div>
        </div>
      </section>
      <section className="group2">
        <label>STRIKE THROUGH PRICE</label>
        <div className="price-block">
          <div className="value">21.98</div>
          <div className="unit-block">
            <div className="divider"></div>
            <div className="unit">/ case</div>
          </div>
        </div>
      </section>
      <section className="group3">
        <label>DISCOUNT PRICE</label>
        <div className="price-block">
          <div className="value">18.925</div>
          <div className="unit-block">
            <div className="divider"></div>
            <div className="unit">/ case</div>
          </div>
        </div>
      </section>
      <section className="group4 pad-right">
        <label>ORDER UNIT PRICE</label>
        <div className="price-block">
          <div className="value">20.698</div>
          <div className="unit-block">
            <div className="divider"></div>
            <div className="unit">/ case</div>
          </div>
        </div>
      </section>
      <section className="main-price">
        <label>CUSTOMER NET PRICE</label>
        <div className="price-block">
          <div className="value">18.686</div>
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

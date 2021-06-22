import React from "react";
import {Select , DatePicker} from 'antd'
export default function PrizeZoneHeader() {
  return (
    <div className="pz-header">
      <div className="pz-header-title"></div>
      <div className="pz-tab-section">
        <div className="pz-tabs">
          <div className="pz-tab-items">
            <div className="pz-text-wrapper">
              <div className="pz-tab-items-top">OPCO</div>
              <div className="pz-tab-items-bottom">043-Houston</div>
            </div>
          </div>
        </div>
        <div className="pz-tabs pz-tabs-combine">
          <div className="pz-tabs-combine-l">
            <div className="pz-tab-items">
              <div className="pz-tab-items-top">CUSTOMER GROUP</div>
              <div className="pz-tab-items-bottom">
                <span className="pz-cutomer-grp-text">31223</span>
              </div>
            </div>
          </div>
          <div className="pz-tabs-combine-r">
            <div className="pz-tab-items">
              <div className="pz-tab-items-top">ATTRIBUTE GROUP</div>
              <div className="pz-tab-items-bottom">
                <span className="pz-item-grp-text">Milk</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pz-tabs">
          <div className="pz-tab-items">
            <div className="pz-text-wrapper">
              <div className="pz-tab-items-top">PRICE ZONE</div>
              <div className="pz-tab-items-bottom">
              <Select
                placeholder="Select Pricezone"
                dropdownMatchSelectWidth={false}
                showSearch
              ></Select>
              </div>
            </div>
          </div>
        </div>
        <div className="pz-tabs pz-separator">
          <div className="pz-tab-items">
            <div className="pz-text-wrapper">
              <div className="pz-tab-items-top">EFFECTIVE DATE ( mon )</div>
              <div className="pz-tab-items-bottom"><DatePicker/></div>
            </div>
          </div>
        </div>
        <div className="pz-tabs">
          <div className="pz-tab-items">
            <div className="pz-text-wrapper">
              <div className="pz-tab-items-top">
             
              </div>
              <div className="pz-tab-items-bottom">
              <button
                type="primary"
                htmlType="submit"
                className="search-btn outlined-btn"
              >
                SUBMIT CHANGE
              </button>
                <div className="pz-review-reminder">
                Will be sent for review
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

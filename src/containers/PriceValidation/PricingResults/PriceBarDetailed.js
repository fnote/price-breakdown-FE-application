import React from "react";
import PriceBarDetailedHeader from "./PriceBarDetailedHeader";

function PriceBarDetailed() {
  return (
    <div className="price-bar-detailed">
      <div className="price-bar-divider"></div>

      <section className="detailed-left">
        <PriceBarDetailedHeader />
        <div className="block group1">
          <div className="icon-col">
            <i className="icon fi flaticon-diamond" />
          </div>
          <div className="data-fields">
            <div className="row">
              <div className="description-col colspan-2">
                <div className="title">
                  Local Segment Reference Price (Gross)
                </div>
                <div className="sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
                <div className="small-divider"></div>
              </div>
              <div className="calculated-col">$61.00</div>
            </div>
            <div className="row sub-row">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  Strategic Discount
                </div>
              </div>
              <div className="adjustment-col">- $0.220 /case</div>
              <div className="calculated-col">- $0.88</div>
              <div className="source-col">Price Advisor</div>
            </div>
            <div className="row sub-row">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  Rounding
                </div>
              </div>
              <div className="adjustment-col">-</div>
              <div className="calculated-col">$0.005</div>
              <div className="source-col">System</div>
            </div>
          </div>
        </div>
        <div className="block group2">
          <div className="icon-col">
            <i className="icon fi flaticon-diamond" />
          </div>
          <div className="data-fields">
            <div className="row">
              <div className="description-col">
                <div className="title">Strike Through Price</div>
                <div className="sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
                <div className="small-divider"></div>
              </div>
              <div className="adjustment-col">- 1.500%</div>
              <div className="calculated-col">- $0.88</div>
            </div>
            <div className="row sub-row not-applied">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-close" />
                  Pre-Qualified Discounts (Not Applied)
                </div>
              </div>
              <div className="adjustment-col">- $0.100 /case</div>
              <div className="calculated-col">- $1.20</div>
              <div className="source-col">Discount Service</div>
            </div>
            <div className="row sub-row">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  Behavioral Discounts
                </div>
              </div>
              <div className="adjustment-col">- $0.120 /case</div>
              <div className="calculated-col">- $1.44</div>
              <div className="source-col">Discount Service</div>
            </div>
          </div>
        </div>
      </section>

      <div className="price-bar-divider overlap"></div>

      <section className="detailed-right">
        <PriceBarDetailedHeader />
        <div className="block group3">
          <div className="icon-col">
            <i className="icon fi flaticon-diamond" />
          </div>
          <div className="data-fields">
            <div className="row">
              <div className="description-col">
                <div className="title">Discount Price</div>
                <div className="sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
                <div className="small-divider"></div>
              </div>
              <div className="adjustment-col">- $0.220 /case</div>
              <div className="calculated-col">$61.00</div>
            </div>
            <div className="row sub-row">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  Post processing / Legal
                </div>
                <div className="subrow-sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
              </div>
              <div className="adjustment-col">- $0.220 /case</div>
              <div className="calculated-col">- $0.88</div>
              <div className="source-col">Price Advisor</div>
            </div>
            <div className="row sub-row">
              <div className="description-col colspan-2">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  Item/Order Specific promotions
                </div>
                <div className="subrow-sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
              </div>
            </div>
            <div className="row sub-row">
              <ul className="value-table">
                <li>
                  <div className="description-col">0 <span>to</span> 5</div>
                  <div className="adjustment-col">- 0.000%</div>
                  <div className="calculated-col">- $0.000</div> 
                </li>
                <li>
                  <div className="description-col">6 <span>to</span> 10</div>
                  <div className="adjustment-col">- 0.250%</div>
                  <div className="calculated-col">- $0.153</div>
                </li>
                <li className="selected">
                  <div className="description-col">11 <span>to</span> 15</div>
                  <div className="adjustment-col">- 0.500%</div>
                  <div className="calculated-col">- $0.287 </div>
                  <div className="source-col"><i className="icon fi flaticon-tick-1"/> Discount Service</div>
                </li>
                <li>
                  <div className="description-col">16 <span>to</span> 25</div>
                  <div className="adjustment-col">- 0.750%</div>
                  <div className="calculated-col">- $0.458</div>
                </li>
                <li>
                  <div className="description-col">26 <span>and</span> above</div>
                  <div className="adjustment-col">- 1.000%</div>
                  <div className="calculated-col">- $0.610</div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="block group4">
          <div className="icon-col">
            <i className="icon fi flaticon-diamond" />
          </div>
          <div className="data-fields">
            <div className="row">
              <div className="description-col">
                <div className="title">Order Net Price w/o Exceptions</div>
                <div className="sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
                <div className="small-divider"></div>
              </div>
              <div className="adjustment-col">- $3.40</div>
              <div className="calculated-col">-$3.40</div>
            </div>
            <div className="row sub-row">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  OFFL and OFFT
                </div>
                <div className="subrow-sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
              </div>
              <div className="adjustment-col">- $3.40</div>
              <div className="calculated-col">- $3.40</div>
              <div className="source-col">SUS</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PriceBarDetailed;

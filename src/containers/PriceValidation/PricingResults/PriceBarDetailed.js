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
              <div className="description-col">
                <div className="title">
                  Local Segment Reference Price (Gross)
                </div>
                <div className="small-divider"></div>
              </div>
              <div className="value-col">$22.00</div>
            </div>
            <div className="row sub-row">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  Strategic Discount
                </div>
                <div className="subrow-sub-title">Zone 02-04 </div>
                <div className="subrow-sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
              </div>
              <div className="value-col">$21.975</div>              
              <div className="adjustment-col">- $0.220</div>              
            </div>
            <div className="row sub-row">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  Rounding
                </div>
              </div>
              <div className="value-col">-</div>
              <div className="adjustment-col">$0.005</div>
              
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
                <div className="small-divider"></div>
              </div>
              <div className="value-col">$21.980</div>
              <div className="adjustment-col"></div>              
            </div>
            <div className="row sub-row not-applied">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-close" />
                  Pre-Qualified Discounts (Not Applied)
                </div>
                <div className="subrow-sub-title">NEW customer</div>
                <div className="subrow-sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
              </div>
              <div className="value-col">- $3.00</div>                     
              <div className="adjustment-col">- $3.00</div>             
            </div>
            <div className="row sub-row">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  Behavioral Discounts
                </div>
              </div>        
            </div>
            <div className="row sub-row">
              <ul className="value-table">
                <li>
                  <div className="description-col">0 <span>to</span> 3</div>
                  <div className="value-col"> 0.000%</div>
                  <div className="adjustment-col"> $0.000</div>                  
                </li>
                <li className="selected">
                  <div className="description-col">4 <span>to</span> 8</div>
                  <div className="value-col">- 0.250% </div>
                  <div className="adjustment-col">- $0.055</div>                 
                  <div className="tick-col"><i className="icon fi flaticon-tick-1"/></div>
                </li>
                <li>
                  <div className="description-col">9 <span>to</span> 12</div>
                  <div className="value-col">- 0.500%</div>
                  <div className="adjustment-col">- $0.110</div>                  
                </li>
                <li>
                  <div className="description-col">13 <span>and</span> above</div>
                  <div className="value-col">- 0.750%</div>
                  <div className="adjustment-col">- $0.165</div>                  
                </li>
              </ul>
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
                <div className="small-divider"></div>
              </div>
              <div className="value-col">$18.925</div>
              <div className="adjustment-col"></div>
            </div>           

            <div className="row sub-row">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  Item/Order Specific promotions
                </div>
                <div className="subrow-sub-title">123948 Bottle</div>
                <div className="subrow-sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
              </div>
              <div className="value-col">- 1.200%</div>
              <div className="adjustment-col">- $0.227</div>
            </div>
            <div className="row sub-row">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  Post processing / Legal
                </div>
                <div className="subrow-sub-title">51478 complmentary item</div>
                <div className="subrow-sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
              </div>
              <div className="value-col">$2.000</div>
              <div className="adjustment-col">$2.000</div>
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
                <div className="title">Order Unit Price</div>
                <div className="small-divider"></div>
              </div>
              <div className="value-col">$20.698</div>
              <div className="adjustment-col"></div>              
            </div>
            <div className="row sub-row">
              <div className="description-col">
                <div className="subrow-title">
                  <i className="icon fi flaticon-circle" />
                  Off-invoice Adjustment
                </div>
                <div className="subrow-sub-title">129343 Line Discount</div>
                <div className="subrow-sub-title">Valid 01 Jul 2020 - 7 Jul 2020 </div>
              </div>
              <div className="value-col">- $2.012</div>
              <div className="adjustment-col">- $2.012</div>              
            </div>
          </div>
        </div>

        <div className="block group5">
          <div className="icon-col">
            <i className="icon fi flaticon-diamond" />
          </div>
          <div className="data-fields">
            <div className="row">
              <div className="description-col">
                <div className="title">Customer Net Price</div>                
              </div>
              <div className="value-col">$18.686</div>
              <div className="adjustment-col"></div>              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PriceBarDetailed;

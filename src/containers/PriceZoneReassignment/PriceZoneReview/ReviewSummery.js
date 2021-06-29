import React from 'react';
import {ExclamationCircleOutlined} from '@ant-design/icons'

export default function ReviewSummery({ changeSummary: {
  businessUnit,
  newPriceZone,
  effectiveFromDate,
  customerGroup,
  customerAccount,
  itemAttributeGroup,
  itemAttributeGroupId
} }) {
  return (
    <div className="pz-review-wrapper pz-cursor">
    <div className="pz-review-sum-left">
      <div className="pz-review-sum-left-pz">
        <span className="pz-caps">pricezone</span>
        <div className="pz-review-sum-zone">
          <div className="pz-zone-wrapper">
            <div className="pz-zone-from-to-base">
              <div className="pz-zone-from">2</div>
              <div className="pz-zone-separator"></div>
              <div className="pz-zone-to">{newPriceZone}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="pz-review-sum-left-opco">
        <span className="pz-caps">opco</span>
        <div className="pz-review-sum-left-opco">
          <div className="pz-review-opco">{businessUnit}</div>
        </div>
      </div>
    </div>
    <div className="pz-review-sum-right">
      <div className="pz-review-right-wrapper">
        <div className="pz-right-top">
          <div className="pz-effective-date-text pz-caps">effective date</div>
          <div className="pz-effective-date pz-main-text">{effectiveFromDate}</div>
        </div>
        <div className="pz-right-bottom">
          <div className="pz-right-bottom-left">
            {1 == 2 ? (
              <>
                <div className="pz-effective-date-text pz-caps">customer group</div>
                <div className="pz-effective-date pz-customer-tag">
                {customerGroup}
                </div>
                <div className="pz-customer-total">241 customers</div>
              </>
            ) : (
              <>
                <div className="pz-effective-date-text pz-caps ">customer</div>
                <div className="pz-effective-date">
                  055437
                </div>
               
              </>
            )}
          </div>
          <div className="pz-right-bottom-right">
          
            <div className="pz-effective-date-text pz-caps">attribute group</div>
            <div className="pz-attrib-base">
            <div className="pz-effective-date pz-attribute-tag">{itemAttributeGroup}</div> <ExclamationCircleOutlined className="pz-attrib-info" />
            </div>
            <div className="pz-attrib-total">341 items</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

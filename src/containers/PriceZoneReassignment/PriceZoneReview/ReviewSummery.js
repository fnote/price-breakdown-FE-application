import React from 'react';

export default function ReviewSummery({ changeSummary: {
  businessUnit,
  newPriceZone,
  effectiveFromDate,
  customerGroup,
  customerAccount,
  itemAttributeGroup
} }) {
  const renderCustomerInfo = () => {
    if (customerAccount && !customerGroup) {
      return (
        <>
          <div className="pz-effective-date-text ">CUSTOMER</div>
          <div className="pz-effective-date">{customerAccount}</div>
        </>
      );
    }
    return (
      <>
        <div className="pz-effective-date-text ">CUSTOMER GROUP</div>
        <div className="pz-effective-date pz-customer-tag">{customerGroup}</div>
      </>
    );
  };

  return (
    <div className="pz-review-wrapper pz-cursor">
      <div className="pz-review-sum-left">
        <div className="pz-review-sum-left-pz">
          <span>PRICE ZONE</span>
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
          <span>OPCO</span>
          <div className="pz-review-sum-left-opco">
            <div className="pz-review-opco">{businessUnit}</div>
          </div>
        </div>
      </div>
      <div className="pz-review-sum-right">
        <div className="pz-review-right-wrapper">
          <div className="pz-right-top">
            <div className="pz-effective-date-text">EFFECTIVE DATE</div>
            <div className="pz-effective-date">{effectiveFromDate}</div>
          </div>
          <div className="pz-right-bottom">
            <div className="right-bottom-left">
              {renderCustomerInfo()}
            </div>
            <div className="right-bottom-right">
              <div className="pz-effective-date-text">ATTRIBUTE GROUP</div>
              <div className="pz-effective-date pz-attribute-tag">{itemAttributeGroup}</div>
            </div>            
          </div>
        </div>
      </div>
    </div>
  );
}

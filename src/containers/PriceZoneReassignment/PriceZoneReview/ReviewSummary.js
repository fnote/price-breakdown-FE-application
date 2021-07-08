import React from 'react';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';

export default function ReviewSummary({
                                          changeSummary: {
                                              businessUnit, newPriceZone, oldPriceZone, effectiveFromDate, customerGroup,
                                              customerAccount, itemAttributeGroup, customerCount, supcCount
                                          }
                                      }) {
    return (
        <div className="pz-review-wrapper pz-cursor">
            <div className="pz-review-sum-left">
                <div className="pz-review-sum-left-pz">
                    <span id="price-zone" className="pz-caps">price zone</span>
                    <div className="pz-review-sum-zone">
                        <div className="pz-zone-wrapper">
                            <div className="pz-zone-from-to-base">
                                <div id="old-price-zone" className="pz-zone-from">{oldPriceZone}</div>
                                <div className="pz-zone-separator"/>
                                <div id="new-price-zone" className="pz-zone-to">{newPriceZone}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pz-review-sum-left-opco">
                    <span id="opco" className="pz-caps">opco</span>
                    <div className="pz-review-sum-left-opco">
                        <Tooltip id="tooltip-opco" itle={businessUnit} color="#fff" overlayClassName="pz-tooltip"
                                 overlayStyle={{color: '#000'}}>
                            <div id="business-unit" className="pz-review-opco">{businessUnit}</div>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className="pz-review-sum-right">
                <div className="pz-review-right-wrapper">
                    <div className="pz-right-top">
                        <div id="effective-date" className="pz-effective-date-text pz-caps">effective date</div>
                        <div id="effective-from-date" className="pz-effective-date pz-main-text">{effectiveFromDate}</div>
                    </div>
                    <div className="pz-right-bottom">
                        <div className="pz-right-bottom-left">
                            {customerGroup ? (
                                <>
                                    <div id="customer-group" className="pz-effective-date-text pz-caps">customer group</div>
                                    <div id="customer-group" className="pz-effective-date pz-customer-tag">
                                        {customerGroup}
                                    </div>
                                    <div id="cutomers" className="pz-customer-total">{customerCount} customers</div>
                                </>
                            ) : (
                                <>
                                    <div id="customer" className="pz-effective-date-text pz-caps ">customer</div>
                                    <div id="customer-account" className="pz-effective-date">
                                        {customerAccount}
                                    </div>

                                </>
                            )}
                        </div>
                        <div className="pz-right-bottom-right">
                            <div id="customer-group" className="pz-effective-date-text pz-caps">attribute group</div>
                            <div className="pz-attrib-base">
                                <div id="item-attribute-group" className="pz-effective-date pz-attribute-tag">{itemAttributeGroup}</div>
                                <ExclamationCircleOutlined id="exclamanation-circle-icon" className="pz-attrib-info"/>
                            </div>
                            <div id="supc-count" className="pz-attrib-total">{supcCount} items</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

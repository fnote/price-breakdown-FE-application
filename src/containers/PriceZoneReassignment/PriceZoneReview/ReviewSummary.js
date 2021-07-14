import React from 'react';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';
import {truncate, autoSize} from '../helper/PZRHelper';

const CURRENT_PRICE_ZONE_TOOLTIP = 'Current price zone of this item attribute group and customer/customer group';

export default function ReviewSummary({
                                          changeSummary: {
                                              businessUnit, newPriceZone, oldPriceZone, effectiveFromDate, customerGroup,
                                              customerAccount, itemAttributeGroup, customerCount, supcCount
                                          }
                                      }) {
    return (
        <div className="pz-review-wrapper pz-review-middle pz-cursor">
            <div className="pz-review-sum-left">
                <div className="pz-review-sum-left-pz">
                    <span id="price-zone" className="pz-caps">price zone</span>
                    <div className="pz-review-sum-zone">
                        <div className="pz-zone-wrapper">
                            <div className="pz-zone-from-to-base">
                                <Tooltip title={CURRENT_PRICE_ZONE_TOOLTIP} color="#fff" overlayClassName="pz-tooltip"
                                         overlayStyle={{color: '#000'}}>
                                    <div id="old-price-zone" className="pz-zone-from">{oldPriceZone}</div>
                                </Tooltip>
                                <div className="pz-zone-separator"/>
                                <div id="new-price-zone" className="pz-zone-to">{newPriceZone}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pz-review-sum-left-opco">
                    <span id="opco" className="pz-caps">site</span>
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
                        <div id="effective-from-date"
                             className="pz-effective-date pz-main-text">{effectiveFromDate}</div>
                    </div>
                    <div className="pz-right-bottom">
                        <div className="pz-right-bottom-left">
                            {customerGroup ? (
                                <>
                                    <div id="customer-group" className="pz-effective-date-text pz-caps">customer group</div>
                                    <Tooltip title={customerGroup} color="#fff" overlayClassName="pz-tooltip" overlayStyle={{color: '#000'}}>
                                        <div id="customer-group" className="pz-effective-date pz-customer-tag" style={{fontSize: autoSize(customerGroup)}}>
                                            {truncate(customerGroup, 15)}
                                        </div>
                                    </Tooltip>
                                    <div id="cutomers" className="pz-customer-total">{customerCount} customers</div>
                                </>
                            ) : (
                                <>
                                    <div id="customer" className="pz-effective-date-text pz-caps ">customer</div>
                                    <Tooltip title={customerAccount} color="#fff" overlayClassName="pz-tooltip" overlayStyle={{color: '#000'}}>
                                        <div id="customer-account" className="pz-effective-date" style={{fontSize: autoSize(customerAccount)}}>
                                            {truncate(customerAccount, 15)}
                                        </div>
                                    </Tooltip>
                                </>
                            )}
                        </div>
                        <div className="pz-right-bottom-right">
                            <div id="customer-group" className="pz-effective-date-text pz-caps">attribute group</div>
                            <div className="pz-attrib-base">
                                <Tooltip title={itemAttributeGroup} color="#fff" overlayClassName="pz-tooltip"
                                         overlayStyle={{color: '#000'}}>
                                    <div id="item-attribute-group"
                                        className="pz-effective-date pz-attribute-tag" style={{fontSize: autoSize(itemAttributeGroup)}}>
                                        {truncate(itemAttributeGroup, 30)}
                                    </div>
                                </Tooltip>
                                <ExclamationCircleOutlined className="pz-attrib-info"/>
                            </div>
                            <div id="supc-count" className="pz-attrib-total">{supcCount} items</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

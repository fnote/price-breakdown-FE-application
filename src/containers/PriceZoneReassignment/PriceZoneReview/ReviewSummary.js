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
                    <span className="pz-caps">price zone</span>
                    <div className="pz-review-sum-zone">
                        <div className="pz-zone-wrapper">
                            <div className="pz-zone-from-to-base">
                            <Tooltip title={oldPriceZone} color="#fff" overlayClassName="pz-tooltip"
                                 overlayStyle={{color: '#000'}}>
                                <div className="pz-zone-from">{oldPriceZone}</div>
                                </Tooltip>
                                <div className="pz-zone-separator"/>
                                <div className="pz-zone-to">{newPriceZone}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pz-review-sum-left-opco">
                    <span className="pz-caps">opco</span>
                    <div className="pz-review-sum-left-opco">
                        <Tooltip title={businessUnit} color="#fff" overlayClassName="pz-tooltip"
                                 overlayStyle={{color: '#000'}}>
                            <div className="pz-review-opco">{businessUnit}</div>
                        </Tooltip>
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
                            {customerGroup ? (
                                <>
                                    <div className="pz-effective-date-text pz-caps">customer group</div>
                                    <div className="pz-effective-date pz-customer-tag">
                                        {customerGroup}
                                    </div>
                                    <div className="pz-customer-total">{customerCount} customers</div>
                                </>
                            ) : (
                                <>
                                    <div className="pz-effective-date-text pz-caps ">customer</div>
                                    <div className="pz-effective-date">
                                        {customerAccount}
                                    </div>

                                </>
                            )}
                        </div>
                        <div className="pz-right-bottom-right">
                            <div className="pz-effective-date-text pz-caps">attribute group</div>
                            <div className="pz-attrib-base">
                                <div className="pz-effective-date pz-attribute-tag">{itemAttributeGroup}</div>
                                <ExclamationCircleOutlined className="pz-attrib-info"/>
                            </div>
                            <div className="pz-attrib-total">{supcCount} items</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

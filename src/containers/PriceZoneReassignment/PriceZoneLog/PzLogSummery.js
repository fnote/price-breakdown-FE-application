import React from 'react'
import {autoSize, truncate} from '../helper/PZRHelper'
import {Tooltip , Popover} from 'antd';
import PzPopover from './PzPopover';

const CURRENT_PRICE_ZONE_TOOLTIP = 'Current price zone of this item attribute group and customer/customer group';


const showCustomerDetails = (customerAccount, customerGroup, id) => {
    if(customerGroup && customerAccount){
        return (
            <>
            <div id="customer" className="pz-effective-date-text pz-caps pz-log-customer-group">customer</div>
            <Popover content={<PzPopover id={id} customerGroup={customerGroup} customerAccount ={customerAccount}/>}  trigger="click" id={id}>
                <div id="customer-account" className="pz-effective-date pz-customer-tag" style={{fontSize: autoSize('lorem')}}>
                    {truncate(customerAccount, 15)}
                </div>
            </Popover>
        </>)
    }
    if (customerGroup){
        return (
            <>
            <div id="customer-group" className="pz-effective-date-text pz-caps pz-log-customer-group">customer Group</div>
            <Popover content={<PzPopover id={id} customerGroup={customerGroup} customerAccount ={customerAccount}/>}  trigger="click" id={id}>
                <div id="customer-group" className="pz-effective-date pz-customer-tag" style={{fontSize: autoSize('31223')}}>
                    {truncate(customerGroup, 15)}
                </div>
            </Popover>
        </>
        )
    } else {
        return (
            <>
                <div id="customer" className="pz-effective-date-text pz-caps pz-log-customer-group">customer</div>
                    <div id="customer-account" className="pz-effective-date pz-customer-tag" style={{fontSize: autoSize('lorem')}}>
                        {truncate(customerAccount, 15)}
                    </div>
            </>
        )
    }
};

export default function PzLogSummery({
                                         changeSummary: {
                                             businessUnit, newPriceZone, oldPriceZone, effectiveFromDate, exportedEffectiveFromDate, customerGroup,
                                             customerAccount, businessCenterItemAttributeGroup, customerCount, supcCount, id
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
                    <Tooltip id="tooltip-opco" title={businessUnit} color="#fff" overlayClassName="pz-tooltip"
                             overlayStyle={{color: '#000'}}>
                        <div id="business-unit" className="pz-review-opco">{businessUnit}</div>
                    </Tooltip>
                </div>
            </div>
        </div>
        <div className="pz-review-sum-right">
            <div className="pz-review-right-wrapper">
                <div className="pz-right-top">
                    <div className="pz-effective-wrapper">
                        <div id="effective-date" className="pz-effective-date-text pz-caps">effective date</div>
                        <div id="exported-effective-from-date"
                            className="pz-effective-date pz-main-text">{exportedEffectiveFromDate}</div>
                    </div>

                </div>
                <div className="pz-right-bottom">
                    <div className="pz-right-bottom-left">
                        {showCustomerDetails(customerAccount, customerGroup, id)}
                    </div>
                    <div className="pz-right-bottom-right">
                        <div id="attribute-group" className="pz-effective-date-text pz-caps">attribute group</div>
                        <div className="pz-attrib-base">
                            <Tooltip title={businessCenterItemAttributeGroup} color="#fff" overlayClassName="pz-tooltip"
                                     overlayStyle={{color: '#000'}}>
                                <div id="item-attribute-group"
                                    className="pz-effective-date pz-attribute-tag">
                                    {truncate(businessCenterItemAttributeGroup, 60)}
                                </div>
                            </Tooltip>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

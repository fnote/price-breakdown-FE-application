import React from 'react'
import { autoSize, truncate } from '../helper/PZRHelper'
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';

export default function PzLogSummery() {
    return (
        <div className="pz-review-wrapper pz-review-middle pz-cursor">
        <div className="pz-review-sum-left">
            <div className="pz-review-sum-left-pz">
                <span id="price-zone" className="pz-caps">price zone</span>
                <div className="pz-review-sum-zone">
                    <div className="pz-zone-wrapper">
                        <div className="pz-zone-from-to-base">
                            <Tooltip title='' color="#fff" overlayClassName="pz-tooltip"
                                     overlayStyle={{color: '#000'}}>
                                <div id="old-price-zone" className="pz-zone-from">02</div>
                            </Tooltip>
                            <div className="pz-zone-separator"/>
                            <div id="new-price-zone" className="pz-zone-to">04</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pz-review-sum-left-opco">
                <span id="opco" className="pz-caps">site</span>
                <div className="pz-review-sum-left-opco">
                    <Tooltip id="tooltip-opco" title={'lorem'} color="#fff" overlayClassName="pz-tooltip"
                             overlayStyle={{color: '#000'}}>
                        <div id="business-unit" className="pz-review-opco">043-Houston</div>
                    </Tooltip>
                </div>
            </div>
        </div>
        <div className="pz-review-sum-right">
            <div className="pz-review-right-wrapper">
                <div className="pz-right-top">
                    <div className="pz-effective-wrapper">
                        <div id="effective-date" className="pz-effective-date-text pz-caps">effective date</div>
                        <div id="effective-from-date"
                            className="pz-effective-date pz-main-text">21 Jun 2021</div>
                    </div>
                   
                </div>
                <div className="pz-right-bottom">
                    <div className="pz-right-bottom-left">
                        {1==1 ? (
                            <>
                                <div id="customer-group" className="pz-effective-date-text pz-caps">customer group</div>
                                <Tooltip title={'customerGroup'} color="#fff" overlayClassName="pz-tooltip" overlayStyle={{color: '#000'}}>
                                    <div id="customer-group" className="pz-effective-date pz-customer-tag" style={{fontSize: autoSize('31223')}}>
                                        {truncate('customerGroup', 15)}
                                    </div>
                                </Tooltip>
                            </>
                        ) : (
                            <>
                                <div id="customer" className="pz-effective-date-text pz-caps ">customer</div>
                                <Tooltip title={'lorem'} color="#fff" overlayClassName="pz-tooltip" overlayStyle={{color: '#000'}}>
                                    <div id="customer-account" className="pz-effective-date" style={{fontSize: autoSize('lorem')}}>
                                        {truncate('lorem', 15)}
                                    </div>
                                </Tooltip>
                            </>
                        )}
                    </div>
                    <div className="pz-right-bottom-right">
                        <div id="customer-group" className="pz-effective-date-text pz-caps">attribute group</div>
                        <div className="pz-attrib-base">
                            <Tooltip title={'lorem'} color="#fff" overlayClassName="pz-tooltip"
                                     overlayStyle={{color: '#000'}}>
                                <div id="item-attribute-group"
                                    className="pz-effective-date pz-attribute-tag">
                                    {truncate('lorem', 60)}
                                </div>
                            </Tooltip>
                            <ExclamationCircleOutlined className="pz-attrib-info"/>
                        </div>
                     
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

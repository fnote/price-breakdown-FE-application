// Core
import React, {useContext, useState} from 'react';
import {Select, DatePicker, Tooltip} from 'antd';
import moment from 'moment';
// Custom Components
import useModal from '../../../hooks/useModal';
import {ModalComponent, SubmitReason, SubmitSuccess, LoadingState, ErrorInfoModal} from './PZRHeaderModal';
// Context
import {UserDetailContext} from '../../UserDetailContext';
import {PZRContext} from '../PZRContext';
// Request handlers
import {submitPriceZoneChangeRequest} from '../handlers/PZRChangeSubmitHandler';
// Helper functions and constants
import {getPriceZoneOptions, disabledDate, truncate, autoSize} from '../helper/PZRHelper';
import {CIPZ_API_DATE_FORMAT} from '../../../constants/PZRConstants';

const EFFECTIVE_DATE_TOOLTIP_VALUE = 'New effective date for the Price Zone reassignment';
const NEW_PRICE_ZONE_TOOLTIP_VALUE = 'New Price Zone for customer/customer group & business center - item group - attribute group combination';

export default function PrizeZoneHeader() {
    // Constants
    const {Modal, toggle} = useModal();
    const getDefaultEffectiveDate = () => moment().startOf('isoWeek').add(1, 'week'); // Returning next monday as the default
    // Context access
    const PZRContextData = useContext(PZRContext);
    const userDetailContext = useContext(UserDetailContext);
    // States
    const [submitModal, setSubmitModal] = useState(false);
    const [newPriceZone, setNewPriceZone] = useState(0);
    const [referenceId, setReferenceId] = useState(0);
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);
    const [effectiveDate, setEffectiveDate] = useState(getDefaultEffectiveDate().format(CIPZ_API_DATE_FORMAT));
    const [effectiveDay, setEffectiveDay] = useState(getDefaultEffectiveDate().format('ddd'));

    const getCustomerGroupOfCustomer = () => (PZRContextData.searchParams.customerGroup
        ? PZRContextData.searchParams.customerGroup : PZRContextData?.searchResults?.data?.customer_group_id || null);

    const priceZoneChangeHandler = (submissionNote) => {
        const reqParamsToFormBody = {
            PZRContextData,
            userDetailContext,
            submissionNote,
            getCustomerGroupOfCustomer,
            newPriceZone,
            effectiveDate
        };
        submitPriceZoneChangeRequest({setSubmitModal, setReferenceId, reqParamsToFormBody});
    };

    const resetSearch = () => {
        PZRContextData.resetAfterSubmission();
        setSubmitModal(false);
        setReferenceId(0);
    };
    const onPriceZoneChange = (value) => {
        setNewPriceZone(value);
        setSubmitDisabled(false);
    };

    const onDateChange = (effectiveFrom) => {
        setEffectiveDate(effectiveFrom.format(CIPZ_API_DATE_FORMAT));
        setEffectiveDay(effectiveFrom.format('ddd'));
    };

    const renderCustomerGroupComponent = () => (getCustomerGroupOfCustomer() ? (
        <div className="pz-customer-group-bottom">
            <span className="pz-customer-group-bottom-text">Customer Group</span>
            <span
                id="customer-group-of-customer"
                className="pz-customer-group-bottom-tag">{getCustomerGroupOfCustomer()}</span>
        </div>
    ) : (<div/>));

    return (
        <div className="pz-header">
            <div className="pz-header-title"/>
            <div className="pz-tab-section">

                <div className="pz-tabs pz-tabs-combine">
                    <div className="pz-tabs-combine-l">
                        <div className="pz-tab-items">
                            <div className="pz-text-wrapper">
                                <div id="opco-label" className="pz-tab-items-top pz-text-left">SITE</div>
                                <Tooltip
                                    id="opco-tooltip"
                                    title={PZRContextData.searchParams.site}
                                    color="#fff"
                                    overlayClassName="pz-tooltip"
                                    overlayStyle={{color: '#000'}}
                                >
                                    <div
                                        id="site"
                                        className="pz-tab-items-bottom pz-opco-text-bold pz-text-left">
                                        {truncate(PZRContextData.searchParams.site, 24)}
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className="pz-tabs-combine-l">
                        <div id="customer-group-tab" className="pz-tab-items">
                            {PZRContextData.searchParams.customerGroup ? (
                                <>
                                    <div id="customer-group-label" className="pz-tab-items-top pz-text-left">CUSTOMER GROUP</div>
                                    <div className="pz-tab-items-bottom">
                                        <span
                                            id="customer-group"
                                            className="pz-cutomer-grp-text">
                                                {PZRContextData.searchParams.customerGroup}                                               
                                                </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div id="customer-label" className="pz-tab-items-top">CUSTOMER</div>
                                    <div className="pz-tab-items-bottom">
                                        <div
                                            id="customer"
                                            className="pz-cutomer-grp-text-no-bg">
                                            {PZRContextData.searchParams.customer}
                                        </div>
                                        {renderCustomerGroupComponent()}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="pz-tabs-combine-r">
                        <div className="pz-tab-items">
                            <div id="attribute-group-label" className="pz-tab-items-top pz-text-left">ATTRIBUTE GROUP</div>
                            <div className="pz-tab-items-bottom">
                                <Tooltip
                                    id="attribute-group-tooltip"
                                    title={PZRContextData.searchParams.attributeGroup}
                                    color="#fff"
                                    overlayClassName="pz-tooltip"
                                    overlayStyle={{color: '#000'}}
                                >
                                    <span id="attributr-group-tab"
                                          className="pz-item-grp-text"
                                          style={{fontSize: autoSize(PZRContextData.searchParams.attributeGroup)}}>
                                            {truncate(PZRContextData.searchParams.attributeGroup, 87)}
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pz-tabs">
                    <Tooltip
                        id="attribute-group-tooltip"
                        title={NEW_PRICE_ZONE_TOOLTIP_VALUE}
                        color="#fff"
                        overlayClassName="pz-tooltip"
                        overlayStyle={{color: '#000'}}
                    >
                        <div className="pz-tab-items">
                            <div className="pz-text-wrapper">
                                <div id="price-zone-label" className="pz-tab-items-top">PRICE ZONE</div>
                                <div className="pz-tab-items-bottom">
                                    <Select
                                        id="pricezone-dropdown"
                                        placeholder="Select Pricezone"
                                        dropdownMatchSelectWidth={false}
                                        showSearch
                                        onChange={onPriceZoneChange}
                                        className="pz-select"
                                    >
                                        {getPriceZoneOptions()}
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </Tooltip>
                </div>
                <div className="pz-tabs pz-separator">
                    <Tooltip
                        id="attribute-group-tooltip"
                        title={EFFECTIVE_DATE_TOOLTIP_VALUE}
                        color="#fff"
                        overlayClassName="pz-tooltip"
                        overlayStyle={{color: '#000'}}
                    >
                        <div className="pz-tab-items">
                            <div className="pz-text-wrapper">
                                <div className="pz-tab-items-top">EFFECTIVE DATE ( {effectiveDay} )</div>
                                <div className="pz-tab-items-bottom">
                                    <DatePicker
                                        id="date-picker"
                                        defaultValue={getDefaultEffectiveDate}
                                        disabledDate={disabledDate}
                                        allowClear={false}
                                        onChange={onDateChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </Tooltip>
                </div>
                <div className="pz-tabs">
                    <div className="pz-tab-items">
                        <div className="pz-text-wrapper">
                            <div className="pz-tab-items-top"/>
                            <div className="pz-tab-items-bottom">
                                <button
                                    id="search-button"
                                    type="primary"
                                    className={isSubmitDisabled ? ' pz-search-btn outlined-btn pz-disabled' : 'pz-search-btn outlined-btn '}
                                    onClick={() => {
                                        setSubmitModal('warning-modal');
                                        toggle();
                                    }}
                                    disabled={isSubmitDisabled}
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
            {
                {
                    'warning-modal': <ModalComponent Modal={Modal} setSubmitModal={setSubmitModal}/>,
                    'submit-reason': <SubmitReason Modal={Modal} setSubmitModal={setSubmitModal}
                                                   priceZoneChangeHandler={priceZoneChangeHandler} toggle={toggle}/>,
                    'success-modal': <SubmitSuccess Modal={Modal} resetSearch={resetSearch} referenceId={referenceId}/>,
                    'loading': <LoadingState Modal={Modal}/>,
                    'no-eligible-price-zones': <ErrorInfoModal Modal={Modal} setSubmitModal={setSubmitModal} 
                    message= {`Selected business center - item group - attribute group is not eligible for the Price Zone ${newPriceZone}`}/>,
                    'nothing-to-change': <ErrorInfoModal Modal={Modal} setSubmitModal={setSubmitModal}
                    message= {`Nothing to change. All the items in the selected business center - item group - attribute group are already assigned to price zone ${newPriceZone}`}/>,
                }[submitModal]
            }
        </div>
    );
}

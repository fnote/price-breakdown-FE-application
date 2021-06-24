import React, {useContext, useState} from "react";
import {Select, DatePicker, Input} from "antd";
import useModal from "../../../hooks/useModal";
import {WarningFilled} from "@ant-design/icons";
import moment from 'moment';

import {getPriceZoneOptions} from '../PZRHelper';
import {PZRContext} from "../PZRContext";
import {getBffUrlConfig} from "../../../utils/Configs";
import {CORRELATION_ID_HEADER, NOT_APPLICABLE_LABEL} from "../../../constants/Constants";
import {UserDetailContext} from "../../UserDetailContext";

export default function PrizeZoneHeader() {
    const {on, Modal, toggle} = useModal();
    // on is the modal status =>  on || off

    const {TextArea} = Input;

    const getDefaultEffectiveDate = () => {
        // Returning next monday as the default
        return moment().startOf('isoWeek').add(1, 'week');
    };

    const PZRContextData = useContext(PZRContext);
    const userDetailContext = useContext(UserDetailContext);

    const [submitModal, setSubmitModal] = useState(false);
    const [newPriceZone, setNewPriceZone] = useState(0);
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);
    const [effectiveDate, setEffectiveDate] = useState(getDefaultEffectiveDate().format("YYYYMMDD"));
    const [effectiveDay, setEffectiveDay] = useState(getDefaultEffectiveDate().format("ddd"));
    const [submissionReason, setSubmissionReason] = useState('');


    const ModalComponent = () => {
        return (
            <div>
                {Modal(
                    {
                        title: "",
                        centered: "true",
                        onOK: () => setSubmitModal(true),
                        still: true, // modal won't close
                        okText: "PROCEED",
                        cancelText: "CANCEL",
                    },

                    <div className="pz-confirm-pop-base">
                        <div className="alert">
                            <WarningFilled/>
                        </div>
                        <div className="pz-alert-main">Confirm Price Zone Change</div>
                        <div className="pz-alert-sub">
                            While performing this change, price zone for all the items
                            associated with item attribute group and all the customers
                            associated with customer group will be updated.
                        </div>

                    </div>
                )}
            </div>
        );
    };

    const handleResponse = (response) => {
        const correlationId = response.headers.get(CORRELATION_ID_HEADER) || NOT_APPLICABLE_LABEL;
        return response.json().then((json) => {
            if (response.ok) {
                return {success: true, data: json, headers: {[CORRELATION_ID_HEADER]: correlationId}};
            }
            return {success: false, data: json, headers: {[CORRELATION_ID_HEADER]: correlationId}};
        });
    };

    const priceZoneChaneHandler = () => {
        setSubmitModal(false);
        fetch(getBffUrlConfig().pzrUpdateRequestsUrl, {
            method: 'POST',
            body: formRequestBody(),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(handleResponse)
            .then((resp) => {
                if (resp.success) {
                    //TODO: Handle success
                } else {
                    //TODO: Handle failure
                }
                return null;
            })
            .catch((e) => {
                //TODO: Handle error
            });
    };

    const formRequestBody = () => {
        const userDetailsObj = userDetailContext.userDetailsData.userDetails;

        return JSON.stringify({
            businessUnitNumber: PZRContextData.searchParams.opcoId,
            itemAttributeGroup: PZRContextData.searchParams.attributeGroup,
            itemAttributeGroupId: PZRContextData.searchParams.attributeGroupId,
            customerGroup: PZRContextData.searchParams.customerGroup, //TODO: Get this from response
            customerAccount: PZRContextData.searchParams.customer ? PZRContextData.searchParams.customer : null,
            newPriceZone: newPriceZone,
            effectiveFromDate: effectiveDate,
            submissionNote: submissionReason,
            submitter: {
                id: userDetailsObj.username ? userDetailsObj.username : 'blah112',
                givenName: userDetailsObj.firstName ? userDetailsObj.firstName : 'hero',
                surname: userDetailsObj.lastName ? userDetailsObj.lastName : 'honda',
                email: userDetailsObj.email ? userDetailsObj.email : 'blah@sysco.com'
            }
        });
    };

    const SubmitReason = () => {

        const handleChange = (event) => {
            setSubmissionReason(event.target.value)
        };

        return (
            <div>
                {Modal(
                    {
                        title: "",
                        centered: "true",
                        onOK: () => priceZoneChaneHandler(),
                        onCancel: () => setSubmitModal(false),
                        okText: "SUBMIT",
                        cancelText: "CANCEL",
                    },

                    <div className="pz-confirm-pop-base">
                        <div className="pz-alert-sr-main">Submit Reason</div>
                        <div className="pz-alert-sr-sub">
                            Please provide a reason which would be sent to the reviewer as to
                            why this change was submitted.
                        </div>
                        <TextArea
                            className="pz-submit-text-base"
                            placeholder="Submit reason goes here"
                            autoSize={{minRows: 3, maxRows: 5}}
                            maxLength={1500}
                            value={submissionReason}
                            onChange={handleChange}
                        />
                    </div>
                )}
            </div>
        );
    };

    const onPriceZoneChange = (value) => {
        console.log(userDetailContext.userDetailsData);
        setNewPriceZone(value);
        setSubmitDisabled(false);
    };

    const disabledDate = (current) => {
        return current.day() === 0 || current.day() === 6 ||        // Disabling weekends
            current < moment().endOf('day') ||             // Disabling past days
            current > moment().startOf('isoWeek').add(1, 'week');   //Disabling future date after next monday
    };

    const onDateChange = (effectiveFrom) => {
        setEffectiveDate(effectiveFrom.format("YYYYMMDD"));
        setEffectiveDay(effectiveFrom.format("ddd"));
    };

    return (
        <div className="pz-header">
            <div className="pz-header-title"></div>
            <div className="pz-tab-section">
                <div className="pz-tabs">
                    <div className="pz-tab-items">
                        <div className="pz-text-wrapper">
                            <div className="pz-tab-items-top">OPCO</div>
                            <div className="pz-tab-items-bottom">{PZRContextData.searchParams.site}</div>
                        </div>
                    </div>
                </div>
                <div className="pz-tabs pz-tabs-combine">
                    <div className="pz-tabs-combine-l">
                        <div className="pz-tab-items">
                            <div className="pz-tab-items-top">CUSTOMER GROUP</div>
                            <div className="pz-tab-items-bottom">
                                <span className="pz-cutomer-grp-text">{PZRContextData.searchParams.customerGroup}</span>
                            </div>
                        </div>
                    </div>
                    <div className="pz-tabs-combine-r">
                        <div className="pz-tab-items">
                            <div className="pz-tab-items-top">ATTRIBUTE GROUP</div>
                            <div className="pz-tab-items-bottom">
                                <span className="pz-item-grp-text">{PZRContextData.searchParams.attributeGroup}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pz-tabs">
                    <div className="pz-tab-items">
                        <div className="pz-text-wrapper">
                            <div className="pz-tab-items-top">PRICE ZONE</div>
                            <div className="pz-tab-items-bottom">
                                <Select
                                    placeholder="Select PriceZone"
                                    dropdownMatchSelectWidth={false}
                                    showSearch
                                    onChange={onPriceZoneChange}
                                >
                                    {getPriceZoneOptions()}
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pz-tabs pz-separator">
                    <div className="pz-tab-items">
                        <div className="pz-text-wrapper">
                            <div className="pz-tab-items-top">EFFECTIVE DATE ({effectiveDay})</div>
                            <div className="pz-tab-items-bottom">
                                <DatePicker
                                    defaultValue={getDefaultEffectiveDate}
                                    disabledDate={disabledDate}
                                    allowClear={false}
                                    onChange={onDateChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pz-tabs">
                    <div className="pz-tab-items">
                        <div className="pz-text-wrapper">
                            <div className="pz-tab-items-top"></div>
                            <div className="pz-tab-items-bottom">
                                <button
                                    type="primary"
                                    htmlType="submit"
                                    className="search-btn outlined-btn"
                                    onClick={(still) => toggle(still)}
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
            <ModalComponent/>
            {submitModal && <SubmitReason/>}


        </div>
    );
}

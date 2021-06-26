import React, {useContext, useState, useRef} from "react";
import {Select, DatePicker, Input, Tooltip} from "antd";
import useModal from "../../../hooks/useModal";
import moment from 'moment';

import {UserDetailContext} from "../../UserDetailContext";
import {PZRContext} from "../PZRContext";

import {getPriceZoneOptions} from '../PZRUtils/PZRHelper';
import {getBffUrlConfig} from "../../../utils/Configs";
import {CORRELATION_ID_HEADER, NOT_APPLICABLE_LABEL} from "../../../constants/Constants";
import {ReactComponent as Success} from "../../../styles/images/success.svg";
import {ReactComponent as Warning} from "../../../styles/images/warning.svg";

export default function PrizeZoneHeader() {
    const {on, Modal, toggle} = useModal();
    // on is the modal status =>  on || off

    const {TextArea} = Input;

    const [submitModal, setSubmitModal] = useState(false);
    const getDefaultEffectiveDate = () => {
        // Returning next monday as the default
        return moment().startOf('isoWeek').add(1, 'week');
    };

    const PZRContextData = useContext(PZRContext);
    const userDetailContext = useContext(UserDetailContext);

    const [newPriceZone, setNewPriceZone] = useState(0);
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);
    const [effectiveDate, setEffectiveDate] = useState(getDefaultEffectiveDate().format("YYYYMMDD"));
    const [effectiveDay, setEffectiveDay] = useState(getDefaultEffectiveDate().format("ddd"));
    const submissionReasonInput = useRef(null);


    const ModalComponent = () => {
        return (
            <div>
                {Modal(
                    {
                        title: "",
                        centered: "true",
                        onOK: () => setSubmitModal("submit-reason"),
                        still: true, // modal won't close
                        okText: "PROCEED",
                        cancelText: "CANCEL",
                    },

                    <div className="pz-confirm-pop-base">
                        <div className="alert">
                            <Warning className="pz-warning-anim-logo"/>
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

    const priceZoneChangeHandler = () => {
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
                    setSubmitModal("success-modal");
                    PZRContextData.resetAfterSubmission();
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
        const submissionReason = (submissionReasonInput.current && submissionReasonInput.current.state
            && submissionReasonInput.current.state.value) ?
            submissionReasonInput.current.state.value : '';
        console.log(submissionReason);
        return JSON.stringify({
            businessUnitNumber: PZRContextData.searchParams.opcoId,
            itemAttributeGroup: PZRContextData.searchParams.attributeGroup,
            itemAttributeGroupId: PZRContextData.searchParams.attributeGroupId,
            customerGroup: getCustomerGroupOfCustomer(),
            customerAccount: PZRContextData.searchParams.customer ? PZRContextData.searchParams.customer : null,
            newPriceZone: newPriceZone,
            effectiveFromDate: effectiveDate,
            submissionNote: submissionReason,
            submitter: {
                id: userDetailsObj.username ? userDetailsObj.username : 'blah112',  //TODO: Remove this later, test purpose only
                givenName: userDetailsObj.firstName ? userDetailsObj.firstName : 'hero',
                surname: userDetailsObj.lastName ? userDetailsObj.lastName : 'honda',
                email: userDetailsObj.email ? userDetailsObj.email : 'blah@sysco.com'
            }
        });
    };

    const SubmitReason = () => {
        return (
            <div>
                {Modal(
                    {
                        title: "",
                        centered: "true",
                        onOK: () => priceZoneChangeHandler(),
                        onCancel: () => setSubmitModal(false),
                        still: true,
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
                            placeholder="Please insert submit reason here"
                            autoSize={{minRows: 3, maxRows: 5}}
                            maxLength={1500}
                            ref={submissionReasonInput}
                        />
                    </div>
                )}
            </div>
        );
    };

    const SubmitSuccess = () => {
        return (
            <div>
                {Modal(
                    {
                        title: "",
                        centered: "true",
                        onOK: () => setSubmitModal(false),
                        onCancel: () => setSubmitModal(false),
                        okText: "OK",
                        cancelText: "",
                        noCancel: true, // no cancel button
                    },

                    <div className="pz-confirm-pop-base-success">
                        <div className="pz-confirm-wrapper-success">
                            <div className="pz-success-anim">
                                <Success className="pz-success-anim-logo"/>
                            </div>
                            <div className="pz-success-text">Submitted Successfully</div>
                        </div>
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

    const getCustomerGroupOfCustomer = () => {
        if (!PZRContextData.searchResults || !PZRContextData.searchResults.data || !PZRContextData.searchResults.data.customer_group) {
            return null;
        }

        return PZRContextData.searchResults.data.customer_group;
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
                            {PZRContextData.searchParams.customerGroup ? (
                                <>
                                    <div className="pz-tab-items-top">CUSTOMER GROUP</div>
                                    <div className="pz-tab-items-bottom">
                                        <span
                                            className="pz-cutomer-grp-text">{PZRContextData.searchParams.customerGroup}</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="pz-tab-items-top">CUSTOMER</div>
                                    <div className="pz-tab-items-bottom">
                                        <span
                                            className="pz-cutomer-grp-text-no-bg">{PZRContextData.searchParams.customer}
                                        </span>
                                        {getCustomerGroupOfCustomer() ? (
                                            <div className="pz-customer-group-bottom">
                                                <span className="pz-customer-group-bottom-text">Customer Group</span>
                                                <span
                                                    className="pz-customer-group-bottom-tag">{getCustomerGroupOfCustomer()}</span>
                                            </div>
                                        ) : (<div/>)
                                        }
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="pz-tabs-combine-r">
                        <div className="pz-tab-items">
                            <div className="pz-tab-items-top">ATTRIBUTE GROUP</div>
                            <div className="pz-tab-items-bottom">
                                <Tooltip
                                    title={PZRContextData.searchParams.attributeGroup}
                                    color="#fff"
                                    overlayClassName="pz-tooltip"
                                    overlayStyle={{color: "#000"}}
                                >
                                    <span
                                        className="pz-item-grp-text">{PZRContextData.searchParams.attributeGroup}</span>
                                </Tooltip>
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
                </div>
                <div className="pz-tabs pz-separator">
                    <div className="pz-tab-items">
                        <div className="pz-text-wrapper">
                            <div className="pz-tab-items-top">EFFECTIVE DATE ( {effectiveDay} )</div>
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
                                    className={isSubmitDisabled ? "pz-disabled" : "search-btn outlined-btn "}
                                    onClick={toggle}
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
            {
                {
                    "submit-reason": <SubmitReason/>,
                    "success-modal": <SubmitSuccess/>,
                }[submitModal]
            }
        </div>
    );
}

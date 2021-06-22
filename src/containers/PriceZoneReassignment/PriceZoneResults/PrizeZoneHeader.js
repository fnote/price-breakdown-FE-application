import React, { useState } from "react";
import { Select, DatePicker, Input } from "antd";
import useModal from "../../../hooks/useModal";
import { WarningFilled } from "@ant-design/icons";

export default function PrizeZoneHeader() {
  const { on,  Modal, toggle } = useModal();
  // on is the modal status =>  on || off

  const { TextArea } = Input;

const [submitModal , setSubmitModal] = useState(false);

  const ModalComponent = () => {
    return (
      <div>
        {Modal(
          {
            title: "",
            centered: "true",
            onOK: () => setSubmitModal(true),
            still:true, // modal won't close  
            okText: "PROCEED",
            cancelText: "CANCEL",
          },

          <div className="pz-confirm-pop-base">
            <div className="alert">
              <WarningFilled />
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

  const SubmitReason = () => {
    return (
      <div>
        {Modal(
          {
            title: "",
            centered: "true",
            onOK: () => setSubmitModal(false),
            onCancel:()=>setSubmitModal(false),
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
              value={''}
              placeholder="Submit reason goes here"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </div>
        )}
      </div>
    );
  };

 

  return (
    <div className="pz-header">
      <div className="pz-header-title"></div>
      <div className="pz-tab-section">
        <div className="pz-tabs">
          <div className="pz-tab-items">
            <div className="pz-text-wrapper">
              <div className="pz-tab-items-top">OPCO {on ? "on" : "off"}</div>
              <div className="pz-tab-items-bottom">043-Houston</div>
            </div>
          </div>
        </div>
        <div className="pz-tabs pz-tabs-combine">
          <div className="pz-tabs-combine-l">
            <div className="pz-tab-items">
              <div className="pz-tab-items-top">CUSTOMER GROUP</div>
              <div className="pz-tab-items-bottom">
                <span className="pz-cutomer-grp-text">31223</span>
              </div>
            </div>
          </div>
          <div className="pz-tabs-combine-r">
            <div className="pz-tab-items">
              <div className="pz-tab-items-top">ATTRIBUTE GROUP</div>
              <div className="pz-tab-items-bottom">
                <span className="pz-item-grp-text">Milk</span>
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
                ></Select>
              </div>
            </div>
          </div>
        </div>
        <div className="pz-tabs pz-separator">
          <div className="pz-tab-items">
            <div className="pz-text-wrapper">
              <div className="pz-tab-items-top">EFFECTIVE DATE ( mon )</div>
              <div className="pz-tab-items-bottom">
                <DatePicker />
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
                  onClick={(still)=>toggle(still)}
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
      <ModalComponent />
      {submitModal && <SubmitReason/>}
     
     
    </div>
  );
}

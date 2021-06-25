import React, { useState } from "react";
import { Select, DatePicker, Input , Tooltip } from "antd";
import useModal from "../../../hooks/useModal";
import { WarningFilled } from "@ant-design/icons";
import { ReactComponent as Success } from "../../../styles/images/success.svg";

export default function PrizeZoneHeader() {
  const { on, Modal, toggle ,  } = useModal();
  // on is the modal status =>  on || off

  const { TextArea } = Input;

  const [submitModal, setSubmitModal] = useState(false);

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
            onOK: () => setSubmitModal("success-modal"),
            onCancel: () => setSubmitModal(false),
            still: true, // modal won't close
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
              autoSize={{ minRows: 3, maxRows: 5 }}
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
            noCancel:true // no cancel button
            
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
              <Tooltip title="content goes here" color="#fff" overlayClassName="pz-tooltip" overlayStyle={{color:'#000'}}>
                <span className="pz-item-grp-text">Milk</span>
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
                  className="pz-select"
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
                  className="search-btn outlined-btn "
                  // added "pz-disabled" class for the disabled view
                  onClick={toggle}
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

      {
        {
          "submit-reason": <SubmitReason />,
          "success-modal": <SubmitSuccess />,
        }[submitModal]
      }
    </div>
  );
}

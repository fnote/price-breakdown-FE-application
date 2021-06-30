import React, { useRef, useState } from "react";
import useModal from "../../../hooks/useModal";
import { Input } from "antd";

export default function AproveRejectButtons({ row, index, approve, reject }) {
  const { on, Modal, toggle } = useModal();

  const { TextArea } = Input;

  const inputElement = useRef(null);

  const RejectReasonModal = () => {
    return (
      <div>
        {Modal(
          {
            title: "",
            centered: "true",
            onOK: () => {
              toggle();
              console.log(inputElement.current);
              if (inputElement.current) {
                console.log(inputElement.current.state.value);
              }
            },
            okText: "SUBMIT",
            cancelText: "CANCEL",
           
          },

          <div className="pz-confirm-pop-base">
            <div className="pz-alert-sr-main">Reject Reason</div>
            <div className="pz-alert-sr-sub">
              Please provide a reason which would be sent to the submitor as to
              why this change was rejected.
            </div>
            <TextArea
              className="pz-submit-text-base"
              placeholder="Please insert reject reason here"
              autoSize={{ minRows: 5, maxRows: 8 }}
              ref={inputElement}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pz-aprove-reject-wrapper">
      <button
        type="primary"
        htmlType="submit"
        className="search-btn outlined-btn"
        onClick={() => {
          approve(row, index);
        }}
      >
        APPROVE
      </button>
      <button
        type="primary"
        htmlType="submit"
        className="search-btn reject-btn outlined-btn"
        onClick={() => {
          toggle();
          reject(row, index);
        }}
      >
        REJECT
      </button>
      <RejectReasonModal />
    </div>
  );
}

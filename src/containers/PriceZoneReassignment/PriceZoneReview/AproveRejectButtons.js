import React, { useRef, useState } from 'react';
import useModal from '../../../hooks/useModal';
import { Input , Popconfirm } from 'antd';

import { ReactComponent as ReviewSuccess } from "../../../styles/images/pz-review-sucess.svg";
import { ReactComponent as ReviewReject } from "../../../styles/images/pz-review-reject.svg";
import {ReactComponent as Loader} from "../../../styles/images/priceZone_loader.svg";

export default function AproveRejectButtons({ row, index, handle, disable }) {
  const { on, Modal, toggle } = useModal();
  const [activeModal , setActivemodal]=useState('');

  const { TextArea } = Input;

  const inputElement = useRef(null);


  const RejectReasonModal = () => {
    return (
      <div>
        {Modal(
          {
            title: '',
            centered: 'true',
            onOK: () => {
              toggle();
              let reviewNote = '';
              console.log(inputElement.current);
              if (inputElement.current) {
                console.log(inputElement.current.state.value);
                reviewNote = inputElement.current.state.value;
              }
              handle({ id: row.changeSummary.id, index }, { reviewNote, status: 'REJECTED' });
            },
            okText: 'SUBMIT',
            cancelText: 'CANCEL',
          },

          <div className='pz-confirm-pop-base'>
            <div className='pz-alert-sr-main'>Reject Reason</div>
            <div className='pz-alert-sr-sub'>
              Please provide a reason which would be sent to the submitor as to
              why this change was rejected.
            </div>
            <TextArea
              className='pz-submit-text-base'
              placeholder='Please insert reject reason here'
              autoSize={{ minRows: 5, maxRows: 8 }}
              ref={inputElement}
            />
          </div>
        )}
      </div>
    );
  };

// Aprove Success modal

const AproveSuccess = () => {
  return (
    <div>
      {Modal(
        {
          title: "",
          centered: "true",
          // onOK: ,
          // onCancel: ,
          okText: "OK",
          cancelText: "",
          noCancel: true, // no cancel button
        },

        <div className="pz-confirm-pop-base-success">
          <div className="pz-confirm-wrapper-success">
            <div className="pz-success-anim">
              <ReviewSuccess className="pz-success-anim-review-logo" />
            </div>
            <div className="pz-success-text">Successfully Approved !</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reject Success modal

const RejectSuccess = () => {
  return (
    <div>
      {Modal(
        {
          title: "",
          centered: "true",
          // onOK: () ,
          // onCancel: ,
          okText: "OK",
          cancelText: "",
          noCancel: true, // no cancel button
        },

        <div className="pz-confirm-pop-base-success">
          <div className="pz-confirm-wrapper-success">
            <div className="pz-success-anim">
              <ReviewReject className="pz-success-anim-review-logo" />
            </div>
            <div className="pz-success-text">Successfully Rejected !</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Loading Modal 

const LoadingState = () => {
  return (
      <div>
          {Modal(
              {
                  title: "",
                  centered: "true",
                  maskClosable: false, // won't close on mask click
                  closable: false, // won't close from close icon
                  keyboard: false, // won't close from keyboard events (esc)
                  okText: "OK",
                  cancelText: "",
                  noCancel: true, // no cancel button
                  noOk: true, // no ok button
              },

              <div className="pz-loading-pop-base">
                  <div className="pz-loading-pop-wrapper">
                      <Loader className="pz-loading-anim"/>
                      <span className="pz-loading-text"> Please wait ...</span>
                  </div>
              </div>
          )}
      </div>
  );
};














  return (
    <div className='pz-aprove-reject-wrapper'>
     
      <Popconfirm
        id="pz-pop-confirm-custom"
        title="Are you sure?"
        // visible={}
        // onVisibleChange={}
         onConfirm={toggle}
        //  onCancel={}

        okText="Yes"
        cancelText="No"
      >
      <button
        type='primary'
        htmlType='submit'
        className='search-btn outlined-btn'
        onClick={() => {
          if (!disable) {
            handle({ id: row.changeSummary.id, index }, { reviewNote: '', status: 'APPROVED' });
          }
        }}
      >
        APPROVE
      </button>
      </Popconfirm>
      <button
        type='primary'
        htmlType='submit'
        className='search-btn reject-btn outlined-btn'
        onClick={() => {
          if (!disable) {
            toggle();
          }
          // reject(row, index);          
        }}
      >
        REJECT
      </button>
      <RejectReasonModal />

     

      {
        {
          "aprove-success-modal": <AproveSuccess />,
          "reject-success-modal": <RejectSuccess />,
          "loading-state": <LoadingState/>
        }[activeModal]
      }
    </div>
  );
}

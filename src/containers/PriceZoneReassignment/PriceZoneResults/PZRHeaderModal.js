import React from 'react';
import {Input} from 'antd';
import {ReactComponent as Warning} from '../../../styles/images/warning.svg';
import {ReactComponent as Success} from '../../../styles/images/success.svg';
import {ReactComponent as Loader} from '../../../styles/images/priceZone_loader.svg';

export const submitReasonModal = 'submit-reason';
const {TextArea} = Input;

export const ModalComponent = ({Modal, setSubmitModal}) => (
    <div>
        {Modal(
            {
                title: '',
                centered: 'true',
                onOK: () => setSubmitModal(submitReasonModal),
                still: true, // modal won't close
                okText: 'PROCEED',
                cancelText: 'CANCEL',
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

export const SubmitReason = ({Modal, setSubmitModal, priceZoneChangeHandler, submissionReasonInput}) => (
    <div>
        {Modal(
            {
                title: '',
                centered: 'true',
                onOK: () => priceZoneChangeHandler(),
                onCancel: () => setSubmitModal(false),
                still: true,
                okText: 'SUBMIT',
                cancelText: 'CANCEL',
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

export const SubmitSuccess = ({Modal, resetSearch, referenceId}) => (
    <div>
        {Modal(
            {
                title: '',
                centered: 'true',
                onOK: resetSearch,
                onCancel: resetSearch,
                okText: 'OK',
                still: true,
                cancelText: '',
                noCancel: true, // no cancel button
            },

            <div className="pz-confirm-pop-base-success">
                <div className="pz-confirm-wrapper-success">
                    <div className="pz-success-anim">
                        <Success className="pz-success-anim-logo"/>
                    </div>
                    <div className="pz-success-text">Submitted Successfully</div>
                    {referenceId
                        ? <div className="pz-alert-sub">Reference Number - {referenceId}</div> : <div/>}
                </div>
            </div>
        )}
    </div>
);

export const LoadingState = ({Modal, toggle}) => (
    <div>
        {Modal(
            {
                title: '',
                centered: 'true',
                onOK: () => toggle,
                maskClosable: false, // won't close on mask click
                closable: false, // won't close from close icon
                keyboard: false, // won't close from keyboard events (esc)
                okText: 'OK',
                cancelText: '',
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

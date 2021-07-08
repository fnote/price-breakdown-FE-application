import React, {useState} from 'react';
import {Input, Button} from 'antd';
import {ReactComponent as Warning} from '../../../styles/images/warning.svg';
import {ReactComponent as Success} from '../../../styles/images/success.svg';
import {ReactComponent as Loader} from '../../../styles/images/priceZone_loader.svg';

export const submitReasonModal = 'submit-reason';

const SubmitReasonModalContent = ({onSubmit, onCancel}) => {
    const [submissionNote, setSubmissionNote] = useState('');

    return (
        <div className="pz-confirm-pop-base">
            <div className="pz-alert-sr-main">Submit Reason</div>
            <div id="provide-reason-alert" className="pz-alert-sr-sub">
                Please provide a reason which would be sent to the reviewer as to
                why this change was submitted.
            </div>
            <Input.TextArea
                className="pz-submit-text-base"
                placeholder="Please insert submit reason here"
                autoSize={{minRows: 3, maxRows: 5}}
                maxLength={1500}
                onChange={({target: {value}}) => setSubmissionNote(value)}
            />
            <div className='ant-modal-footer  pz-reject-modal-footer'>
                <Button onClick={onCancel}>
                    CANCEL
                </Button>
                <Button
                    type='primary'
                    disabled={!submissionNote}
                    onClick={() => onSubmit(submissionNote)}
                >
                    SUBMIT
                </Button>
            </div>
        </div>
    );
};

export const ModalComponent = ({Modal, setSubmitModal}) => (
    <div>
        {Modal(
            {
                title: '',
                centered: 'true',
                onOK: () => setSubmitModal(submitReasonModal),
                onCancel: () => setSubmitModal(false),
                still: true, // modal won't close
                okText: 'PROCEED',
                cancelText: 'CANCEL',
            },

            <div className="pz-confirm-pop-base">
                <div className="alert">
                    <Warning className="pz-warning-anim-logo"/>
                </div>
                <div id="confirm-alert" className="pz-alert-main">Confirm Price Zone Change</div>
                <div id="confirm-alert-subtext" className="pz-alert-sub">
                    While performing this change, price zone for all the items
                    associated with attribute group and all the customers
                    associated with customer group will be updated.
                </div>
            </div>
        )}
    </div>
);

export const SubmitReason = ({Modal, setSubmitModal, priceZoneChangeHandler}) => (
    <div>
        {Modal(
            {
                title: '',
                centered: 'true',
                onCancel: () => setSubmitModal(false),
                still: true,
                okText: 'SUBMIT',
                cancelText: 'CANCEL',
                footer: null
            },
            <SubmitReasonModalContent onSubmit={priceZoneChangeHandler} onCancel={() => setSubmitModal(false)}/>
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
                    <div id="success-submission" className="pz-success-text">Submitted Successfully</div>
                    {referenceId
                        ? <div id="reference-number" className="pz-alert-sub">Reference Number - {referenceId}</div> :
                        <div/>}
                </div>
            </div>
        )}
    </div>
);

export const LoadingState = ({Modal}) => (
    <div>
        {Modal(
            {
                title: '',
                centered: 'true',
                maskClosable: false, // won't close on mask click
                closable: false, // won't close from close icon
                keyboard: false, // won't close from keyboard events (esc)
                footer: null
            },

            <div className="pz-loading-pop-base">
                <div className="pz-loading-pop-wrapper">
                    <Loader className="pz-loading-anim"/>
                    <span id="wait-popup" className="pz-loading-text"> Please wait ...</span>
                </div>
            </div>
        )}
    </div>
);

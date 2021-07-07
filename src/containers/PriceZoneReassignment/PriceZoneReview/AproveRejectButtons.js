import React, {useRef, useState} from 'react';
import {Input, Popconfirm, Modal} from 'antd';
import {CheckCircleFilled} from '@ant-design/icons';
import {ReactComponent as ReviewSuccess} from '../../../styles/images/pz-review-sucess.svg';
import {ReactComponent as ReviewReject} from '../../../styles/images/pz-review-reject.svg';
import {ReactComponent as Loader} from '../../../styles/images/priceZone_loader.svg';
import {ReactComponent as Info} from '../../../styles/images/info.svg';

const REJECT_REASON_MODAL = 'reject-reason-modal';
const REJECT_SUCCESS_MODAL = 'reject-success-modal';
const APPROVE_SUCCESS_MODAL = 'approve-success-modal';
const ALREADY_APPROVED_REJECTED_MODAL = 'already-approved-rejected-modal';
const LOADING_MODAL = 'loading-modal';
const EMPTY_MODAL = '';

export default function AproveRejectButtons({row, index, handle, disable}) {
    const [activeModal, setActiveModal] = useState(EMPTY_MODAL);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {TextArea} = Input;

    const closeModal = () => {
        setActiveModal(EMPTY_MODAL);
        setIsModalVisible(false);
    };

    const openModal = (modalName = EMPTY_MODAL) => {
        setActiveModal(modalName);
        setIsModalVisible(true);
    };

    const openAlreadyApprovedRejectedModal = () => {
        setActiveModal(ALREADY_APPROVED_REJECTED_MODAL);
        setIsModalVisible(true);
    };

    const inputElement = useRef(null);

    const RejectReasonModal = () => (
        <Modal
            visible={isModalVisible}
            centered={true}
            okText='SUBMIT'
            cancelText='CANCEL'
            className='pz-antModal'
            okButtonProps={{ disabled: true }} // use this prop to disable ok button
            onOk={() => {
                let reviewNote = '';
                if (inputElement.current) {
                    reviewNote = inputElement.current.state.value;
                    if (reviewNote) {
                        handle(
                            {id: row.changeSummary.id, index},
                            {reviewNote, status: 'REJECTED'},
                            {
                                successCallback: () => openModal(REJECT_SUCCESS_MODAL),
                                failureCallback: closeModal,
                                alreadyApprovedRejectedCallback: openAlreadyApprovedRejectedModal
                            }
                        );
                    }
                }
                openModal(LOADING_MODAL);
            }}
            onCancel={closeModal}
        >
            <div className='pz-confirm-pop-base'>
                <div className='pz-alert-sr-main'>Reject Reason</div>
                <div className='pz-alert-sr-sub'>
                    Please provide a reason which would be sent to the submitor as to why
                    this change was rejected.
                </div>
                <TextArea
                    className='pz-submit-text-base'
                    placeholder='Please insert reject reason here'
                    autoSize={{minRows: 5, maxRows: 8}}
                    ref={inputElement}
                />
            </div>
        </Modal>
    );

    const ApproveSuccess = () => (
        <Modal
            visible={isModalVisible}
            centered={true}
            okText='OK'
            cancelButtonProps={{style: {display: 'none'}}}
            className='pz-antModal'
            onCancel={closeModal}
            onOk={closeModal}
        >
            <div className='pz-confirm-pop-base-success'>
                <div className='pz-confirm-wrapper-success'>
                    <div className='pz-success-anim'>
                        <ReviewSuccess className='pz-success-anim-review-logo'/>
                    </div>
                    <div className='pz-success-text'>Successfully Approved</div>
                </div>
            </div>
        </Modal>
    );

    const AlreadyApprovedRejectedModal = () => (
        <Modal
            visible={isModalVisible}
            centered={true}
            okText='OK'
            cancelButtonProps={{style: {display: 'none'}}}
            className='pz-antModal'
            onCancel={closeModal}
            onOk={closeModal}
        >
            <div className='pz-confirm-pop-base-success'>
                <div className='pz-confirm-wrapper-success'>
                    <div className='pz-success-anim'>
                        <Info className='pz-success-anim-review-logo'/>
                    </div>
                    <div className='pz-success-text'>
                        Already approved/rejected by <br/> another manager
                    </div>
                </div>
            </div>
        </Modal>
    );

    const RejectSuccess = () => (
        <Modal
            visible={isModalVisible}
            centered={true}
            okText='OK'
            cancelButtonProps={{style: {display: 'none'}}}
            className='pz-antModal'
            onCancel={closeModal}
            onOk={closeModal}
        >
            <div className='pz-confirm-pop-base-success'>
                <div className='pz-confirm-wrapper-success'>
                    <div className='pz-success-anim'>
                        <ReviewReject className='pz-success-anim-review-logo'/>
                    </div>
                    <div className='pz-success-text'>Successfully Rejected</div>
                </div>
            </div>
        </Modal>
    );

    const LoadingState = () => (
        <Modal
            visible={isModalVisible}
            centered={true}
            maskClosable={false}
            closable={false}
            keyboard={false}
            okText='OK'
            cancelText=''
            className='pz-antModal'
            footer={null}
        >
            <div className='pz-loading-pop-base'>
                <div className='pz-loading-pop-wrapper'>
                    <Loader className='pz-loading-anim'/>
                    <span className='pz-loading-text'> Please wait ...</span>
                </div>
            </div>
        </Modal>
    );

    const renderModal = () => {
        switch (activeModal) {
            case REJECT_REASON_MODAL:
                return <RejectReasonModal/>;
            case ALREADY_APPROVED_REJECTED_MODAL:
                return <AlreadyApprovedRejectedModal/>;
            case REJECT_SUCCESS_MODAL:
                return <RejectSuccess/>;
            case LOADING_MODAL:
                return <LoadingState/>;
            case APPROVE_SUCCESS_MODAL:
                return <ApproveSuccess/>;
            default:
                return null;
        }
    };

    return (
        <div className='pz-aprove-reject-wrapper'>
            {row.reviewStatus ? (
                <div className='pz-aprove-done'>
                    <CheckCircleFilled/> {row.reviewStatus}
                </div>
            ) : (
                <>
                    <Popconfirm
                        id='pz-pop-confirm-custom'
                        title='Are you sure?'
                        onConfirm={() => {
                            if (!disable) {
                                handle(
                                    {id: row.changeSummary.id, index},
                                    {reviewNote: '', status: 'APPROVED'},
                                    {
                                        successCallback: () => openModal(APPROVE_SUCCESS_MODAL),
                                        failureCallback: closeModal,
                                        alreadyApprovedRejectedCallback: openAlreadyApprovedRejectedModal
                                    }
                                );
                                openModal(LOADING_MODAL);
                            }
                        }}
                        okText='Yes'
                        cancelText='No'
                    >
                        <button
                            type='primary'
                            htmlType='submit'
                            className='search-btn outlined-btn'
                            onClick={() => {
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
                                openModal(REJECT_REASON_MODAL);
                            }
                        }}
                    >
                        REJECT
                    </button>
                </>
            )}
            {renderModal()}
        </div>
    );
}

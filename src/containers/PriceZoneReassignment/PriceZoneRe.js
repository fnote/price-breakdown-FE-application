import React, { useState } from 'react';
import { Modal } from 'antd';
import AppBar from '../../components/AppBar/AppBar';
import SearchPanel from './SearchPanel/SearchPanel';
import SearchStatuses from './SearchPanel/SearchStatuses';
import PZRContextProvider from './PZRContext';

export default function PriceZoneRe() {
  const [confirmModal, setConfirmModal] = useState(false);
  const PriceZoneConfirm = () => (
      <>
      <div className="pz-confirm-pop-base">
      <Modal
          title=""
          centered
          visible={confirmModal}
          onOk={() => setConfirmModal(true)}
          onCancel={() => setConfirmModal(false)}
        >
        </Modal>
      </div>
      </>
    );

  return (
    <div className="wrapper cloudpricing-wrapper">
      <AppBar />
      <PZRContextProvider>
        <div className="content">          
            <SearchPanel />
            <SearchStatuses/>
        </div>
        <PriceZoneConfirm/>
      </PZRContextProvider>
    </div>
  );
}

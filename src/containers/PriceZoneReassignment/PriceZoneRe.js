import React, { useState } from 'react';
import { FileTextFilled } from '@ant-design/icons';
import { Tabs, Modal } from 'antd';
import AppBar from '../../components/AppBar/AppBar';
import SearchPanel from './SearchPanel/SearchPanel';
import PriceZoneHeader from './PriceZoneResults/PrizeZoneHeader';
import PriceZoneTable from './PriceZoneResults/PriceZoneTable';
import PriceZoneReview from './PriceZoneReview/PriceZoneReview';
import PZRContextProvider from './PZRContext';

export default function PriceZoneRe() {
  const { TabPane } = Tabs;
  const [reviewTab, makeReviewActive] = useState(true);

  const [confirmModal, setConfirmModal] = useState(false);

  //Modal containers

  const PriceZoneConfirm = () => {
    return(
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
  };

  return (
    <div className="wrapper cloudpricing-wrapper">
      <AppBar />
      <PZRContextProvider>
        <div className="content">          
            <SearchPanel />
            <div className="pz-wrapper  pz-no-bg">
              {/* <PriceZoneHeader/>
                <PriceZoneTable/> */}

              <Tabs type="card">
                <TabPane
                  tab={
                    <span>
                      <FileTextFilled />
                      Update Pricezone
                    </span>
                  }
                  key="1"
                >
                  <PriceZoneHeader />
                  <PriceZoneTable />
                </TabPane>
                {reviewTab && (
                  <TabPane
                    tab={
                      <span>
                        <FileTextFilled />
                        Review Changes
                      </span>
                    }
                    key="2"
                  >
                    <PriceZoneReview />
                  </TabPane>
                )}
              </Tabs>
            </div>
        </div>
        <PriceZoneConfirm/>
      </PZRContextProvider>
    </div>
  );
}

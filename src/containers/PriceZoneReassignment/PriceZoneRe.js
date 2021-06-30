import React, { useState } from "react";
import { FileTextFilled } from "@ant-design/icons";
import { Tabs } from "antd";
import AppBar from "../../components/AppBar/AppBar";
import SearchPanel from "./SearchPanel/SearchPanel";
import PzUpdateComponent from "./PzUpdateComponent";
import PriceZoneReview from "./PriceZoneReview/PriceZoneReview";
import PZRContextProvider from "./PZRContext";
import SearchStatuses from "./SearchPanel/SearchStatuses";

export default function PriceZoneRe() {
  const { TabPane } = Tabs;
  const [reviewTab, makeReviewActive] = useState(true);



  return (
    <div className="wrapper cloudpricing-wrapper">
      <AppBar />
      <PZRContextProvider>
      <div className="content">
        <SearchPanel />
        <div className="pz-wrapper  pz-no-bg">
          <Tabs type="card">
            <TabPane
              tab={
                <div className="pz-maintab-item">
                    <i className="icon fi flaticon-price-zone pz-icon-tab"/>

                  <div className="pz-main-tab-sub">  Update Pricezone</div>
                </div>
              }
              key="1"
            >

                <SearchStatuses />
                <PzUpdateComponent />
            </TabPane>
            {reviewTab && (
              <TabPane
                tab={
                  <div className="pz-maintab-item">
                    <i className="icon fi flaticon-pz-review pz-icon-tab"/>

                    <div className="pz-main-tab-sub">  Review Changes</div>
                  </div>
                }
                key="2"
              >
                <PriceZoneReview />
              </TabPane>
            )}
          </Tabs>
        </div>
      </div>
      </PZRContextProvider>
    </div>
  );
}

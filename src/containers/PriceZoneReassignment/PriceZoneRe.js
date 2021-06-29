import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import SearchPanel from "./SearchPanel/SearchPanel";
import PriceZoneHeader from "../PriceZoneReassignment/PriceZoneResults/PrizeZoneHeader";
import PriceZoneTable from "../PriceZoneReassignment/PriceZoneResults/PriceZoneTable";
import PriceZoneReview from "./PriceZoneReview/PriceZoneReview";
import { FileTextFilled } from "@ant-design/icons";
import { useState } from "react";
import { Tabs } from "antd";



export default function PriceZoneRe() {
  const { TabPane } = Tabs;
  const [reviewTab, makeReviewActive] = useState(true);



  return (
    <div className="wrapper cloudpricing-wrapper">
      <AppBar />
      <div className="content">
        <SearchPanel />
        <div className="pz-wrapper  pz-no-bg">
          {/* <PriceZoneHeader/>
            <PriceZoneTable/> */}

          <Tabs type="card">
            <TabPane
              tab={
                <span>
                    <i className="icon fi flaticon-price-zone"/>
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


    </div>
  );
}

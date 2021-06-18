import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import SearchPanel from "./SearchPanel/SearchPanel";
import PriceZoneHeader from '../PriceZoneReassignment/PriceZoneResults/PrizeZoneHeader'
import PriceZoneTable from '../PriceZoneReassignment/PriceZoneResults/PriceZoneTable'
import {useState} from 'react'
import { Tabs } from 'antd';

export default function PriceZoneRe() {

    const { TabPane } = Tabs;
    const [reviewTab , makeReviewActive] = useState(true);


  return (
    <div className="wrapper cloudpricing-wrapper">
      <AppBar />
      <div className="content">
        <SearchPanel />
        <div className="pz-wrapper  pz-no-bg">
            {/* <PriceZoneHeader/>
            <PriceZoneTable/> */}




            <Tabs type="card">
      <TabPane tab="Update PriceZone" key="1">
      <PriceZoneHeader/>
            <PriceZoneTable/>
      </TabPane>
      {reviewTab && 
      <TabPane tab="Review Changes" key="2">
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
      </TabPane>
}
    </Tabs>




        </div>

      
      </div>
    </div>
  );
}

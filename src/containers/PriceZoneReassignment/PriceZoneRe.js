import React, {useContext, useState} from 'react';
import { FileTextFilled } from '@ant-design/icons';
import { Tabs } from 'antd';
import AppBar from '../../components/AppBar/AppBar';
import SearchPanel from './SearchPanel/SearchPanel';
import PriceZoneHeader from './PriceZoneResults/PrizeZoneHeader';
import PriceZoneTable from './PriceZoneResults/PriceZoneTable';
import PriceZoneReview from './PriceZoneReview/PriceZoneReview';
import {UserDetailContext} from '../UserDetailContext';
import {grantViewPermissionsToScreens} from '../../utils/CommonUtils';
import {SCREEN_CIPZ_REVIEW} from '../../constants/Constants';

export default function PriceZoneRe() {
  const { TabPane } = Tabs;
  const [reviewTab, makeReviewActive] = useState(true);
  const userDetailContext = useContext(UserDetailContext);
  const cipzUserRole = userDetailContext?.userDetailsData?.userDetails?.cipzRole;

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
                  <FileTextFilled />
                  Update Pricezone
                </span>
              }
              key="1"
            >
              <PriceZoneHeader />
              <PriceZoneTable />
            </TabPane>
            {reviewTab && grantViewPermissionsToScreens(cipzUserRole, SCREEN_CIPZ_REVIEW) && (
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

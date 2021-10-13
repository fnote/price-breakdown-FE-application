// Core
import React, {useContext} from 'react';
import {Tabs} from 'antd';

// Components
import AppBar from '../../components/AppBar/AppBar';
import SearchPanel from './SearchPanel/SearchPanel';
import PzUpdateComponent from './PzUpdateComponent';
import PriceZoneReview from './PriceZoneReview/PriceZoneReview';
import PriceZoneLog from './PriceZoneLog/PriceZoneLog';
import SearchStatuses from './SearchPanel/SearchStatuses';

// Contexts
import PZRContextProvider, {PZRContext} from './PZRContext';
import {UserDetailContext} from '../UserDetailContext';

// Helper functions and constants
import {grantViewPermissionsToScreens} from '../../utils/CommonUtils';
import {
    SCREEN_CIPZ_PZ_UPDATE,
    SCREEN_CIPZ_REVIEW,
    SCREEN_CIPZ_SEARCH,
    SCREEN_CIPZ_TRANSACTION_LOG_HISTORY
} from '../../constants/Constants';

const PZ_UDATE_TAB = 'pz-update-tab';
const REVIEW_TAB = 'review-tab';
const LOG_TAB = 'log-tab';

function PZRApp() {
    const {TabPane} = Tabs;
    const userDetailContext = useContext(UserDetailContext);
    const cipzUserRole = userDetailContext?.userDetailsData?.userDetails?.cipzRole;
    const pZRContext = useContext(PZRContext);

    return (
        <div className="content">
            {grantViewPermissionsToScreens(cipzUserRole, SCREEN_CIPZ_SEARCH) && (<SearchPanel/>)}
            <div className="pz-wrapper  pz-no-bg">
                <Tabs type="card" defaultActiveKey={REVIEW_TAB}
                      onChange={(activeTab) => {
                          if (activeTab === REVIEW_TAB) {
                              pZRContext.setIsOnReviewPage(true);
                              pZRContext.setIsOnTransactionLog(false);
                          } else if (activeTab === LOG_TAB) {
                              pZRContext.setIsOnReviewPage(false);
                              pZRContext.setIsOnTransactionLog(true);
                          } else {
                              pZRContext.setIsOnReviewPage(false);
                              pZRContext.setIsOnTransactionLog(false);
                          }
                      }}
                >
                    {grantViewPermissionsToScreens(cipzUserRole, SCREEN_CIPZ_PZ_UPDATE) && (
                        <TabPane
                            tab={
                                <div className="pz-maintab-item">
                                    <i className="icon fi flaticon-price-zone pz-icon-tab"/>
                                    <div id="priceZone-update-tab" className="pz-main-tab-sub"> Update Price Zone</div>
                                </div>
                            }
                            key={PZ_UDATE_TAB}
                        >
                            <SearchStatuses/>
                            <PzUpdateComponent/>
                        </TabPane>
                    )}
                    {grantViewPermissionsToScreens(cipzUserRole, SCREEN_CIPZ_REVIEW) && (
                        <TabPane
                            tab={
                                <div className="pz-maintab-item">
                                    <i className="icon fi flaticon-pz-review pz-icon-tab"/>

                                    <div id="review-changes-tab" className="pz-main-tab-sub"> Review Changes</div>
                                </div>
                            }
                            key={REVIEW_TAB}
                        >
                            <PriceZoneReview/>
                        </TabPane>
                    )}
                    {grantViewPermissionsToScreens(cipzUserRole, SCREEN_CIPZ_TRANSACTION_LOG_HISTORY) && (
                         <TabPane
                                tab={
                                    <div className="pz-maintab-item">
                                        <i className="icon fi flaticon-pz-review pz-icon-tab"/>

                                        <div id="review-changes-tab" className="pz-main-tab-sub"> Transaction Log</div>
                                    </div>
                                }
                                key={LOG_TAB}
                            >
                               <PriceZoneLog/>
                            </TabPane>
                    )}
                </Tabs>
            </div>
        </div>
    );
}

export default function PZRHome() {
    return (
        <div className="wrapper cloudpricing-wrapper">
            <AppBar/>
            <PZRContextProvider>
                <PZRApp/>
            </PZRContextProvider>
        </div>
    );
}

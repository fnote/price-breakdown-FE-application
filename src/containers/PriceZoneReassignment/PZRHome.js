// Core
import React, {useContext} from 'react';
import {Tabs} from 'antd';

// Components
import AppBar from '../../components/AppBar/AppBar';
import SearchPanel from './SearchPanel/SearchPanel';
import PzUpdateComponent from './PzUpdateComponent';
import PriceZoneReview from './PriceZoneReview/PriceZoneReview';
import SearchStatuses from './SearchPanel/SearchStatuses';

// Contexts
import PZRContextProvider from './PZRContext';
import {UserDetailContext} from '../UserDetailContext';

// Helper functions and constants
import {grantViewPermissionsToScreens} from '../../utils/CommonUtils';
import {SCREEN_CIPZ_PZ_UPDATE, SCREEN_CIPZ_REVIEW, SCREEN_CIPZ_SEARCH} from '../../constants/Constants';

export default function PZRHome() {
    const {TabPane} = Tabs;
    const userDetailContext = useContext(UserDetailContext);
    const cipzUserRole = userDetailContext?.userDetailsData?.userDetails?.cipzRole;

    return (
        <div className="wrapper cloudpricing-wrapper">
            <AppBar/>
            <PZRContextProvider>
                <div className="content">
                    {grantViewPermissionsToScreens(cipzUserRole, SCREEN_CIPZ_SEARCH) && (<SearchPanel/>)}
                    <div className="pz-wrapper  pz-no-bg">
                        <Tabs type="card" defaultActiveKey="2">
                            {grantViewPermissionsToScreens(cipzUserRole, SCREEN_CIPZ_PZ_UPDATE) && (<TabPane
                                tab={
                                    <div className="pz-maintab-item">
                                        <i className="icon fi flaticon-price-zone pz-icon-tab"/>
                                        <div id="priceZone-update-tab" className="pz-main-tab-sub"> Update Price Zone</div>
                                    </div>
                                }
                                key="1"
                            >
                                <SearchStatuses/>
                                <PzUpdateComponent/>
                            </TabPane>)}
                            {grantViewPermissionsToScreens(cipzUserRole, SCREEN_CIPZ_REVIEW) && (
                                <TabPane
                                    tab={
                                        <div className="pz-maintab-item">
                                            <i className="icon fi flaticon-pz-review pz-icon-tab"/>

                                            <div id="review-changes-tab" className="pz-main-tab-sub"> Review Changes</div>
                                        </div>
                                    }
                                    key="2"
                                >
                                    <PriceZoneReview/>
                                </TabPane>
                            )}
                        </Tabs>
                    </div>
                </div>
            </PZRContextProvider>
        </div>
    );
}

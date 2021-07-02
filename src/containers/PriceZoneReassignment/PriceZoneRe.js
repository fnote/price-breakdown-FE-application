import React, {useContext} from 'react';
import {Tabs} from 'antd';
import AppBar from '../../components/AppBar/AppBar';
import SearchPanel from './SearchPanel/SearchPanel';
import PZRContextProvider from "./PZRContext";
import SearchStatuses from "./SearchPanel/SearchStatuses";
import PriceZoneReview from './PriceZoneReview/PriceZoneReview';
import PzUpdateComponent from "./PzUpdateComponent";

import {UserDetailContext} from '../UserDetailContext';
import {grantViewPermissionsToScreens} from '../../utils/CommonUtils';
import {SCREEN_CIPZ_REVIEW} from '../../constants/Constants';

export default function PriceZoneRe() {
    const {TabPane} = Tabs;
    const userDetailContext = useContext(UserDetailContext);
    const cipzUserRole = userDetailContext?.userDetailsData?.userDetails?.cipzRole;


    return (
        <div className="wrapper cloudpricing-wrapper">
            <AppBar/>
            <PZRContextProvider>
                <div className="content">
                    <SearchPanel/>
                    <div className="pz-wrapper  pz-no-bg">
                        <Tabs type="card">
                            <TabPane
                                tab={
                                    <div className="pz-maintab-item">
                                        <i className="icon fi flaticon-price-zone pz-icon-tab"/>
                                        <div className="pz-main-tab-sub"> Update Pricezone</div>
                                    </div>
                                }
                                key="1"
                            >

                                <SearchStatuses/>
                                <PzUpdateComponent/>
                            </TabPane>
                            {grantViewPermissionsToScreens(cipzUserRole, SCREEN_CIPZ_REVIEW) && (
                                <TabPane
                                    tab={
                                        <div className="pz-maintab-item">
                                            <i className="icon fi flaticon-pz-review pz-icon-tab"/>

                                            <div className="pz-main-tab-sub"> Review Changes</div>
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

import React, {useState} from 'react';
import {FileTextFilled} from '@ant-design/icons';
import {Tabs} from 'antd';
import AppBar from '../../components/AppBar/AppBar';
import SearchPanel from './SearchPanel/SearchPanel';
import PzUpdateComponent from './PzUpdateComponent';
import PriceZoneReview from './PriceZoneReview/PriceZoneReview';
import PZRContextProvider from './PZRContext';
import SearchStatuses from './SearchPanel/SearchStatuses';

export default function PriceZoneRe() {
    const {TabPane} = Tabs;
    const [reviewTab, makeReviewActive] = useState(true);


    return (
        <div className="wrapper cloudpricing-wrapper">
            <AppBar/>
            <PZRContextProvider>
                <div className="content">
                    <SearchPanel/>
                    <div className="pz-wrapper  pz-no-bg">
                        <Tabs type="card">
                            <TabPane
                                tab={<span> <FileTextFilled/> Update Price Zone </span>}
                                key="1"
                            >
                                <SearchStatuses/>
                                <PzUpdateComponent/>
                            </TabPane>
                            {reviewTab && (
                                <TabPane tab={<span><FileTextFilled/>Review Changes</span>}
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

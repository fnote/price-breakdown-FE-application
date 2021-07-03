// Core
import React, {useContext} from 'react';
// Components
import PriceZoneHeader from './PriceZoneResults/PrizeZoneHeader';
import PriceZoneTable from './PriceZoneResults/PriceZoneTable';
// Context
import {PZRContext} from './PZRContext';

export default function PzUpdateComponent() {
    const PZRContextData = useContext(PZRContext);
    if (!PZRContextData.searchResults) {
        return null;
    }
    return (
        <div>
            <PriceZoneHeader/>
            <PriceZoneTable/>
        </div>
    );
}

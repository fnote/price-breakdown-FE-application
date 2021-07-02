import React, {useContext} from 'react';
import PricingResultsMeta from './PricingResultsMeta';
import PriceBar from './PriceBar';
import PriceBarDetailed from './PriceBarDetailed';
import { PriceValidationContext } from '../PriceValidationContext';
import { UserDetailContext } from '../../UserDetailContext';
import RequestId from '../../../components/RequestId';

function PricingResults() {
    const priceValidationContext = useContext(PriceValidationContext);
    const priceData = priceValidationContext.priceData;
    const response = priceValidationContext.response;
    const userDetailContext = useContext(UserDetailContext);
    const { userDetails } = userDetailContext.userDetailsData;

    if (response) {
        const { correlationId } = priceValidationContext.response;
        return (
            <div className="pricing-results">
                <div className="section-wrapper">
                    <PricingResultsMeta priceData={priceData} userData={userDetails}/>
                    <PriceBar priceData={priceData}/>
                    <PriceBarDetailed priceData={priceData}/>
                    <RequestId requestId={correlationId}/>
                </div>
            </div>
        );
    }

    return null;
}

export default PricingResults;

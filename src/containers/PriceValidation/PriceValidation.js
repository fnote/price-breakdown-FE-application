import React, {useContext} from 'react';
import AppBar from '../../components/AppBar/AppBar';
import SearchPanel from './SearchPanel/SearchPanel';
import SearchStatuses from './SearchPanel/SearchStatuses';
import PricingResults from './PricingResults/PricingResults';
import PriceValidationContextProvider from './PriceValidationContext';
import Navigation from "../../components/AppBar/Navigation";
import {UserDetailContext} from "../UserDetailContext";

function PriceValidation() {
    const userDetailContext = useContext(UserDetailContext);
    const userRole = userDetailContext.userDetailsData.userDetails.role;
    const cipzUserRole = userDetailContext.userDetailsData.userDetails.cipzRole;
  return (
    <div className="wrapper cloudpricing-wrapper">
      <AppBar />

      <div className="content">
          <PriceValidationContextProvider>
              {userRole !== '' && (<SearchPanel />)}
              {/*{userRole !== 'appadmin' && (<SearchPanel />)}*/}
              {/*<SearchPanel />*/}
            <SearchStatuses />
              <div className="pricing-type-label"><strong>PERISCOPE</strong> PRICING</div>
              <PricingResults />
          </PriceValidationContextProvider>
      </div>
    </div>
  );
}

export default PriceValidation;

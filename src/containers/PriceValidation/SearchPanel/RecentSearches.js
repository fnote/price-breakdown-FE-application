import React from "react";
import RecentSearchBlock from './RecentSearchBlock';

function RecentSearches() {
  return (
    <>
      <div className="panel-header">
        <i className="icon fi flaticon-history" />
        Recent
      </div>
      <ul className="recent-searches">
        <RecentSearchBlock />
        <RecentSearchBlock />
      </ul>
    </>
  );
}

export default RecentSearches;

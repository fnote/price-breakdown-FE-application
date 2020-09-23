import React from "react";
import SearchForm from "./SearchForm";
import RecentSearches from "./RecentSearches";

function SearchPanel() {
  return (
    <div className="searchpanel">
      <SearchForm />
      <RecentSearches />
    </div>
  );
}

export default SearchPanel;

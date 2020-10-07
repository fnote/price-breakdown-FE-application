import React from "react";
import SearchForm from "./SearchForm";
import RecentSearches from "./RecentSearches";

const SearchPanel = () => {
  const [openPanel, setopenPanel] = React.useState(false);
  const mobilePanelOpen = () => {
    setopenPanel(true);
  };
  const mobilePanelClose = () => {
    setopenPanel(false);
  };
  const mobilePanelToggle = () => {
    setopenPanel(!openPanel);
  };
  return (
    <div
      className={openPanel ? "searchpanel show" : "searchpanel"}
      onClick={mobilePanelToggle}>
      <SearchForm />
      {/*<RecentSearches />*/}
    </div>
  );
};

export default SearchPanel;

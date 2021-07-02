import React from 'react';
import {CaretRightOutlined} from '@ant-design/icons';
import SearchForm from './SearchForm';

const SearchPanel = () => {
  const [openPanel, setopenPanel] = React.useState(false);
  const mobilePanelToggle = () => {
    setopenPanel(!openPanel);
  };
  return (
    <div
      className={openPanel ? 'searchpanel show' : 'searchpanel'}
      >
      <SearchForm />
      <div className="mobile-toggler" onClick={mobilePanelToggle}><CaretRightOutlined /></div>
    </div>
  );
};

export default SearchPanel;

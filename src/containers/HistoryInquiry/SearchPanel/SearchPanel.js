import React from 'react';
import {CaretRightOutlined} from '@ant-design/icons';
import SearchForm from './SearchForm';

const SearchPanel = () => {
    const [openPanel, setOpenPanel] = React.useState(false);
    const panelToggle = () => {
        setOpenPanel(!openPanel);
    };
    return (
        <div
            className={openPanel ? 'searchpanel show' : 'searchpanel'}
        >
            <SearchForm/>
            <div className="mobile-toggler" onClick={panelToggle}><CaretRightOutlined/></div>
        </div>
    );
};

export default SearchPanel;

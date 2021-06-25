import React, { useState } from 'react';

export const PZRContext = React.createContext({
    isLoading: false,
    setLoading: () => {},
    currentPage: 1,
    setCurrentPage: () => {},
    dataResetIndex: 0,
    setDataResetIndex: () => {},
    dataStore: {},
    setDataStore: () => {},
});

const PZRContextProvider = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataResetIndex, setDataResetIndex] = useState(0);
    const [dataStore, setDataStore] = useState({});

    return (
        <PZRContext.Provider value={{
            isLoading,
            setLoading,
            currentPage,
            setCurrentPage,
            dataResetIndex,
            setDataResetIndex,
            dataStore,
            setDataStore
        }}>
            {props.children}
        </PZRContext.Provider>
    );
};

export default PZRContextProvider;

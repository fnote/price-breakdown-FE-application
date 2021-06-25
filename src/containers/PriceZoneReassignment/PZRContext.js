import React, { useState } from 'react';

export const PZRContext = React.createContext({
    isLoading: false,
    setLoading: () => {}
});

const PZRContextProvider = (props) => {
    const [isLoading, setLoading] = useState(false);

    return (
        <PZRContext.Provider value={{
            isLoading,
            setLoading
        }}>
            {props.children}
        </PZRContext.Provider>
    );
};

export default PZRContextProvider;

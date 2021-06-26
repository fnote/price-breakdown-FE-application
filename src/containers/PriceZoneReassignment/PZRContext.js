import React, {useState} from 'react';

export const PZRContext = React.createContext({
    searchParams: {},
    setSearchParams: () => {
    },
    searchResults: {},
    setSearchResults: () => {
    },

});

const initialSearchResultsState = {
    totalRecords: 0,
    offset: 0,
    limit: 10,
};

const initialSearchParamsState = {
    site: null,
    opcoId: null,
    customer: null,
    customerGroup: null,
    attributeGroup: null,
    attributeGroupId: null,
};

const PZRContextProvider = (props) => {
    const [isSearchLoading, setSearchLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({...initialSearchParamsState});
    const [searchResults, setSearchResults] = useState(initialSearchResultsState);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const setSearchResultsData = (data) => {
        setSearchLoading(false);
        setError(null);
        setSearchResults(data);
        setResponse(data); //TODO: Why setting the response again?
    };

    const errorUpdateHandler = (data) => {
        setSearchLoading(false);
        setError(data);
        setResponse(null);
    };

    return (
        <PZRContext.Provider value={{
            isSearchLoading: isSearchLoading,
            setSearchLoading,
            searchParams,
            setSearchParams,
            setErrorData: errorUpdateHandler,
            searchResults,
            setSearchResults: setSearchResultsData,
            error,
            setError,
            response,
            setResponse
        }}>
            {props.children}
        </PZRContext.Provider>
    );
};

export default PZRContextProvider;

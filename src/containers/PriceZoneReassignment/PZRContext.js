import React, {useState} from 'react';

export const PZRContext = React.createContext({
    searchParams: {},
    setSearchParams: () => {
    },
    searchResults: {},
    setSearchResults: () => {
    },
});

const initialState = {
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
    const [isLoading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({...initialSearchParamsState});
    const [searchResults, setSearchResultData] = useState(initialState);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const searchParamsUpdateHandler = (data) => {
        setLoading(false);
        setError(null);
        setSearchResultData(data);
        setResponse(data); //TODO: Why setting the response again?
    };

    const errorUpdateHandler = (data) => {
        setLoading(false);
        setError(data);
        setResponse(null);
    };

    return (
        <PZRContext.Provider value={{
            isLoading,
            setLoading,
            searchParams,
            setSearchParams,
            setErrorData: errorUpdateHandler,
            searchResults,
            setSearchResultData: searchParamsUpdateHandler,
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

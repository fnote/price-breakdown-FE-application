import React, {useState} from 'react';

export const PZRContext = React.createContext({
    searchParams: {},
    setSearchParams: () => {
    },
    searchResults: {},
    setSearchResults: () => {
    },

});

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
    const [searchResults, setSearchResults] = useState(null);
    const [searchError, setSearchError] = useState(null);
    const [response, setResponse] = useState(null);
    const [isSearchTableLoading, setSearchTableLoading] = useState(false);
    const [searchResetFunc, setSearchResetFunc] = useState(null);
    const [isFirstSubmissionDone, setFirstSubmissionDone] = useState(false);

    const setSearchResultsData = (data) => {
        setSearchLoading(false);
        setSearchError(null);
        setSearchResults(data);
        setResponse(data); //TODO: Why setting the response again?
    };

    const errorUpdateHandler = (data) => {
        setSearchLoading(false);
        setSearchError(data);
        setResponse(null);
    };

    const resetSubmissionState = () => {
        setSearchParams({...initialSearchParamsState});
        setSearchResults(null);
        if (searchResetFunc) {
            searchResetFunc.resetForm();
        }
        setSearchResetFunc(null);
        setFirstSubmissionDone(true);
    };

    return (
        <PZRContext.Provider value={{
            isSearchLoading,
            setSearchLoading,
            searchParams,
            setSearchParams,
            setErrorData: errorUpdateHandler,
            searchResults,
            setSearchResults: setSearchResultsData,
            searchError,
            setSearchError,
            response,
            setResponse,
            isSearchTableLoading,
            setSearchTableLoading,
            resetAfterSubmission: resetSubmissionState,
            setSearchResetFunc,
            isFirstSubmissionDone
        }}>
            {props.children}
        </PZRContext.Provider>
    );
};

export default PZRContextProvider;

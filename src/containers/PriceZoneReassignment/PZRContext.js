import React, {useState} from 'react';

export const PZRContext = React.createContext({
    searchParams: {},
    setSearchParams: () => {
    },
    searchResults: {},
    setSearchResults: () => {
    },
    isOnReviewPage: false,
    setIsOnReviewPage: () => {
    },
    resetSearchResults: () => {
    }
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
    const [isSearchTableLoading, setSearchTableLoading] = useState(false);
    const [searchResetFunc, setSearchResetFunc] = useState(null);
    const [isFirstSubmissionDone, setFirstSubmissionDone] = useState(false);
    const [isResponseEmpty, setIsResponseEmpty] = useState(false);
    const [isOnReviewPage, setIsOnReviewPage] = useState(false);

    const setSearchResultsData = (data) => {
        setSearchLoading(false);
        setSearchError(null);
        setSearchResults(data);
    };

    const resetSearchResults = () => {
        setSearchLoading(false);
        setSearchResults(null);
    };

    const errorUpdateHandler = (data) => {
        if (data !== null) {
            setSearchLoading(false);
        }
        setSearchError(data);
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
            isSearchTableLoading,
            setSearchTableLoading,
            resetAfterSubmission: resetSubmissionState,
            setSearchResetFunc,
            isFirstSubmissionDone,
            isResponseEmpty,
            setIsResponseEmpty,
            isOnReviewPage,
            setIsOnReviewPage,
            resetSearchResults
        }}>
            {props.children}
        </PZRContext.Provider>
    );
};

export default PZRContextProvider;

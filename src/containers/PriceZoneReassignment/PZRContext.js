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
    isOnTransactionHistoryLogPage: false,
    setIsOnTransactionHistoryLogPage: () => {
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

const initialFilterParamsState = {
    is_exported: 'Y',
    no_exported_days: '180',
};

const PZRContextProvider = (props) => {
    const [isSearchLoading, setSearchLoading] = useState(false);
    const [isFilterLoading, setFilterLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({...initialSearchParamsState});
    const [filterParams, setFilterParams] = useState(initialFilterParamsState);
    const [searchResults, setSearchResults] = useState(null);
    const [searchError, setSearchError] = useState(null);
    const [isSearchTableLoading, setSearchTableLoading] = useState(false);
    const [searchResetFunc, setSearchResetFunc] = useState(null);
    const [isFirstSubmissionDone, setFirstSubmissionDone] = useState(false);
    const [isResponseEmpty, setIsResponseEmpty] = useState(false);
    const [isOnReviewPage, setIsOnReviewPage] = useState(false);
    const [isOnTransactionLog, setIsOnTransactionLog] = useState(false);
    const [isFilterUsed, setFilterUsed ] = useState(false);

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
        setSearchLoading(false);
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
            resetSearchResults,
            isOnTransactionLog,
            setIsOnTransactionLog,
            filterParams,
            setFilterParams,
            isFilterLoading,
            setFilterLoading,
            isFilterUsed,
            setFilterUsed
        }}>
            {props.children}
        </PZRContext.Provider>
    );
};

export default PZRContextProvider;

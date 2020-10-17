import React, {useState} from 'react';


export const AppLoaderContext = React.createContext({
    appLoadingState: false,
    setAppLoadingState: () => {}

});

const AppLoaderContextProvider = props => {

    const [isAppLoading, setIsAppLoading] = useState(false);

    return (
        <AppLoaderContext.Provider value={{setAppLoadingState: setIsAppLoading, appLoadingState: isAppLoading}}>
            {props.children}
        </AppLoaderContext.Provider>
    )
};


export default AppLoaderContextProvider;

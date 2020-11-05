import React, {useState} from 'react';

/**
 * Holds app loader context state.
 *
 * @author: adis0892 on 10/16/20
 * */

export const AppLoaderContext = React.createContext({
    appLoadingState: false,
    setAppLoadingState: () => {}

});

const AppLoaderContextProvider = (props) => {
    const [isAppLoading, setIsAppLoading] = useState(false);

    return (
        <AppLoaderContext.Provider value={{setAppLoadingState: setIsAppLoading, appLoadingState: isAppLoading}}>
            {props.children}
        </AppLoaderContext.Provider>
    );
};

export default AppLoaderContextProvider;

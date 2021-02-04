/**
 * React custom hook for polling data
 *
 * @author gkar5861
 * Created: 02/02/21.
 */

import {useEffect, useRef} from 'react';

export function useInterval(callback, delay) {
    const latestCallback = useRef();

    // After every render, save the latest callback into our reference
    useEffect(() => {
        latestCallback.current = callback;
    }, [callback]);

    // Refresh the interval
    useEffect(() => {
        function tick() {
            latestCallback.current();
        }

        // sets up an interval and clears it after the component unmounts
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [callback, delay]);
}

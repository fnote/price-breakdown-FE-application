/**
 * Takes the component and polling
 *
 * @author gkar5861
 * Created: 02/03/21.
 */
import React from 'react';
import {useInterval} from '../../hooks/useInterval';
import {JOB_LIST_REFRESH_INTERVAL} from '../../constants/Constants';
import {autoRefreshBatchJobs} from './BatchJobResults/BatchJobResults';

export const withHooksHOC = (WrappedComponent) => (props) => {
        const [jobList, setJobList] = React.useState(null);
        // Asynchronous calls to refresh the list of jobs data in given time interval
        useInterval(async () => {
            const newList = props.refreshOn ? await autoRefreshBatchJobs() : null;
            if (newList !== null && (JSON.stringify(newList) !== JSON.stringify(jobList))) {
                setJobList(newList);
            }
        }, JOB_LIST_REFRESH_INTERVAL);

        // Creates a new wrapper component
        return (
            <WrappedComponent refreshedData={jobList} refreshedOn={true} {...props} />
        );
    };

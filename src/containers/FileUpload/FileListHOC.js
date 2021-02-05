/**
 * Takes the component and polling
 *
 * @author gkar5861
 * Created: 02/03/21.
 */
import React from 'react';
import {useInterval} from '../../hooks/useInterval';
import {JOB_LIST_REFRESH_INTERVAL} from '../../constants/Constants';
import {getBffUrlConfig} from '../../utils/Configs';
import {fileSearchListRequestHandler} from './BatchJobResults/BatchJobResults';

// get new batch jobs list
const autoRefreshBatchJobs = () => {
    const batchJobListUrl = getBffUrlConfig().batchJobsUrl;
    return fileSearchListRequestHandler(batchJobListUrl).then((res) => {
        if (res.success) {
            return res.data;
        }
    }).catch(() => null);
};

export const withHooksHOC = (WrappedComponent) => (props) => {
    const [jobList, setJobList] = React.useState(null);

    // Asynchronous calls to refresh the list of jobs data in polling interval of every 15 seconds
    useInterval(async () => {
        const newList = props.refreshOn ? await autoRefreshBatchJobs() : null;
        if (newList !== null && (JSON.stringify(newList) !== JSON.stringify(jobList))) {
            setJobList(newList);
        }
    }, JOB_LIST_REFRESH_INTERVAL);

    // Creates a new wrapper component
    return (
        <WrappedComponent refreshedData={jobList} {...props} />
    );
};

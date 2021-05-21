import JobDetail from '../../../model/jobDetail';
import {generateBatchJobDeleteUrl, removeFileNamePrefix} from '../../../utils/FileListUtils';
import {PCI_FILENAME_PREFIX, TIMEZONE_ABBREVIATION_REGEX, TIMEZONE_REGEX} from '../../../constants/Constants';
import {getBffUrlConfig} from '../../../utils/Configs';

const formatJobDetailObject = (job) => {
    const jobDetail = new JobDetail(job);
    jobDetail.fileName = removeFileNamePrefix(jobDetail.fileName);
    jobDetail.minorErrorFileName = jobDetail.minorErrorFileName
        ? jobDetail.minorErrorFileName.replace(PCI_FILENAME_PREFIX, '') : null;
    const timeZoneAbb = new Date(jobDetail.startTime).toTimeString()
        .match(new RegExp(TIMEZONE_ABBREVIATION_REGEX, 'g')).join('');
    jobDetail.startTime = jobDetail.startTime ? new Date(jobDetail.startTime).toString()
        .replace(TIMEZONE_REGEX, timeZoneAbb) : null;
    jobDetail.endTime = jobDetail.endTime ? new Date(jobDetail.endTime).toString()
        .replace(TIMEZONE_REGEX, timeZoneAbb) : null;
    return jobDetail;
};

const handleResponse = (response) => {
    const batchJobDetailList = [];
    return response.json().then((json) => {
        const responseData = json.data;
        if (response.ok && responseData) {
            responseData.forEach((job) => {
                const jobDetail = formatJobDetailObject(job);
                batchJobDetailList.push({
                    jobId: jobDetail.jobId,
                    startTime: jobDetail.startTime,
                    endTime: jobDetail.endTime,
                    filename: jobDetail.fileName,
                    jobDetail,
                });
            });
            return {success: true, data: batchJobDetailList};
        }
        return {success: false, data: batchJobDetailList};
    });
};

export const jobDeleteRequestHandler = (jobId) => fetch(generateBatchJobDeleteUrl(jobId), {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    },
    credentials: 'include'
});

export const generateSignedUrls = (fileNamesArray) => fetch(getBffUrlConfig().filesDownloadUrl, {
    method: 'POST',
    body: JSON.stringify({
        'fileNames': fileNamesArray
    }),
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    credentials: 'include'
});

export const fileSearchListRequestHandler = (batchJobsListUrl) => fetch(batchJobsListUrl, {
    method: 'GET',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    credentials: 'include'
}).then(handleResponse);

// get new batch jobs list
export const autoRefreshBatchJobs = () => {
    const batchJobListUrl = getBffUrlConfig().batchJobsUrl;
    return fileSearchListRequestHandler(batchJobListUrl).then((res) => {
        if (res.success) {
            return res.data;
        }
    }).catch(() => null);
};

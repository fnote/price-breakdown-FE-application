/**
 * @author cwic0864
 * Created: 01/19/21.
 */

import {getBffUrlConfig} from './Configs';
import {EMPTY_STRING, PCI_FILENAME_PREFIX} from '../constants/Constants';

export const generateBatchJobSearchUrl = (searchString) => `${getBffUrlConfig().batchJobsUrl}?searchQuery=${searchString}`;

export const getJobsDeleteEndpoint = (jobId) => `${getBffUrlConfig().batchJobsUrl}/${jobId}`;

export const removeFileNamePrefix = (fileName) => fileName.replace(PCI_FILENAME_PREFIX, EMPTY_STRING);

export const removeFileNamePrefixFromList = (fileNames) => fileNames.map((fileName) => removeFileNamePrefix(fileName));

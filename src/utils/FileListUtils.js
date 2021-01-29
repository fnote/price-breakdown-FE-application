/**
 * Utility class for file listing
 *
 * @author cwic0864
 * Created: 01/19/21.
 */

import {getBffUrlConfig} from './Configs';
import {EMPTY_STRING, PCI_FILENAME_PREFIX} from '../constants/Constants';

/**
 * Generate batch job search url for given search string
 */
export const generateBatchJobSearchUrl = (searchString) => `${getBffUrlConfig().batchJobsUrl}?searchQuery=${searchString}`;

/**
 * Generate batch job delete url for given job
 */
export const generateBatchJobDeleteUrl = (jobId) => `${getBffUrlConfig().batchJobsUrl}/${jobId}`;

/**
 * Remove file name prefix from given file name
 */
export const removeFileNamePrefix = (fileName) => fileName.replace(PCI_FILENAME_PREFIX, EMPTY_STRING);

/**
 * Remove file name prefix from given file name list
 */
export const removeFileNamePrefixFromList = (fileNames) => fileNames.map((fileName) => removeFileNamePrefix(fileName));

/**
 * Utility class for file listing
 *
 * @author cwic0864
 * Created: 01/19/21.
 */

import {getBffUrlConfig} from './Configs';
import {EMPTY_STRING, MAX_DOWNLOAD_ALLOWED, PCI_FILENAME_PREFIX} from '../constants/Constants';

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

/**
 * Check the selected file count is exceeded the max downloadable limit
 * @param selectedCount
 * @returns {boolean}
 */
export const isMaxDownloadableCountExceed = (selectedCount) => selectedCount > MAX_DOWNLOAD_ALLOWED;
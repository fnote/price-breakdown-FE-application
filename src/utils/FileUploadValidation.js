/**
 * Validation functions for file upload
 * */
import {CSV_MIMETYPE, SUPPORTED_FILE_TYPES, UNSUPPORTED_SPECIAL_CHARACTERS} from '../constants/Constants';

/**
 * Validate file content type
 * */
export const isValidFileType = (contentType) => !(contentType === undefined || !SUPPORTED_FILE_TYPES.includes(contentType));

/**
 * Validate file name
 * */
export const isValidFileName = (fileName) => !(fileName === undefined || fileName.length === 0
    || UNSUPPORTED_SPECIAL_CHARACTERS.test(fileName));

/**
 * Inject getCSVMimeType By extension
 * @param extension
 * @returns {string}
 */
export const getCSVMimeType = () => CSV_MIMETYPE;

/**
 * Convert Blob to File again
 * @param theBlob
 * @param fileName
 * @returns {*}
 */
export const blobToFile = (theBlob, fileName) => {
    theBlob.name = fileName;

    return theBlob;
};

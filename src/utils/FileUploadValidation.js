/**
 * Validation functions for file upload
 * */
import {SUPPORTED_FILE_EXTENSIONS_TYPES, UNSUPPORTED_SPECIAL_CHARACTERS} from '../constants/Constants';

/**
 * Validate file content type
 * */
export const isValidFileType = (contentType) => !(contentType === undefined
    || !SUPPORTED_FILE_EXTENSIONS_TYPES.map((type) => type.type).includes(contentType));

/**
 * Validate file name
 * */
export const isValidFileName = (fileName) => !(fileName === undefined || fileName.length === 0
    || UNSUPPORTED_SPECIAL_CHARACTERS.test(fileName));

/**
 * Inject getCSVMimeType By extension
 * @param extension
 * @returns {string|null}
 */
export const getMimeType = (extension) => {
    let i;
    for (i = 0; i < SUPPORTED_FILE_EXTENSIONS_TYPES.length; i += 1) {
        if (extension === SUPPORTED_FILE_EXTENSIONS_TYPES[i].extension) {
            return SUPPORTED_FILE_EXTENSIONS_TYPES[i].type;
        }
    }
    return null;
};

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

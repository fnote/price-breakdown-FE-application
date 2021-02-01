/**
 * Validation functions for file upload
 * */
import {SUPPORTED_FILE_TYPES, UNSUPPORTED_SPECIAL_CHARACTERS} from '../constants/Constants';

/**
 * Validate file content type
 * */
export const isValidFileType = (contentType) => !(contentType === undefined || !SUPPORTED_FILE_TYPES.includes(contentType));

/**
 * Validate file name
 * */
export const isValidFileName = (fileName) => !(fileName === undefined || fileName.length === 0
    || UNSUPPORTED_SPECIAL_CHARACTERS.test(fileName));

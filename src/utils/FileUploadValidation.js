/**
 * Validation functions for file upload
 * */
import {SUPPORTED_FILE_TYPES} from '../constants/Constants';

/**
 * Validate file content type
 * */
export const isValidFileType = (contentType) => !(contentType === undefined || !SUPPORTED_FILE_TYPES.includes(contentType));

/**
 * Validate file name
 * */
export const isValidFileName = (fileName) => !(fileName === undefined || /\s/.test(fileName));

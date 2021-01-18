/**
 * Validate file content type
 * */
import {SUPPORTED_FILE_TYPES} from '../../constants/Constants';

export const isValidFileType = (contentType) => !(contentType === undefined || !SUPPORTED_FILE_TYPES.includes(contentType));

import {blobToFile, getMimeType, isValidFileName, isValidFileType} from '../FileUploadValidation';
import {SUPPORTED_FILE_EXTENSIONS, SUPPORTED_FILE_TYPES} from '../../constants/Constants';

describe('FileUploadValidation', () => {
    test('isValidFileType should return true when the given file type is support', () => {
        const fileContentType = '';
        expect(isValidFileType(fileContentType)).toEqual(true);
    });

    test('isValidFileType should return true when the given file type is txt', () => {
        const fileContentType = 'text/plain';
        expect(isValidFileType(fileContentType)).toEqual(true);
    });

    test('isValidFileType should return true when the given file type is csv', () => {
        const fileContentType = 'text/csv';
        expect(isValidFileType(fileContentType)).toEqual(true);
    });

    test('isValidFileType should return true when the given file type is xls', () => {
        const fileContentType = 'application/vnd.ms-excel';
        expect(isValidFileType(fileContentType)).toEqual(true);
    });

    test('isValidFileType should return true when the given file type is xlsx', () => {
        const fileContentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        expect(isValidFileType(fileContentType)).toEqual(true);
    });

    test('isValidFileType should return true when the given file type is doc', () => {
        const fileContentType = 'application/msword';
        expect(isValidFileType(fileContentType)).toEqual(true);
    });

    test('isValidFileType should return true when the given file type is docx', () => {
        const fileContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        expect(isValidFileType(fileContentType)).toEqual(true);
    });

    test('isValidFileType should return false when the given file type is not support', () => {
        const fileContentType = 'image/plain';
        expect(isValidFileType(fileContentType)).toEqual(false);
    });

    test('isValidFileName should return true when the filename is valid', () => {
        const fileName = 'DevTest_450.txt';
        expect(isValidFileName(fileName)).toEqual(true);
    });

    test('isValidFileName should return false when the filename is undefined', () => {
        expect(isValidFileName('')).toEqual(false);
    });

    test('isValidFileName should return false when the filename has a space', () => {
        const fileName = 'DevTest 450.txt';
        expect(isValidFileName(fileName)).toEqual(false);
    });

    test('isValidFileName should return false when the filename has a special char', () => {
        const fileName = 'DevTest%450.txt';
        expect(isValidFileName(fileName)).toEqual(false);
    });

    test('getMimeType should return valid mime type for no extension', () => {
        expect(getMimeType(SUPPORTED_FILE_EXTENSIONS[0])).toEqual(SUPPORTED_FILE_TYPES[0]);
    });

    test('getMimeType should return valid mime type for .txt', () => {
        expect(getMimeType(SUPPORTED_FILE_EXTENSIONS[1])).toEqual(SUPPORTED_FILE_TYPES[1]);
    });

    test('getMimeType should return valid mime type for .csv', () => {
        expect(getMimeType(SUPPORTED_FILE_EXTENSIONS[2])).toEqual(SUPPORTED_FILE_TYPES[2]);
    });

    test('getMimeType should return valid mime type for .xls', () => {
        expect(getMimeType(SUPPORTED_FILE_EXTENSIONS[3])).toEqual(SUPPORTED_FILE_TYPES[3]);
    });

    test('getMimeType should return valid mime type for .xlsx', () => {
        expect(getMimeType(SUPPORTED_FILE_EXTENSIONS[4])).toEqual(SUPPORTED_FILE_TYPES[4]);
    });

    test('getMimeType should return valid mime type for .doc', () => {
        expect(getMimeType(SUPPORTED_FILE_EXTENSIONS[5])).toEqual(SUPPORTED_FILE_TYPES[5]);
    });

    test('getMimeType should return valid mime type for .docx', () => {
        expect(getMimeType(SUPPORTED_FILE_EXTENSIONS[6])).toEqual(SUPPORTED_FILE_TYPES[6]);
    });

    test('blobToFile should return new file', () => {
        const filename = 'dev_001.txt';
        const blob = new Blob([''], {type: getMimeType('.txt')});
        const newFile = blobToFile(blob, filename);
        expect(newFile.name).toEqual(filename);
    });
});

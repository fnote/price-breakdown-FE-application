import {isValidFileName, isValidFileType} from "../FileUploadValidation";


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
});
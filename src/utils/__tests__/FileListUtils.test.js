import {
    generateBatchJobDeleteUrl,
    generateBatchJobSearchUrl,
    isMaxDownloadableCountExceed,
    removeFileNamePrefix,
    removeFileNamePrefixFromList
} from '../FileListUtils';

describe('FileListUtils', () => {
    test('generateBatchJobSearchUrl should return formatted search url for given query', () => {
        const filePrefix = 'DevTest';
        const batchJobUrl = `http://localhost:4000/local/v1/pci-bff/batch/jobs?searchQuery=${filePrefix}`;
        expect(generateBatchJobSearchUrl(filePrefix)).toEqual(batchJobUrl);
    });

    test('generateBatchJobDeleteUrl should return formatted delete url for given batch jobId', () => {
        const jobId = '111222';
        const batchJobDeleteUrl = `http://localhost:4000/local/v1/pci-bff/batch/jobs/${jobId}`;
        expect(generateBatchJobDeleteUrl(jobId)).toEqual(batchJobDeleteUrl);
    });

    test('removeFileNamePrefix should remove PCI prefix from the given file', () => {
        const fileNameWithPrefix = 'CPPCI-DevTest';
        const fileNameWithoutPrefix = 'DevTest';
        expect(removeFileNamePrefix(fileNameWithPrefix)).toEqual(fileNameWithoutPrefix);
    });

    test('removeFileNamePrefixFromList should remove PCI prefix from the given file lists', () => {
        const fileNamesWithPrefix = ['CPPCI-DevTest', 'CPPCI-BPTest'];
        const fileNamesWithoutPrefix = ['DevTest', 'BPTest'];
        expect(removeFileNamePrefixFromList(fileNamesWithPrefix)).toEqual(fileNamesWithoutPrefix);
    });

    test('isMaxDownloadableCountExceed should return true if the selected count exceeded max', () => {
        expect(isMaxDownloadableCountExceed(26)).toEqual(true);
    });

    test('isMaxDownloadableCountExceed should return false if the selected count similar to max', () => {
        expect(isMaxDownloadableCountExceed(25)).toEqual(false);
    });

    test('isMaxDownloadableCountExceed should return false if the selected count not exceeded max', () => {
        expect(isMaxDownloadableCountExceed(24)).toEqual(false);
    });
});

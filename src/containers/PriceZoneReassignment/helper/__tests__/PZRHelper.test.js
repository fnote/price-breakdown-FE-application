import {
    constructRequestUrl,
    formatPriceZones,
    generatePaginationParams,
    getReviewStatusMsg,
    getEmptyDataTableMessage,
    generateReviewer,
    extractOpCoId,
    formatPZReferenceRecord
} from '../PZRHelper';

import {
    REVIEW_STATUS_APPROVED,
    REVIEW_STATUS_REJECTED,
    REVIEW_STATUS_APPROVED_MSG,
    REVIEW_STATUS_REJECTED_MSG,
    REVIEW_STATUS_CHANGED_MSG
} from '../../../../constants/PZRConstants';

describe('constructRequestUrl', () => {
    test('should construct request url correctly when empty query params are provided', () => {
        expect(constructRequestUrl('http://localhost:3000', {})).toEqual('http://localhost:3000?');
    });

    test('should construct request url correcty when non-empty query params are provided', () => {
        expect(constructRequestUrl('http://localhost:3000', { a: 'name', b: 10 }))
        .toEqual('http://localhost:3000?a=name&b=10');
    });
});

describe('formatPriceZones', () => {
    test('should format price zones when an empty array is provided', () => {
        expect(formatPriceZones([])).toEqual('');
    });

    test('should format price zones when non-empty array is provided', () => {
        expect(formatPriceZones([1, 2])).toEqual('1,2');
        expect(formatPriceZones([3, 4, 5])).toEqual('3,4,5');
    });
});

describe('generatePaginationParams', () => {
    test('should generate pagination params correcty', () => {
        expect(generatePaginationParams(1, 10)).toEqual({
            offset: 0,
            limit: 10
        });

        expect(generatePaginationParams(10, 20)).toEqual({
            offset: 180,
            limit: 20
        });
    });
});

describe('getReviewStatusMsg', () => {
    test('should return review status approved msg when statas is approved', () => {
        expect(getReviewStatusMsg(REVIEW_STATUS_APPROVED)).toEqual(REVIEW_STATUS_APPROVED_MSG);
    });

    test('should return review status rejected msg when statas is rejected', () => {
        expect(getReviewStatusMsg(REVIEW_STATUS_REJECTED)).toEqual(REVIEW_STATUS_REJECTED_MSG);
    });

    test('should return review status changed msg when statas is already approved/rejected', () => {
        expect(getReviewStatusMsg()).toEqual(REVIEW_STATUS_CHANGED_MSG);
    });
});

describe('getEmptyDataTableMessage', () => {
    test('should return correct messge when there is an error', () => {
        expect(getEmptyDataTableMessage(true)).toEqual('Sorry we could not retrieve the information');
    });

    test('should return correct messge when there is not an error', () => {
        expect(getEmptyDataTableMessage(false)).toEqual('No Changes to Review');
    });
});

describe('generateReviewer', () => {
    test('should generate reviewer content correctly', () => {
        const r = generateReviewer({
            username: 'tjay5771', firstName: 'Tharuka', lastName: 'Jayalath', email: 'Tharuka.Jayalath@syscolabs.com'
        });
        console.log(r);
        expect(r).toEqual({
            id: 'tjay5771',
            givenName: 'Tharuka',
            surname: 'Jayalath',
            email: 'Tharuka.Jayalath@syscolabs.com'
        });
    });
});

describe('extractOpCoId', () => {
    test('should return the OpCo id', () => {
        expect(extractOpCoId('019-Cincinnati')).toEqual('019');
    });
});

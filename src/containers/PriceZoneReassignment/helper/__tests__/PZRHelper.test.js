import {
    autoSize,
    calculateResetIndex,
    constructFetchRequest,
    constructRequestUrl,
    extractOpCoId,
    formatPriceZones,
    generatePaginationParams,
    generateReviewer,
    getAttributeGroups,
    getBusinessUnits,
    getEmptyDataTableMessage,
    getPriceZoneOptions,
    getReviewStatusMsg,
    getStyleClassByApprovalStatus,
    openNotificationWithIcon,
    truncate,
    updateCompletedRequest
} from '../PZRHelper';

import {
    REVIEW_STATUS_APPROVED,
    REVIEW_STATUS_APPROVED_MSG,
    REVIEW_STATUS_CHANGED_MSG,
    REVIEW_STATUS_REJECTED,
    REVIEW_STATUS_REJECTED_MSG
} from '../../../../constants/PZRConstants';

describe('openNotificationWithIcon', () => {
    test('should create notification', () => {
        openNotificationWithIcon('error', 'Created', 'Success');
    });
});

describe('getPriceZoneOptions', () => {
    test('should return prize zones', () => {
        const options = getPriceZoneOptions();
        expect(options.length).toEqual(5);
    });
});

describe('getAttributeGroups', () => {
    test('should return attribute groups', () => {
        const groups = getAttributeGroups([{id: 1, name: 'A'}, {id: 2, name: 'B'}]);
        expect(groups.attributeGroups.length).toBe(2);
        expect(groups.attributeGroupMap.get(1)).toEqual("A");
    });
});

describe('getBusinessUnits', () => {
    test('should return business units', () => {
        const bunitsMap = getBusinessUnits(
            new Map([['001', {id: '001', shortName: 'Opco1'}], ['002', {id: '002', shortName: 'Opco2'}]])
        );
        expect(bunitsMap.length).toBe(2);
    });

    test('should return empty business units', () => {
        const bunitsMap = getBusinessUnits(null);
        expect(bunitsMap.length).toBe(0);
    });
});

describe('calculateResetIndex', () => {
    test('should calculate the reset index when index is 0', () => {
        expect(calculateResetIndex(0, 1)).toEqual(1);
    });

    test('should calculate the reset index when index < page', () => {
        expect(calculateResetIndex(1, 10)).toEqual(1);
    });

    test('should calculate the reset index when index > page', () => {
        expect(calculateResetIndex(10, 1)).toEqual(1);
    });
});

describe('updateCompletedRequest', () => {
    test('should return a completed request', () => {
        expect(updateCompletedRequest([
            [{reviewStatus: "done"}, {reviewStatus: "done"}, {reviewStatus: "start"}, {reviewStatus: "start"}],
            [{reviewStatus: "start"}, '2', '3', '4']
        ], 0, 2)).toEqual({
            "0": [{"reviewStatus": "done"}, {"reviewStatus": "done"}, {"reviewStatus": null}, {"reviewStatus": "start"}],
            "1": [{"reviewStatus": "start"},
                "2",
                "3",
                "4"
            ]
        });
    });
});

describe('constructFetchRequest', () => {
    test('should construct the initial request for GET', () => {
        expect(constructFetchRequest()).toEqual({
            "body": null,
            "credentials": "include",
            "headers": {
                "Accept": "application/json",
            },
            "method": "GET",
        });
    });

    test('should construct the initial request for POST', () => {
        expect(constructFetchRequest('POST')).toEqual({
            "body": null,
            "credentials": "include",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            "method": "POST",
        });
    });
});

describe('constructRequestUrl', () => {
    test('should construct request url correctly when empty query params are provided', () => {
        expect(constructRequestUrl('http://localhost:3000', {})).toEqual('http://localhost:3000?');
    });

    test('should construct request url correcty when non-empty query params are provided', () => {
        expect(constructRequestUrl('http://localhost:3000', {a: 'name', b: 10}))
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
    test('should return correct message when there is an error', () => {
        expect(getEmptyDataTableMessage(true)).toEqual('Sorry we could not retrieve the information');
    });

    test('should return correct message when there is not an error', () => {
        expect(getEmptyDataTableMessage(false)).toEqual('No Changes to Review');
    });

    test('should return correct message when some other passed', () => {
        expect(getEmptyDataTableMessage('A')).toEqual('Sorry we could not retrieve the information');
    });

    test('should return correct message when some other passed', () => {
        expect(getEmptyDataTableMessage(null)).toEqual('No Changes to Review');
    });
});

describe('generateReviewer', () => {
    test('should generate reviewer content correctly', () => {
        expect(generateReviewer({
            username: 'tjay5771', firstName: 'Tharuka', lastName: 'Jayalath', email: 'Tharuka.Jayalath@syscolabs.com'
        })).toEqual({
            id: 'tjay5771',
            givenName: 'Tharuka',
            surname: 'Jayalath',
            email: 'Tharuka.Jayalath@syscolabs.com'
        });
    });
});

describe('truncate', () => {
    test('should truncate the string', () => {
        expect(truncate('truncate', 3)).toEqual('...');
    });

    test('should truncate the string', () => {
        expect(truncate('truncate', 7)).toEqual('trun...');
    });

    test('should truncate the string', () => {
        expect(truncate('truncate', 8)).toEqual('truncate');
    });

    test('should truncate non string', () => {
        expect(truncate(null, 3)).toEqual('');
    });
});

describe('autoSize', () => {
    test('should autoSize the small text', () => {
        expect(autoSize('autoSize')).toEqual("1.5rem");
    });

    test('should autoSize the long text', () => {
        expect(autoSize('autoSizeautoSize')).toEqual("0.9rem");
    });

    test('should autoSize the long text', () => {
        expect(autoSize('autoSizeau')).toEqual("0.9rem");
    });

    test('should autoSize non string', () => {
        expect(autoSize(null)).toEqual("1rem");
    });
});

describe('getStyleClassByApprovalStatus', () => {
    test('should return style when approved', () => {
        expect(getStyleClassByApprovalStatus(REVIEW_STATUS_APPROVED)).toEqual('pz-aproved');
    });

    test('should return style when rejected', () => {
        expect(getStyleClassByApprovalStatus(REVIEW_STATUS_REJECTED)).toEqual('pz-rejected');
    });

    test('should return style when default', () => {
        expect(getStyleClassByApprovalStatus("DEFAULT")).toEqual('pz-already');
    });
});

describe('extractOpCoId', () => {
    test('should return the OpCo id', () => {
        expect(extractOpCoId('019-Cincinnati')).toEqual('019');
    });
});
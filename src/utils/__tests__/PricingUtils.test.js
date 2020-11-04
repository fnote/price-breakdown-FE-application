import {
    convertFactorToPercentage,
    formatPrice,
    formatPriceWithoutCurrency,
    generateDateObject,
    getFormattedPercentageValue,
    getPriceUnit,
    getReadableDiscountName,
    generateReadableDate,
    generateValidityPeriod,
    mapDiscountToDataRow,
    mapAgreementToDataRow,
    mapVolumeTierToTableRow,
    extractPricePoints,
    extractItemInfo,
    extractSiteInfo,
    getSplitStatusBySplitFlag,
    extractRequestInfo,
    prepareLocalSegmentPriceInfo,
    prepareStrikeThroughPriceInfo,
    isApplyToPriceOrBaseAgreement,
    prepareDiscountPriceInfo,
    isOfflineAgreement,
    prepareOrderUnitPriceInfo,
    prepareCustomerNetPriceInfo,
    prepareVolumePricingHeaderInfo,
    prepareVolumePricingTiers,
    prepareVolumePricingHeaderRow,
    prepareVolumePricingInfo,
} from '../PricingUtils';

describe('formatPrice', () => {
    test('should return correct value for positive amounts', () => {
        expect(formatPrice(1.23)).toEqual('$1.230');
        expect(formatPrice(10)).toEqual('$10.000');
        expect(formatPrice(0.2)).toEqual('$0.200');
        expect(formatPrice(10.23456)).toEqual('$10.235');
    });

    test('should return correct value for negative amounts', () => {
        expect(formatPrice(-1.23)).toEqual('-$1.230');
    });

    test('should return correct value for 0', () => {
        expect(formatPrice(0)).toEqual('-$0.000');
    });
});

describe('formatPriceWithoutCurrency', () => {
    test('should return correctly formatted values', () => {
        expect(formatPriceWithoutCurrency(1)).toEqual('1.000');
        expect(formatPriceWithoutCurrency(1.23342)).toEqual('1.233');
        expect(formatPriceWithoutCurrency(0)).toEqual('0.000');
        expect(formatPriceWithoutCurrency(-0.1)).toEqual('-0.100');
    });
});

describe('convertFactorToPercentage', () => {
    test('should return correctly formatted values', () => {
        expect(convertFactorToPercentage(1)).toEqual('100.000%');
        expect(convertFactorToPercentage(0.8)).toEqual('80.000%');
        expect(convertFactorToPercentage(0.876312)).toEqual('87.631%');
        expect(convertFactorToPercentage(0.0)).toEqual('0.000%');
        expect(convertFactorToPercentage(-999)).toEqual('-99900.000%');
    });
});

describe('getFormattedPercentageValue', () => {
    test('should return correctly formatted values', () => {
        expect(getFormattedPercentageValue(1)).toEqual('0.000%');
        expect(getFormattedPercentageValue(0.8)).toEqual('-20.000%');
        expect(getFormattedPercentageValue(0.876312)).toEqual('-12.369%');
        expect(getFormattedPercentageValue(0.0)).toEqual('-100.000%');
        expect(getFormattedPercentageValue(-999)).toEqual('-100000.000%');
    });
});

describe('getReadableDiscountName', () => {
    test('should return the readable name', () => {
        expect(getReadableDiscountName('STRATEGIC_DISCOUNT')).toEqual('Strategic Discount');
        expect(getReadableDiscountName('NEW_CUSTOMER_DISCOUNT')).toEqual('New Customer Discount');
        expect(getReadableDiscountName('CASE_SPLIT_UPCHARGE')).toEqual('Split Up Charge');
        expect(getReadableDiscountName('SOME_THING_ELSE')).toEqual();
    });
});

describe('getPriceUnit', () => {
    test('should return the correct value', () => {
        expect(getPriceUnit({ splitFlag: true, perWeightFlag: true })).toEqual('pound');
        expect(getPriceUnit({ splitFlag: false, perWeightFlag: true })).toEqual('pound');
        expect(getPriceUnit({ splitFlag: true, perWeightFlag: false })).toEqual('split');
        expect(getPriceUnit({ splitFlag: false, perWeightFlag: false })).toEqual('case');
        expect(getPriceUnit({})).toEqual('case');
    });
});

describe('generateDateObject', () => {
    test('should return the correct value', () => {
        const generatedDate = generateDateObject('20201025');
        expect(generatedDate.getFullYear()).toEqual(2020);
        // month is zero indexed
        expect(generatedDate.getMonth() + 1).toEqual(10);
        expect(generatedDate.getDate()).toEqual(25);
    });
});

describe('generateReadableDate', () => {
    test('should return the correct value', () => {
        expect(generateReadableDate('20201025')).toEqual('Oct 25, 2020');
    });
});

describe('generateValidityPeriod', () => {
    test('should return the correct value', () => {
        expect(generateValidityPeriod('20201025', '20201110')).toEqual('Valid Oct 25, 2020 - Nov 10, 2020');
    });
});

describe('mapDiscountToDataRow', () => {
    test('should return the correct value', () => {

        const data = { name: 'NEW_CUSTOMER_DISCOUNT',
            amount: 0.92,
            priceAdjustment: 72.23,
            effectiveFrom: '20201005',
            effectiveTo: '20201111' };
        expect(mapDiscountToDataRow(data,'something')).toEqual({
            adjustmentValue: '-8.000%',
            calculatedValue: '$72.230',
            description: 'New Customer Discount',
            source: 'something',
            validityPeriod: 'Valid Oct 5, 2020 - Nov 11, 2020'
        });
    });
});

describe('mapAgreementToDataRow', () => {
    test('should return the correct value when percentageAdjustment is present', () => {
        const data = {
            id: '1234',
            description: 'A sample description',
            percentageAdjustment: '$1.23',
            priceAdjustment: 72.23,
            effectiveFrom: '20201005',
            effectiveTo: '20201111' };
        expect(mapAgreementToDataRow(data,'something')).toEqual({
            id: '1234',
            adjustmentValue: '$1.23',
            calculatedValue: '$72.230',
            description: 'A sample description',
            source: 'something',
            validityPeriod: 'Valid Oct 5, 2020 - Nov 11, 2020'
        });
    });

    test('should return the correct value when percentageAdjustment is not present', () => {
        const data = {
            id: '1234',
            description: 'A sample description',
            priceAdjustment: 72.23,
            effectiveFrom: '20201005',
            effectiveTo: '20201111' };
        expect(mapAgreementToDataRow(data,'something')).toEqual({
            id: '1234',
            adjustmentValue: '$72.230',
            calculatedValue: '$72.230',
            description: 'A sample description',
            source: 'something',
            validityPeriod: 'Valid Oct 5, 2020 - Nov 11, 2020'
        });
    });
});

describe('mapVolumeTierToTableRow', () => {
    test('should return the correct when Between operator is used', () => {
        const data =  {
            eligibility: {
                operator: 'Between',
                lowerBound: 5,
                upperBound: 10,
            },
            discounts: [{
                amount: 12,
                priceAdjustment: 2
            }],
            isApplicable: true
        }
        expect(mapVolumeTierToTableRow(data)).toEqual({
            adjustmentValue: '1100.000%',
            calculatedValue: '$2.000',
            description: { rangeConnector: 'to', rangeEnd: 10, rangeStart: 5},
            isSelected: true,
            source: 'Discount Service'
        });
    });

    test('should return the correct when Between operator is not used', () => {
        const data =  {
            eligibility: {
                operator: '=',
                lowerBound: 5,
                upperBound: 10,
            },
            discounts: [{
                amount: 12,
                priceAdjustment: 2
            }],
            isApplicable: true
        }
        expect(mapVolumeTierToTableRow(data)).toEqual({
            adjustmentValue: '1100.000%',
            calculatedValue: '$2.000',
            description: { rangeConnector: 'and', rangeEnd: 'above', rangeStart: 5},
            isSelected: true,
            source: 'Discount Service'
        });
    });

    test('should return the correct value when different values are used for isApplicable field', () => {
        const inputData1 =  {
            eligibility: {
                operator: '=',
                lowerBound: 5,
                upperBound: 10,
            },
            discounts: [{
                amount: 12,
                priceAdjustment: 2
            }],
            isApplicable: false
        }
        expect(mapVolumeTierToTableRow(inputData1).isSelected).toEqual(false);
        const inputData2 =  {
            eligibility: {
                operator: '=',
                lowerBound: 5,
                upperBound: 10,
            },
            discounts: [{
                amount: 12,
                priceAdjustment: 2
            }],
            isApplicable: true
        }
        expect(mapVolumeTierToTableRow(inputData2).isSelected).toEqual(true);

        const inputData3 =  {
            eligibility: {
                operator: '=',
                lowerBound: 5,
                upperBound: 10,
            },
            discounts: [{
                amount: 12,
                priceAdjustment: 2
            }],
        }
        expect(mapVolumeTierToTableRow(inputData3).isSelected).toEqual(false);
    });
});


describe('extractPricePoints', () => {
    test('should return the object only with the defined set of fields', () => {
        const data = {
            grossPrice: '123',
            customerReferencePrice: '122',
            customerPrequalifiedPrice: '211',
            unitPrice: '12',
            netPrice: '124',
            anotherField: '112233',
        };
        expect(extractPricePoints(data)).toEqual({
            customerPrequalifiedPrice: "211",
            customerReferencePrice: "122",
            grossPrice: "123",
            netPrice: "124",
            unitPrice: "12"
        });
    });
});

describe('extractItemInfo', () => {
    test('should return the object only with the defined set of fields', () => {
        const data = {
            id: 1234,
            name: 'aName',
            brand: 'aBrand',
            pack: 'val',
            size: 'size',
            stockIndicator: 'P',
            catchWeightIndicator: 'C',
            averageWeight: '22',
            anotherField: '123',
        };
        expect(extractItemInfo(data)).toEqual({
            averageWeight: "22",
            brand: "aBrand",
            catchWeightIndicator: "C",
            id: 1234,
            name: "aName",
            pack: "val",
            size: "size",
            stockIndicator: "P"
        });
    });
});

describe('extractSiteInfo', () => {
    test('should return correct value when price zone is present', () => {
        const data = {
            customerAccount: 'anAccount',
            customerName: 'aName',
            customerType: 'aType',
            businessUnitNumber: '001',
            product: { priceZoneId: 1 }
        };
        expect(extractSiteInfo(data)).toEqual({
            "businessUnitNumber": "001",
            "customerAccount": "anAccount",
            "customerName": "aName",
            "customerType": "aType",
            "priceZone": 1
        });
    });

    test('should return N/A when price zone is not present', () => {
        const data = {
            customerAccount: 'anAccount',
            customerName: 'aName',
            customerType: 'aType',
            businessUnitNumber: '001',
            product: { priceZoneId: null }
        };
        expect(extractSiteInfo(data)).toEqual({
            "businessUnitNumber": "001",
            "customerAccount": "anAccount",
            "customerName": "aName",
            "customerType": "aType",
            "priceZone": "N/A"
        });
    });
});

describe('getSplitStatusBySplitFlag', () => {
    test('should return the correct value', () => {
        expect(getSplitStatusBySplitFlag(true)).toEqual('Y');
        expect(getSplitStatusBySplitFlag(false)).toEqual('N');
    });
});

describe('extractRequestInfo', () => {
    test('should return the correct value', () => {
        const data = {
            priceRequestDate: '20201028',
            product: { splitFlag: true, quantity: 5 }
        };
        expect(extractRequestInfo(data)).toEqual({"priceRequestDate": "Oct 28, 2020", "quantity": 5, "splitStatus": "Y"});
    });
});

describe('prepareLocalSegmentPriceInfo', () => {
    test('should return the correct value', () => {
        const data = {
            discounts: [
                {
                    id: 1111,
                    type: 'REFERENCE_PRICE',
                    name: 'NEW_CUSTOMER_DISCOUNT',
                    amount: 0.99,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201025',
                    effectiveTo: '20201113'
                },
                {   id: 2222,
                    type: 'PREQUALIFIED',
                    name: 'STRATERGIC_DISCOUNT',
                    amount: 0.92,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201005',
                    effectiveTo: '20201111'
                }],
            referencePriceRoundingAdjustment: 1.23,
            grossPrice: 5.28 };

        expect(prepareLocalSegmentPriceInfo(data)).toEqual([{
            "calculatedValue": "$5.280",
            "description": "Local Segment Reference Price (Gross)"
        }, {
            "id": 1111,
            "adjustmentValue": "-1.000%",
            "calculatedValue": "$72.230",
            "description": "New Customer Discount",
            "source": "Discount Service",
            "validityPeriod": "Valid Oct 25, 2020 - Nov 13, 2020"
        }, {"adjustmentValue": " ", "calculatedValue": "$1.230", "description": "Rounding", "source": "System"}]);
    });
});

describe('prepareStrikeThroughPriceInfo', () => {
    test('should ', () => {
        const data = {
            discounts: [
                {
                    type: 'PREQUALIFIED',
                    name: 'CASE_SPLIT_UPCHARGE',
                    amount: 0.94,
                    priceAdjustment: 82.33,
                    effectiveFrom: '20201025',
                    effectiveTo: '20201113'
                },
                {
                    type: 'REFERENCE_PRICE',
                    name: 'NEW_CUSTOMER_DISCOUNT',
                    amount: 0.94,
                    priceAdjustment: 42.23,
                    effectiveFrom: '20101025',
                    effectiveTo: '20201112'
                },
                {
                    type: 'PREQUALIFIED',
                    name: 'CASE_VOLUME_DISCOUNT',
                    amount: 0.92,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201005',
                    effectiveTo: '20201111'
                }],
            customerReferencePrice: 1.23 };

        expect(prepareStrikeThroughPriceInfo(data)).toEqual([{
            "adjustmentValue": " ",
            "calculatedValue": "$1.230",
            "description": "Customer Reference Price"
        }, {
            "adjustmentValue": "-6.000%",
            "calculatedValue": "$82.330",
            "description": "Split Up Charge",
            "source": "Discount Service",
            "validityPeriod": "Valid Oct 25, 2020 - Nov 13, 2020"
        }]);
    });
});

describe('isApplyToPriceOrBaseAgreement', () => {
    test('should return the correct value', () => {
        expect(isApplyToPriceOrBaseAgreement({ applicationCode: 'P'})).toEqual(true);
        expect(isApplyToPriceOrBaseAgreement({ applicationCode: 'B'})).toEqual(true);
        expect(isApplyToPriceOrBaseAgreement({ applicationCode: 'T'})).toEqual(false);
        expect(isApplyToPriceOrBaseAgreement({ applicationCode: 'L'})).toEqual(false);
    });
});

describe('prepareDiscountPriceInfo', () => {
    test('should return the correct value', () => {
        const data = {
            agreements: [
                {
                    id: '1234',
                    applicationCode: 'P',
                    description: 'A sample description1',
                    percentageAdjustment: '$1.23',
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201005',
                    effectiveTo: '20201111'
                },
                {
                    id: '432',
                    applicationCode: 'T',
                    description: 'A sample description2',
                    percentageAdjustment: '$132.23',
                    priceAdjustment: 92.13,
                    effectiveFrom: '20201001',
                    effectiveTo: '20201118'
                }
            ],
            customerPrequalifiedPrice: 1.53}
        expect(prepareDiscountPriceInfo(data)).toEqual([{
            "adjustmentValue": " ",
            "calculatedValue": "$1.530",
            "description": "Discount Price"
        }, {
            "adjustmentValue": "$1.23",
            "calculatedValue": "$72.230",
            "description": "A sample description1",
            "id": "1234",
            "source": "SUS",
            "validityPeriod": "Valid Oct 5, 2020 - Nov 11, 2020"
        }]);
    });
});

describe('isOfflineAgreement', () => {
    test('should return the correct value', () => {
        expect(isOfflineAgreement({ applicationCode: 'P'})).toEqual(false);
        expect(isOfflineAgreement({ applicationCode: 'B'})).toEqual(false);
        expect(isOfflineAgreement({ applicationCode: 'T'})).toEqual(true);
        expect(isOfflineAgreement({ applicationCode: 'L'})).toEqual(true);
    });
});

describe('prepareOrderUnitPriceInfo', () => {
    test('should return the correct value', () => {
        const data = {
            agreements: [
                {
                    id: '1234',
                    applicationCode: 'P',
                    description: 'A sample description1',
                    percentageAdjustment: '$1.23',
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201005',
                    effectiveTo: '20201111'
                },
                {
                    id: '432',
                    applicationCode: 'T',
                    description: 'A sample description2',
                    percentageAdjustment: '$132.23',
                    priceAdjustment: 92.13,
                    effectiveFrom: '20201001',
                    effectiveTo: '20201118'
                }
            ],
            unitPrice: 2.53}
        expect(prepareOrderUnitPriceInfo(data)).toEqual([{
            "adjustmentValue": " ",
            "calculatedValue": "$2.530",
            "description": "Order Unit Price"
        }, {
            "adjustmentValue": "$132.23",
            "calculatedValue": "$92.130",
            "description": "A sample description2",
            "id": "432",
            "source": "SUS",
            "validityPeriod": "Valid Oct 1, 2020 - Nov 18, 2020"
        }]);
    });
});

describe('prepareCustomerNetPriceInfo', () => {
    test('should return the correct value', () => {
        expect(prepareCustomerNetPriceInfo({ netPrice: 32.3})).toEqual([{
            "adjustmentValue": " ",
            "calculatedValue": "$32.300",
            "description": "Customer Net Price"
        }]);
    });
});

describe('prepareVolumePricingHeaderInfo', () => {
    test('should return the correct value', () => {
        const data = {
            discounts: [
                {
                    type: 'PREQUALIFIED',
                    name: 'CASE_SPLIT_UPCHARGE',
                    amount: 0.94,
                    priceAdjustment: 82.33,
                    effectiveFrom: '20201025',
                    effectiveTo: '20201113'
                },
                {
                    type: 'REFERENCE_PRICE',
                    name: 'NEW_CUSTOMER_DISCOUNT',
                    amount: 0.94,
                    priceAdjustment: 42.23,
                    effectiveFrom: '20101025',
                    effectiveTo: '20201112'
                }]
        };
        expect(prepareVolumePricingHeaderInfo(data)).toEqual({
            "description": "Item/Order Specific promotions",
            "validityPeriod": "Valid Oct 25, 2020 - Nov 13, 2020"
        })
    });
});

describe('prepareVolumePricingTiers', () => {
    test('should return the correct value', () => {
        const volumePricingTiers = [
            {
                eligibility: {
                    operator: 'Between',
                    lowerBound: 5,
                    upperBound: 10,
                },
                discounts: [{
                    amount: 12,
                    priceAdjustment: 2
                }],
                isApplicable: true
            }
        ]
        expect(prepareVolumePricingTiers({ volumePricingTiers })).toEqual([{
            "adjustmentValue": "1100.000%",
            "calculatedValue": "$2.000",
            "description": {"rangeConnector": "to", "rangeEnd": 10, "rangeStart": 5},
            "isSelected": true,
            "source": "Discount Service"
        }]);
    });
});

describe('prepareVolumePricingHeaderRow', () => {
    test('should return the correct value when volumePricingTiers is empty', () => {
        expect(prepareVolumePricingHeaderRow({ volumePricingTiers: []})).toEqual(null);
    });

    test('should return the correct value when volumePricingTiers contials values', () => {
        const volumePricingTiers = [
            {
                discounts: [
                    {
                        type: 'PREQUALIFIED',
                        name: 'CASE_SPLIT_UPCHARGE',
                        amount: 0.94,
                        priceAdjustment: 82.33,
                        effectiveFrom: '20201025',
                        effectiveTo: '20201113'
                    }]
            },
            {
                discounts: [
                    {
                        type: 'REFERENCE_PRICE',
                        name: 'NEW_CUSTOMER_DISCOUNT',
                        amount: 0.94,
                        priceAdjustment: 42.23,
                        effectiveFrom: '20101025',
                        effectiveTo: '20201112'
                    }]
            }];
        expect(prepareVolumePricingHeaderRow({ volumePricingTiers })).toEqual({
            "description": "Item/Order Specific promotions",
            "validityPeriod": "Valid Oct 25, 2020 - Nov 13, 2020"
        });
    });
});

describe('prepareVolumePricingInfo', () => {
    test('should return the correct value when volumePricingTiers is not empty', () => {
        const data =  {
            eligibility: {
                operator: 'Between',
                lowerBound: 5,
                upperBound: 10,
            },
            discounts: [{
                amount: 12,
                priceAdjustment: 2,
                type: 'PREQUALIFIED',
                name: 'CASE_SPLIT_UPCHARGE',
                effectiveFrom: '20201025',
                effectiveTo: '20201113'
            }],
            isApplicable: true
        }

        const volumePricingTiers = [data];
        expect(prepareVolumePricingInfo({ volumePricingTiers })).toEqual({
            "volumePricingHeaderRow": {
                "description": "Item/Order Specific promotions",
                "validityPeriod": "Valid Oct 25, 2020 - Nov 13, 2020"
            },
            "volumePricingTiers": [{
                "adjustmentValue": "1100.000%",
                "calculatedValue": "$2.000",
                "description": {"rangeConnector": "to", "rangeEnd": 10, "rangeStart": 5},
                "isSelected": true,
                "source": "Discount Service"
            }]
        });
    });

    test('should return the correct value when volumePricingTiers is empty', () => {
        const volumePricingTiers = [];
        expect(prepareVolumePricingInfo({volumePricingTiers})).toEqual({
            "volumePricingHeaderRow": null,
            "volumePricingTiers": []
        });
    });
});

import {
    convertFactorToPercentage,
    extractItemInfo,
    extractPricePoints, extractRequestInfo,
    extractSiteInfo,
    formatBaseValueName,
    formatFactorDetails,
    formatPrice,
    formatPriceWithoutCurrency,
    generateDateObject,
    generateReadableDate,
    generateValidityPeriod,
    getFormattedPercentageValue,
    getPriceUnit,
    getReadableDiscountName,
    getSplitStatusBySplitFlag,
    isApplyToPriceOrBaseAgreement,
    isOfflineAgreement,
    mapAgreementToDataRow,
    mapDiscountToDataRow,
    mapVolumeTierToTableRow,
    prepareCustomerNetPriceInfo,
    prepareDefaultPriceRuleSection,
    prepareDiscountPriceInfo,
    prepareLocalSegmentPriceInfo,
    prepareOrderUnitPriceInfo,
    prepareStrikeThroughPriceInfo,
    prepareVolumePricingHeaderInfo,
    prepareVolumePricingHeaderRow,
    prepareVolumePricingInfo,
    prepareVolumePricingTiers,
} from '../PricingUtils';

describe('formatPrice', () => {
    test('should return correct value for positive amounts', () => {
        expect(formatPrice(1.23, {})).toEqual('$1.23');
        expect(formatPrice(10, {})).toEqual('$10.00');
        expect(formatPrice(0.2, {})).toEqual('$0.20');
        expect(formatPrice(10.23456, {})).toEqual('$10.23');
    });

    test('should return correct value for negative amounts', () => {
        expect(formatPrice(-1.23, {})).toEqual('-$1.23');
    });

    test('should return correct value for 0', () => {
        expect(formatPrice(0, {})).toEqual('$0.00');
    });
});

describe('formatFactorDetails', () => {
    test('should return % and sign when factor calc method is MKP', () => {
        const data = {
            name: 'P1P',
            baseValue: 5.8400,
            baseValueName: 'P1',
            factorCalcMethod: 'MKP',
            factorSign: '+',
            factorValue: 4.5
        };
        expect(formatFactorDetails(data)).toEqual('+4.5%');
    });
    test('should return % and sign when factor calc method is MGN', () => {
        const data = {
            name: 'P1P',
            baseValue: 5.8400,
            baseValueName: 'P1',
            factorCalcMethod: 'MGN',
            factorSign: '+',
            factorValue: 4.5
        };
        expect(formatFactorDetails(data)).toEqual('+4.5%');
    });
    test('should return $ and sign when factor calc method is $ per case or $ per pound', () => {
        const data = {
            name: 'P1P',
            baseValue: 5.8400,
            baseValueName: 'P1',
            factorCalcMethod: 'c',
            factorSign: '+',
            factorValue: 4.5
        };
        expect(formatFactorDetails(data)).toEqual('+$4.5');
    });
});

describe('formatBaseValueName', () => {
    test('should return UNKNOWN when base value name is blank', () => {
        const data = {
            name: 'P1P',
            baseValue: 5.8400,
            baseValueName: '',
            factorCalcMethod: 'MKP',
            factorSign: '+',
            factorValue: 4.5
        };
        expect(formatBaseValueName(data)).toEqual('UNKNOWN');
    });
    test('should return UNKNOWN when base value name is blank', () => {
        const data = {
            name: 'P1P',
            baseValue: 5.8400,
            baseValueName: null,
            factorCalcMethod: 'MGN',
            factorSign: '+',
            factorValue: 4.5
        };
        expect(formatBaseValueName(data)).toEqual('UNKNOWN');
    });
    test('should return proper base value name when base value name is present', () => {
        const data = {
            name: 'P1P',
            baseValue: 5.8400,
            baseValueName: 'P1',
            factorCalcMethod: 'c',
            factorSign: '+',
            factorValue: 4.5
        };
        expect(formatBaseValueName(data)).toEqual('P1');
    });
});

describe('formatPriceWithoutCurrency', () => {
    test('should return correctly formatted values', () => {
        expect(formatPriceWithoutCurrency(1, {perWeightFlag: false})).toEqual('1.00');
        expect(formatPriceWithoutCurrency(1.23342, {perWeightFlag: false})).toEqual('1.23');
        expect(formatPriceWithoutCurrency(0, {perWeightFlag: false})).toEqual('0.00');
        expect(formatPriceWithoutCurrency(-0.1, {perWeightFlag: false})).toEqual('-0.10');
        expect(formatPriceWithoutCurrency(1, {perWeightFlag: true, useFixedFractionDigits: false})).toEqual('1.000');
        expect(formatPriceWithoutCurrency(1, {perWeightFlag: true, useFixedFractionDigits: true})).toEqual('1.00');
    });
});

describe('convertFactorToPercentage', () => {
    test('should return correctly formatted values', () => {
        expect(convertFactorToPercentage(1)).toEqual('100.00%');
        expect(convertFactorToPercentage(0.8)).toEqual('80.00%');
        expect(convertFactorToPercentage(0.876312)).toEqual('87.63%');
        expect(convertFactorToPercentage(0.0)).toEqual('0.00%');
        expect(convertFactorToPercentage(-999)).toEqual('-99900.00%');
    });
});

describe('getFormattedPercentageValue', () => {
    test('should return correctly formatted values', () => {
        expect(getFormattedPercentageValue(1)).toEqual('0.00%');
        expect(getFormattedPercentageValue(0.8)).toEqual('-20.00%');
        expect(getFormattedPercentageValue(0.876312)).toEqual('-12.37%');
        expect(getFormattedPercentageValue(0.0)).toEqual('-100.00%');
        expect(getFormattedPercentageValue(-999)).toEqual('-100000.00%');
    });
});

describe('getReadableDiscountName', () => {
    test('should return the readable name', () => {
        expect(getReadableDiscountName('STRATEGIC_RPA_DISCOUNT')).toEqual('Strategic RPA Discount');
        expect(getReadableDiscountName('NEW_CUSTOMER_DISCOUNT')).toEqual('New Customer Discount');
        expect(getReadableDiscountName('CASE_SPLIT_UPCHARGE')).toEqual('Split Up Charge');
        expect(getReadableDiscountName('SOME_THING_ELSE')).toEqual();
    });
});

describe('getPriceUnit', () => {
    test('should return the correct value', () => {
        expect(getPriceUnit({splitFlag: true, perWeightFlag: true})).toEqual('pound');
        expect(getPriceUnit({splitFlag: false, perWeightFlag: true})).toEqual('pound');
        expect(getPriceUnit({splitFlag: true, perWeightFlag: false})).toEqual('each');
        expect(getPriceUnit({splitFlag: false, perWeightFlag: false})).toEqual('case');
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
        const data = {
            name: 'NEW_CUSTOMER_DISCOUNT',
            amount: 0.92,
            priceAdjustment: 72.23,
            effectiveFrom: '20201005',
            effectiveTo: '20201111'
        };
        expect(mapDiscountToDataRow(data, 'something', {perWeightFlag: false})).toEqual({
            adjustmentValue: '-8.00%',
            calculatedValue: '$72.23',
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
            effectiveTo: '20201111'
        };
        expect(mapAgreementToDataRow(data, 'something', {perWeightFlag: false})).toEqual({
            id: '1234',
            adjustmentValue: '$1.23',
            calculatedValue: '$72.23',
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
            effectiveTo: '20201111'
        };
        expect(mapAgreementToDataRow(data, 'something', {perWeightFlag: false})).toEqual({
            id: '1234',
            adjustmentValue: '$72.23',
            calculatedValue: '$72.23',
            description: 'A sample description',
            source: 'something',
            validityPeriod: 'Valid Oct 5, 2020 - Nov 11, 2020'
        });
    });
});

describe('mapVolumeTierToTableRow', () => {
    test('should return the correct when Between operator is used', () => {
        const data = {
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
        };
        expect(mapVolumeTierToTableRow(data, {perWeightFlag: false})).toEqual({
            adjustmentValue: '1100.00%',
            calculatedValue: '$2.00',
            description: {rangeConnector: 'to', rangeEnd: 10, rangeStart: 5},
            isSelected: true,
            source: 'Discount Service'
        });
    });

    test('should return the correct when Between operator is not used', () => {
        const data = {
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
        };
        expect(mapVolumeTierToTableRow(data, {perWeightFlag: false})).toEqual({
            adjustmentValue: '1100.00%',
            calculatedValue: '$2.00',
            description: {rangeConnector: 'and', rangeEnd: 'above', rangeStart: 5},
            isSelected: true,
            source: 'Discount Service'
        });
    });

    test('should return the correct value when different values are used for isApplicable field', () => {
        const inputData1 = {
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
        };
        expect(mapVolumeTierToTableRow(inputData1, {perWeightFlag: false}).isSelected).toEqual(false);
        const inputData2 = {
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
        };
        expect(mapVolumeTierToTableRow(inputData2, {perWeightFlag: false}).isSelected).toEqual(true);

        const inputData3 = {
            eligibility: {
                operator: '=',
                lowerBound: 5,
                upperBound: 10,
            },
            discounts: [{
                amount: 12,
                priceAdjustment: 2
            }],
        };
        expect(mapVolumeTierToTableRow(inputData3, {perWeightFlag: false}).isSelected).toEqual(false);
    });

    test('should return the correct when Between operator is used and lower and upper bound are equal', () => {
        const data = {
            eligibility: {
                operator: 'Between',
                lowerBound: 5,
                upperBound: 5,
            },
            discounts: [{
                amount: 12,
                priceAdjustment: 2
            }],
            isApplicable: true
        };
        expect(mapVolumeTierToTableRow(data, {perWeightFlag: false})).toEqual({
            adjustmentValue: '1100.00%',
            calculatedValue: '$2.00',
            description: {rangeConnector: '', rangeEnd: '', rangeStart: 5},
            isSelected: true,
            source: 'Discount Service'
        });
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
            customerPrequalifiedPrice: '211',
            customerReferencePrice: '122',
            grossPrice: '123',
            netPrice: '124',
            unitPrice: '12'
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
            averageWeight: '22',
            brand: 'aBrand',
            catchWeightIndicator: 'C',
            id: 1234,
            name: 'aName',
            pack: 'val',
            size: 'size',
            stockIndicator: 'P'
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
            product: {priceZoneId: 1}
        };
        expect(extractSiteInfo(data)).toEqual({
            'businessUnitNumber': '001',
            'customerAccount': 'anAccount',
            'customerName': 'aName',
            'customerType': 'aType',
            'priceZone': 1
        });
    });

    test('should return N/A when price zone is not present', () => {
        const data = {
            customerAccount: 'anAccount',
            customerName: 'aName',
            customerType: 'aType',
            businessUnitNumber: '001',
            product: {priceZoneId: null}
        };
        expect(extractSiteInfo(data)).toEqual({
            'businessUnitNumber': '001',
            'customerAccount': 'anAccount',
            'customerName': 'aName',
            'customerType': 'aType',
            'priceZone': 'N/A'
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
            product: {splitFlag: true, quantity: 5}
        };
        expect(extractRequestInfo(data)).toEqual({
            'priceRequestDate': 'Oct 28, 2020',
            'quantity': 5,
            'splitStatus': 'Y'
        });
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
                {
                    id: 2222,
                    type: 'PREQUALIFIED',
                    name: 'STRATERGIC_DISCOUNT',
                    amount: 0.92,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201005',
                    effectiveTo: '20201111'
                }],
            referencePriceRoundingAdjustment: 1.23,
            grossPrice: 5.28,
            perWeightFlag: false,
            isPricedFromReferencePrice: true,
            priceSource: 96
        };

        expect(prepareLocalSegmentPriceInfo(data)).toEqual([{
            'calculatedValue': '$5.28',
            'description': 'Local Segment Reference Price (Gross)'
        }, {
            'id': 1111,
            'adjustmentValue': '-1.00%',
            'calculatedValue': '$72.23',
            'description': 'New Customer Discount',
            'source': 'Discount Service',
            'validityPeriod': 'Valid Oct 25, 2020 - Nov 13, 2020'
        }, {
            'adjustmentValue': ' ', 'calculatedValue': '$1.23', 'description': 'Rounding', 'source': 'System'
        }]);
    });

    test('should return the correct value when priced with PA, catch-weight item, gross price < $10', () => {
        const data = {
            discounts: [
                {
                    id: 1111,
                    type: 'REFERENCE_PRICE',
                    name: 'STRATEGIC_RPA_DISCOUNT',
                    amount: 0.99,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201025',
                    effectiveTo: '20201113'
                },
                {
                    id: 2222,
                    type: 'PREQUALIFIED',
                    name: 'NEW_CUSTOMER_DISCOUNT',
                    amount: 0.92,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201005',
                    effectiveTo: '20201111'
                }],
            referencePriceRoundingAdjustment: 0.002,
            isPricedFromReferencePrice: true,
            grossPrice: 5.280,
            perWeightFlag: true,
            priceSource: 97
        };

        expect(prepareLocalSegmentPriceInfo(data)).toEqual([{
            'calculatedValue': '$5.280',
            'description': 'Local Segment Reference Price (Gross)'
        }, {
            'id': 1111,
            'adjustmentValue': '-1.00%',
            'calculatedValue': '$72.230',
            'description': 'Strategic RPA Discount',
            'source': 'Discount Service',
            'validityPeriod': 'Valid Oct 25, 2020 - Nov 13, 2020'
        }, {
            'adjustmentValue': ' ', 'calculatedValue': '$0.002', 'description': 'Rounding', 'source': 'System'
        }]);
    });

    test('should return the correct value when priced with PA, catch-weight item, gross price = $10', () => {
        const data = {
            discounts: [
                {
                    id: 1111,
                    type: 'REFERENCE_PRICE',
                    name: 'STRATEGIC_RPA_DISCOUNT',
                    amount: 0.99,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201025',
                    effectiveTo: '20201113'
                },
                {
                    id: 2222,
                    type: 'PREQUALIFIED',
                    name: 'NEW_CUSTOMER_DISCOUNT',
                    amount: 0.92,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201005',
                    effectiveTo: '20201111'
                }],
            referencePriceRoundingAdjustment: 0.02,
            grossPrice: 10.000,
            perWeightFlag: true,
            isPricedFromReferencePrice: true,
            priceSource: 61
        };

        expect(prepareLocalSegmentPriceInfo(data)).toEqual([{
            'calculatedValue': '$10.000',
            'description': 'Local Segment Reference Price (Gross)'
        }, {
            'id': 1111,
            'adjustmentValue': '-1.00%',
            'calculatedValue': '$72.230',
            'description': 'Strategic RPA Discount',
            'source': 'Discount Service',
            'validityPeriod': 'Valid Oct 25, 2020 - Nov 13, 2020'
        }, {
            'adjustmentValue': ' ', 'calculatedValue': '$0.020', 'description': 'Rounding', 'source': 'System'
        }]);
    });

    test('should return the correct value when priced with PA, catch-weight item, gross price > $10', () => {
        const data = {
            discounts: [
                {
                    id: 1111,
                    type: 'REFERENCE_PRICE',
                    name: 'STRATEGIC_RPA_DISCOUNT',
                    amount: 0.99,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201025',
                    effectiveTo: '20201113'
                },
                {
                    id: 2222,
                    type: 'PREQUALIFIED',
                    name: 'NEW_CUSTOMER_DISCOUNT',
                    amount: 0.92,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201005',
                    effectiveTo: '20201111'
                }],
            referencePriceRoundingAdjustment: 0.02,
            grossPrice: 10.01,
            perWeightFlag: true,
            isPricedFromReferencePrice: true,
            priceSource: 52
        };

        expect(prepareLocalSegmentPriceInfo(data)).toEqual([{
            'calculatedValue': '$10.010',
            'description': 'Local Segment Reference Price (Gross)'
        }, {
            'id': 1111,
            'adjustmentValue': '-1.00%',
            'calculatedValue': '$72.230',
            'description': 'Strategic RPA Discount',
            'source': 'Discount Service',
            'validityPeriod': 'Valid Oct 25, 2020 - Nov 13, 2020'
        }, {
            'adjustmentValue': ' ', 'calculatedValue': '$0.020', 'description': 'Rounding', 'source': 'System'
        }]);
    });

    test('should return the correct value when priced with non PA, catch-weight item, gross price > $10', () => {
        const data = {
            discounts: [],
            referencePriceRoundingAdjustment: 0.02,
            grossPrice: 10.01,
            perWeightFlag: true,
            isPricedFromReferencePrice: false,
            priceSource: 61
        };

        expect(prepareLocalSegmentPriceInfo(data)).toEqual([{
            'calculatedValue': '$10.010',
            'description': 'Local Segment Reference Price (Gross)'
        }]);
    });
});

describe('prepareStrikeThroughPriceInfo', () => {
    test('should ', () => {
        const data = {
            discounts: [
                {
                    id: 1111,
                    type: 'PREQUALIFIED',
                    name: 'CASE_SPLIT_UPCHARGE',
                    amount: 0.94,
                    priceAdjustment: 82.33,
                    effectiveFrom: '20201025',
                    effectiveTo: '20201113'
                },
                {
                    id: 2222,
                    type: 'REFERENCE_PRICE',
                    name: 'NEW_CUSTOMER_DISCOUNT',
                    amount: 0.94,
                    priceAdjustment: 42.23,
                    effectiveFrom: '20101025',
                    effectiveTo: '20201112'
                },
                {
                    id: 3333,
                    type: 'PREQUALIFIED',
                    name: 'CASE_VOLUME_DISCOUNT',
                    amount: 0.92,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201005',
                    effectiveTo: '20201111'
                }],
            customerReferencePrice: 1.23,
            perWeightFlag: false
        };

        expect(prepareStrikeThroughPriceInfo(data)).toEqual([{
            'adjustmentValue': ' ',
            'calculatedValue': '$1.23',
            'description': 'Customer Reference Price'
        }, {
            'id': 1111,
            'adjustmentValue': '-6.00%',
            'calculatedValue': '$82.33',
            'description': 'Split Up Charge',
            'source': 'Discount Service',
            'validityPeriod': 'Valid Oct 25, 2020 - Nov 13, 2020'
        }]);
    });

    test('should ', () => {
        const data = {
            discounts: [
                {
                    id: 1111,
                    type: 'PREQUALIFIED',
                    name: 'CASE_SPLIT_UPCHARGE',
                    amount: 0.94,
                    priceAdjustment: 82.33,
                    effectiveFrom: '20201025',
                    effectiveTo: '20201113'
                },
                {
                    id: 2222,
                    type: 'REFERENCE_PRICE',
                    name: 'NEW_CUSTOMER_DISCOUNT',
                    amount: 0.94,
                    priceAdjustment: 42.23,
                    effectiveFrom: '20101025',
                    effectiveTo: '20201112'
                },
                {
                    id: 3333,
                    type: 'PREQUALIFIED',
                    name: 'CASE_VOLUME_DISCOUNT',
                    amount: 0.92,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201005',
                    effectiveTo: '20201111'
                }],
            customerReferencePrice: 1.23,
            perWeightFlag: false
        };

        expect(prepareStrikeThroughPriceInfo(data)).toEqual([{
            'adjustmentValue': ' ',
            'calculatedValue': '$1.23',
            'description': 'Customer Reference Price'
        }, {
            'id': 1111,
            'adjustmentValue': '-6.00%',
            'calculatedValue': '$82.33',
            'description': 'Split Up Charge',
            'source': 'Discount Service',
            'validityPeriod': 'Valid Oct 25, 2020 - Nov 13, 2020'
        }]);
    });

    test('should return correct values when priced with PA, catch-weight item, gross price < $10', () => {
        const data = {
            discounts: [
                {
                    id: 1111,
                    type: 'PREQUALIFIED',
                    name: 'CASE_SPLIT_UPCHARGE',
                    amount: 0.94,
                    priceAdjustment: 82.33,
                    effectiveFrom: '20201025',
                    effectiveTo: '20201113'
                },
                {
                    id: 2222,
                    type: 'REFERENCE_PRICE',
                    name: 'NEW_CUSTOMER_DISCOUNT',
                    amount: 0.94,
                    priceAdjustment: 42.23,
                    effectiveFrom: '20101025',
                    effectiveTo: '20201112'
                },
                {
                    id: 3333,
                    type: 'PREQUALIFIED',
                    name: 'CASE_VOLUME_DISCOUNT',
                    amount: 0.92,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201005',
                    effectiveTo: '20201111'
                }],
            customerReferencePrice: 1.23,
            perWeightFlag: true,
            priceSource: 97,
            grossPrice: 1.22
        };

        expect(prepareStrikeThroughPriceInfo(data)).toEqual([{
            'adjustmentValue': ' ',
            'calculatedValue': '$1.230',
            'description': 'Customer Reference Price'
        }, {
            'id': 1111,
            'adjustmentValue': '-6.00%',
            'calculatedValue': '$82.330',
            'description': 'Split Up Charge',
            'source': 'Discount Service',
            'validityPeriod': 'Valid Oct 25, 2020 - Nov 13, 2020'
        }]);
    });

    test('should return correct values when priced with PA, catch-weight item, gross price = $10', () => {
        const data = {
            discounts: [
                {
                    id: 1111,
                    type: 'PREQUALIFIED',
                    name: 'CASE_SPLIT_UPCHARGE',
                    amount: 0.94,
                    priceAdjustment: 82.33,
                    effectiveFrom: '20201025',
                    effectiveTo: '20201113'
                },
                {
                    id: 2222,
                    type: 'REFERENCE_PRICE',
                    name: 'NEW_CUSTOMER_DISCOUNT',
                    amount: 0.94,
                    priceAdjustment: 42.23,
                    effectiveFrom: '20101025',
                    effectiveTo: '20201112'
                },
                {
                    id: 3333,
                    type: 'PREQUALIFIED',
                    name: 'CASE_VOLUME_DISCOUNT',
                    amount: 0.92,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201005',
                    effectiveTo: '20201111'
                }],
            customerReferencePrice: 10.23,
            isPricedFromReferencePrice: true,
            perWeightFlag: true,
            priceSource: 97,
            grossPrice: 10.000
        };

        expect(prepareStrikeThroughPriceInfo(data)).toEqual([{
            'adjustmentValue': ' ',
            'calculatedValue': '$10.23',
            'description': 'Customer Reference Price'
        }, {
            'id': 1111,
            'adjustmentValue': '-6.00%',
            'calculatedValue': '$82.330',
            'description': 'Split Up Charge',
            'source': 'Discount Service',
            'validityPeriod': 'Valid Oct 25, 2020 - Nov 13, 2020'
        }]);
    });

    test('should return correct values when priced with PA, catch-weight item, gross price > $10', () => {
        const data = {
            discounts: [
                {
                    id: 1111,
                    type: 'PREQUALIFIED',
                    name: 'CASE_SPLIT_UPCHARGE',
                    amount: 0.94,
                    priceAdjustment: 82.33,
                    effectiveFrom: '20201025',
                    effectiveTo: '20201113'
                },
                {
                    id: 2222,
                    type: 'REFERENCE_PRICE',
                    name: 'NEW_CUSTOMER_DISCOUNT',
                    amount: 0.94,
                    priceAdjustment: 42.23,
                    effectiveFrom: '20101025',
                    effectiveTo: '20201112'
                },
                {
                    id: 3333,
                    type: 'PREQUALIFIED',
                    name: 'CASE_VOLUME_DISCOUNT',
                    amount: 0.92,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201005',
                    effectiveTo: '20201111'
                }],
            customerReferencePrice: 10.25,
            isPricedFromReferencePrice: true,
            perWeightFlag: true,
            priceSource: 97,
            grossPrice: 10.22
        };

        expect(prepareStrikeThroughPriceInfo(data)).toEqual([{
            'adjustmentValue': ' ',
            'calculatedValue': '$10.25',
            'description': 'Customer Reference Price'
        }, {
            'id': 1111,
            'adjustmentValue': '-6.00%',
            'calculatedValue': '$82.330',
            'description': 'Split Up Charge',
            'source': 'Discount Service',
            'validityPeriod': 'Valid Oct 25, 2020 - Nov 13, 2020'
        }]);
    });

    test('should return correct values when priced with non PA, catch-weight item, gross price > $10', () => {
        const data = {
            discounts: [
                {
                    id: 1111,
                    type: 'PREQUALIFIED',
                    name: 'CASE_SPLIT_UPCHARGE',
                    amount: 0.94,
                    priceAdjustment: 82.33,
                    effectiveFrom: '20201025',
                    effectiveTo: '20201113'
                },
                {
                    id: 2222,
                    type: 'REFERENCE_PRICE',
                    name: 'NEW_CUSTOMER_DISCOUNT',
                    amount: 0.94,
                    priceAdjustment: 42.23,
                    effectiveFrom: '20101025',
                    effectiveTo: '20201112'
                },
                {
                    id: 3333,
                    type: 'PREQUALIFIED',
                    name: 'CASE_VOLUME_DISCOUNT',
                    amount: 0.92,
                    priceAdjustment: 72.23,
                    effectiveFrom: '20201005',
                    effectiveTo: '20201111'
                }],
            customerReferencePrice: 10.25,
            perWeightFlag: true,
            priceSource: 65,
            grossPrice: 10.22
        };

        expect(prepareStrikeThroughPriceInfo(data)).toEqual([{
            'adjustmentValue': ' ',
            'calculatedValue': '$10.250',
            'description': 'Customer Reference Price'
        }, {
            'id': 1111,
            'adjustmentValue': '-6.00%',
            'calculatedValue': '$82.330',
            'description': 'Split Up Charge',
            'source': 'Discount Service',
            'validityPeriod': 'Valid Oct 25, 2020 - Nov 13, 2020'
        }]);
    });
});

describe('isApplyToPriceOrBaseAgreement', () => {
    test('should return the correct value', () => {
        expect(isApplyToPriceOrBaseAgreement({applicationCode: 'P'})).toEqual(true);
        expect(isApplyToPriceOrBaseAgreement({applicationCode: 'B'})).toEqual(true);
        expect(isApplyToPriceOrBaseAgreement({applicationCode: 'T'})).toEqual(false);
        expect(isApplyToPriceOrBaseAgreement({applicationCode: 'L'})).toEqual(false);
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
            customerPrequalifiedPrice: 1.53,
            perWeightFlag: false

        };
        expect(prepareDiscountPriceInfo(data)).toEqual([{
            'adjustmentValue': ' ',
            'calculatedValue': '$1.53',
            'description': 'Discount Price'
        }, {
            'adjustmentValue': '$1.23',
            'calculatedValue': '$72.23',
            'description': 'A sample description1',
            'id': '1234',
            'source': 'SUS',
            'validityPeriod': 'Valid Oct 5, 2020 - Nov 11, 2020'
        }]);
    });

    test('should return the correct value when there is a exception price', () => {
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
            customerPrequalifiedPrice: 15.53,
            perWeightFlag: false,
            exception: {
                id: 1111,
                price: 10.03,
                effectiveFrom: '20201005',
                effectiveTo: '20201111'
            }

        };
        expect(prepareDiscountPriceInfo(data)).toEqual([{
            'adjustmentValue': ' ',
            'calculatedValue': '$15.53',
            'description': 'Discount Price'
        }, {
            'adjustmentValue': '$1.23',
            'calculatedValue': '$72.23',
            'description': 'A sample description1',
            'id': '1234',
            'source': 'SUS',
            'validityPeriod': 'Valid Oct 5, 2020 - Nov 11, 2020'
        },
            {
                'adjustmentValue': '$10.03',
                'calculatedValue': '-$5.50',
                'description': 'Exception Deal',
                'id': 1111,
                'validityPeriod': 'Valid Oct 5, 2020 - Nov 11, 2020'
            }
        ]);
    });
});

describe('isOfflineAgreement', () => {
    test('should return the correct value', () => {
        expect(isOfflineAgreement({applicationCode: 'P'})).toEqual(false);
        expect(isOfflineAgreement({applicationCode: 'B'})).toEqual(false);
        expect(isOfflineAgreement({applicationCode: 'T'})).toEqual(true);
        expect(isOfflineAgreement({applicationCode: 'L'})).toEqual(true);
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
            unitPrice: 2.53,
            perWeightFlag: false
        };
        expect(prepareOrderUnitPriceInfo(data)).toEqual([{
            'adjustmentValue': ' ',
            'calculatedValue': '$2.53',
            'description': 'Order Unit Price'
        }, {
            'adjustmentValue': '$132.23',
            'calculatedValue': '$92.13',
            'description': 'A sample description2',
            'id': '432',
            'source': 'SUS',
            'validityPeriod': 'Valid Oct 1, 2020 - Nov 18, 2020'
        }]);
    });
});

describe('prepareCustomerNetPriceInfo', () => {
    test('should return the correct value', () => {
        expect(prepareCustomerNetPriceInfo({netPrice: 32.3})).toEqual([{
            'adjustmentValue': ' ',
            'calculatedValue': '$32.30',
            'description': 'Customer Net Price'
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
            'description': 'Item/Order Specific promotions',
            'validityPeriod': 'Valid Oct 25, 2020 - Nov 13, 2020'
        });
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
        ];
        expect(prepareVolumePricingTiers({volumePricingTiers})).toEqual([{
            'adjustmentValue': '1100.00%',
            'calculatedValue': '$2.00',
            'description': {'rangeConnector': 'to', 'rangeEnd': 10, 'rangeStart': 5},
            'isSelected': true,
            'source': 'Discount Service'
        }]);
    });
});

describe('prepareVolumePricingHeaderRow', () => {
    test('should return the correct value when volumePricingTiers is empty', () => {
        expect(prepareVolumePricingHeaderRow({volumePricingTiers: []})).toEqual(null);
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
        expect(prepareVolumePricingHeaderRow({volumePricingTiers})).toEqual({
            'description': 'Item/Order Specific promotions',
            'validityPeriod': 'Valid Oct 25, 2020 - Nov 13, 2020'
        });
    });
});

describe('prepareVolumePricingInfo', () => {
    test('should return the correct value when volumePricingTiers is not empty', () => {
        const data = {
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
        };

        const volumePricingTiers = [data];
        expect(prepareVolumePricingInfo({volumePricingTiers, perWeightFlag: false})).toEqual({
            'volumePricingHeaderRow': {
                'description': 'Item/Order Specific promotions',
                'validityPeriod': 'Valid Oct 25, 2020 - Nov 13, 2020'
            },
            'volumePricingTiers': [{
                'adjustmentValue': '1100.00%',
                'calculatedValue': '$2.00',
                'description': {'rangeConnector': 'to', 'rangeEnd': 10, 'rangeStart': 5},
                'isSelected': true,
                'source': 'Discount Service'
            }]
        });
    });

    test('should return the correct value when volumePricingTiers is empty', () => {
        const volumePricingTiers = [];
        expect(prepareVolumePricingInfo({volumePricingTiers})).toEqual({
            'volumePricingHeaderRow': null,
            'volumePricingTiers': []
        });
    });
});

describe('prepareDefaultPriceRulesSection', () => {
    test('should return the correct value when price rule is not empty and factor calc mtd is MGN', () => {
        const data = {
            'supc': '0032179',
            'splitFlag': false,
            'statuses': [],
            'priceRule': {
                'name': 'P1P',
                'baseValue': 5.8400,
                'baseValueName': 'P1',
                'factorCalcMethod': 'MGN',
                'factorSign': '+',
                'factorValue': 1.0000
            },
            'agreements': [],
            'exception': null,
            'discounts': []
        };

        expect(prepareDefaultPriceRuleSection(data)).toEqual([{
            'adjustmentValue': '',
            'calculatedValue': '',
            'description': 'Price Rule: P1P'
        }, {'adjustmentValue': '$5.840', 'calculatedValue': '', 'description': 'P1'}, {
            'adjustmentValue': '+1%',
            'calculatedValue': '',
            'description': 'MGN'
        }]);
    });

    test('should return the correct value when price rule is not empty and avoid showing factor details when factor value is 0', () => {
        const data = {
            'supc': '0032179',
            'splitFlag': false,
            'statuses': [],
            'priceRule': {
                'name': 'P1P',
                'baseValue': 5.8400,
                'baseValueName': 'P1',
                'factorCalcMethod': '',
                'factorSign': ' ',
                'factorValue': 0.0000
            },
            'agreements': [],
            'exception': null,
            'discounts': []
        };

        expect(prepareDefaultPriceRuleSection(data)).toEqual([{
            'adjustmentValue': '',
            'calculatedValue': '',
            'description': 'Price Rule: P1P'
        }, {'adjustmentValue': '$5.840', 'calculatedValue': '', 'description': 'P1'}]);
    });

    test('should return the correct value when price rule is not empty and avoid showing factor details when factor calc method is empty', () => {
        const data = {
            'supc': '0032179',
            'splitFlag': false,
            'statuses': [],
            'priceRule': {
                'name': 'P1P',
                'baseValue': 5.8400,
                'baseValueName': 'P1',
                'factorCalcMethod': '',
                'factorSign': ' ',
                'factorValue': 1.0000
            },
            'agreements': [],
            'exception': null,
            'discounts': []
        };

        expect(prepareDefaultPriceRuleSection(data)).toEqual([{
            'adjustmentValue': '',
            'calculatedValue': '',
            'description': 'Price Rule: P1P'
        }, {'adjustmentValue': '$5.840', 'calculatedValue': '', 'description': 'P1'}]);
    });

    test('should return the correct value when price rule is not empty and avoid showing '
        + 'factor details when factor calc method is empty and base value name absent', () => {
        const data = {
            'supc': '0032179',
            'splitFlag': false,
            'statuses': [],
            'priceRule': {
                'name': 'P1P',
                'baseValue': 5.8400,
                'baseValueName': '',
                'factorCalcMethod': '',
                'factorSign': ' ',
                'factorValue': 1.0000
            },
            'agreements': [],
            'exception': null,
            'discounts': []
        };

        expect(prepareDefaultPriceRuleSection(data)).toEqual([{
            'adjustmentValue': '',
            'calculatedValue': '',
            'description': 'Price Rule: P1P'
        }, {'adjustmentValue': '$5.840', 'calculatedValue': '', 'description': 'UNKNOWN'}]);
    });

    test('should return 3 decimal place base value when base value has more than 3 decimal places from the response', () => {
        const data = {
            'supc': '0032179',
            'splitFlag': false,
            'statuses': [],
            'priceRule': {
                'name': 'P1P',
                'baseValue': 5.8400,
                'baseValueName': 'P1',
                'factorCalcMethod': '',
                'factorSign': ' ',
                'factorValue': 0.0000
            },
            'agreements': [],
            'exception': null,
            'discounts': []
        };

        expect(prepareDefaultPriceRuleSection(data)).toEqual([{
            'adjustmentValue': '',
            'calculatedValue': '',
            'description': 'Price Rule: P1P'
        }, {'adjustmentValue': '$5.840', 'calculatedValue': '', 'description': 'P1'}]);
    });

    test('should return 3 decimal place base value when base value has less than 3 decimal places from the response', () => {
        const data = {
            'supc': '0032179',
            'splitFlag': false,
            'statuses': [],
            'priceRule': {
                'name': 'P1P',
                'baseValue': 5.84,
                'baseValueName': 'P1',
                'factorCalcMethod': '',
                'factorSign': ' ',
                'factorValue': 0.0000
            },
            'agreements': [],
            'exception': null,
            'discounts': []
        };

        expect(prepareDefaultPriceRuleSection(data)).toEqual([{
            'adjustmentValue': '',
            'calculatedValue': '',
            'description': 'Price Rule: P1P'
        }, {'adjustmentValue': '$5.840', 'calculatedValue': '', 'description': 'P1'}]);
    });
});

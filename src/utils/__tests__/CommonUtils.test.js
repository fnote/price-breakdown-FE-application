import {createBusinessUnitMap, formatBusinessUnit, formatNumberInput} from '../CommonUtils';

const businessUnits = new Map(
    [
        ['001', {id: '001', name: 'Sysco Jackson', shortName: 'Jackson'}],
        ['002', {id: '002', name: 'Sysco Atlanta', shortName: 'Atlanta'}],
        ['003', {id: '003', name: 'Sysco Jacksonville', shortName: 'Jacksonville'}]
    ]
);

describe('formatBusinessUnit', () => {
    test('should return formatted business unit name for valid OpCo Id', () => {
        expect(formatBusinessUnit('001', businessUnits)).toEqual('001 - Sysco Jackson');
    });

    test('should return formatted business unit name for invalid OpCo Id', () => {
        expect(formatBusinessUnit('9999', businessUnits)).toEqual('9999');
    });
});

const userDetails = {
    authorizedPricingTransformationEnabledBunitList: [
        {
          'bunit_id': '011',
          'bunit_name': 'Sysco Louisville',
          'periscope_on': 'Y'
        },
        {
          'bunit_id': '038',
          'bunit_name': 'Indianapolis',
          'periscope_on': 'Y'
        }
      ]
};

describe('createBusinessUnitMap', () => {
    const businessUnitMap = createBusinessUnitMap(userDetails);

    test('should return formatted business unit name for valid OpCo Id 1', () => {
        const businessUnit = businessUnitMap.get('011');
        expect(businessUnit.name).toEqual('Sysco Louisville');
        expect(businessUnit.shortName).toEqual('Louisville');
    });

    test('should return formatted business unit name for valid OpCo Id 2', () => {
        const businessUnit = businessUnitMap.get('038');
        expect(businessUnit.name).toEqual('Indianapolis');
        expect(businessUnit.shortName).toEqual('Indianapolis');
    });
});

describe('createBusinessUnitMap returns empty Map if authorizedPricingTransformationEnabledBunitList is null', () => {
    const userDetailsNull = createBusinessUnitMap({
        authorizedPricingTransformationEnabledBunitList: null
    });

    const businessUnitMap = createBusinessUnitMap(userDetailsNull);

    test('should return empty Map', () => {
        expect(businessUnitMap.size).toEqual(0);
    });
});

describe('createBusinessUnitMap returns empty Map if string authorizedPricingTransformationEnabledBunitList is passed', () => {
    const userDetailsInvalid = createBusinessUnitMap({
        authorizedPricingTransformationEnabledBunitList: ''
    });
    const businessUnitMap = createBusinessUnitMap(userDetailsInvalid);

    test('should return empty Map', () => {
        expect(businessUnitMap.size).toEqual(0);
    });
});

describe('formatNumberInput', () => {
    test('Should return a number with no decimals as it is', () => {
        expect(formatNumberInput('10')).toEqual('10');
    });

    test('Should return a number with no decimals as it is', () => {
        expect(formatNumberInput('12345678')).toEqual('12345678');
    });

    test('Should return a number with 1 decimals as it is', () => {
        expect(formatNumberInput('0.1')).toEqual('0.1');
    });

    test('Should return a number with 2 decimals as it is', () => {
        expect(formatNumberInput('0.12')).toEqual('0.12');
    });

    test('Should return a number with 3 decimals as it is', () => {
        expect(formatNumberInput('0.123')).toEqual('0.123');
    });

    test('Should only keep 3 decimal places max ', () => {
        expect(formatNumberInput('0.1234')).toEqual('0.123');
    });

    test('Should only keep 3 decimal places max ', () => {
        expect(formatNumberInput('0.12345')).toEqual('0.123');
    });

    test('Should not return an error when having decimal places only ', () => {
        expect(formatNumberInput('.1')).toEqual('.1');
    });

    test('Should not return an error when having decimal places only ', () => {
        expect(formatNumberInput('10.')).toEqual('10.');
    });
});

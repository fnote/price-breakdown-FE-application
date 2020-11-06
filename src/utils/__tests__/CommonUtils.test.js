import { formatBusinessUnit, createBusinessUnitMap } from '../CommonUtils';

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
    authorizedBunitList: [
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

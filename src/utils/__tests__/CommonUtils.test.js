import {createBusinessUnitMap, formatBusinessUnit, formatNumberInput, getDisplayFileName,
    grantViewPermissionsToScreens, checkOnlineStatus, unsupportedBrowserState} from '../CommonUtils';

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

    test('Should return null when passed a null ', () => {
        expect(formatNumberInput(null)).toEqual(null);
    });
});

describe('getDisplayFileName', () => {
    test('Should return formatted fileName when above length', () => {
        expect(getDisplayFileName('ABCDEFGHIJKLMNOPQRST_001_902839_20200202_C.txt')).toEqual('ABCDEFGHIJKLMNOPQRST_001_9028...');
    });

    test('Should return a same file name when below length', () => {
        expect(getDisplayFileName('ABC_001_902839_20200202_C.txt')).toEqual('ABC_001_902839_20200202_C.txt');
    });
});

describe('grantViewPermissionsToScreens', () => {
    // general users cant use cipz
    test('general users cant have access to cipz screens', () => {
        expect(grantViewPermissionsToScreens('appadmin', 'cipz_reviewer_tab')).toEqual(false);
        expect(grantViewPermissionsToScreens('generaluser', 'cipz_reviewer_tab')).toEqual(false);
        expect(grantViewPermissionsToScreens('appadmin', 'cipz_reassignment_tab')).toEqual(false);
        expect(grantViewPermissionsToScreens('generaluser', 'cipz_reassignment_tab')).toEqual(false);
    });

    // general can use general
    test('general users cant have access to cipz screens', () => {
        expect(grantViewPermissionsToScreens('appadmin', 'price_validation_screen')).toEqual(true);
        expect(grantViewPermissionsToScreens('generaluser', 'price_validation_screen')).toEqual(true);
        expect(grantViewPermissionsToScreens('appadmin', 'file_upload_screen')).toEqual(true);
        expect(grantViewPermissionsToScreens('generaluser', 'file_upload_screen')).toEqual(true);
    });

    // reviewer has access to reviewer tab
    test('cipz reviewer role have access to cipz review screens', () => {
        expect(grantViewPermissionsToScreens('cipz_reviewer', 'cipz_reviewer_tab')).toEqual(true);
    });

    // submitter has no access to reviewer tab
    test('cipz submitter role cant have access to cipz review screens', () => {
        expect(grantViewPermissionsToScreens('cipz_submitter', 'cipz_reviewer_tab')).toEqual(false);
    });

    // cipz can use cipz screens
    test('cipz  roles can have access to cipz reassignment screens', () => {
        expect(grantViewPermissionsToScreens('cipz_submitter', 'cipz_reassignment_tab')).toEqual(true);
        expect(grantViewPermissionsToScreens('cipz_reviewer', 'cipz_reassignment_tab')).toEqual(true);
        expect(grantViewPermissionsToScreens('cipz_support_user', 'cipz_reassignment_tab')).toEqual(true);
    });

    // cipz cant use general screens
    test('cipz roles cant have access to general screens', () => {
        expect(grantViewPermissionsToScreens('cipz_submitter', 'price_validation_screen')).toEqual(false);
        expect(grantViewPermissionsToScreens('cipz_reviewer', 'price_validation_screen')).toEqual(false);
        expect(grantViewPermissionsToScreens('cipz_support_user', 'price_validation_screen')).toEqual(false);
    });

    // empty roles
    test('empty roles cant have access to any screen', () => {
        expect(grantViewPermissionsToScreens('', 'price_validation_screen')).toEqual(false);
        expect(grantViewPermissionsToScreens('', 'price_validation_screen')).toEqual(false);
        expect(grantViewPermissionsToScreens('', 'price_validation_screen')).toEqual(false);
    });
});

describe('checkOnlineStatus', () => {

    // helper function to mock the fetch and get response.
    const mockAndGetResponse = async (status, error) => {
        const unmockedFetch = global.fetch
        global.fetch = error==null? () =>  Promise.resolve({status: status}): error;
        const resp = await checkOnlineStatus();
        global.fetch = unmockedFetch
        return resp;
    }

    test('Should return true if 200 <= status < 300', async () => {
        const  resp = await mockAndGetResponse(200);
        expect(resp).toEqual(true);
    });

    test('Should return false if not 200 <= status < 300', async () => {
        const  resp = await mockAndGetResponse(404);
        expect(resp).toEqual(false);
    });

    test('Should return false upon exception', async () => {
        const  resp = await mockAndGetResponse(200, ()=> {throw new Error('error occurred while fetching data')});
        expect(resp).toEqual(false);
    });
});

describe('unsupportedBrowserState', () => {

    const storageMap = {};
    const unmockedGetItem = localStorage.getItem;
    const unmockedSetItem = localStorage.setItem;
    localStorage.getItem = (key) => {
        return storageMap.get(key);
    };

    localStorage.setItem = (key, value) => {
        storageMap.set(key, value);
    };

    const setAllStatesToTrueOneByOne = () => {
        unsupportedBrowserState.setUnsupportedBrowserScreenContinue();
        unsupportedBrowserState.setUnsupportedBrowserAlertContinue();
    }

    const clearAllStatesOneByOne = () => {
        unsupportedBrowserState.clearUnsupportedBrowserScreenContinue();
        unsupportedBrowserState.clearUnsupportedBrowserAlertContinue();
    }

    const verifyState = (state) => {
        expect(unsupportedBrowserState.isSetUnsupportedBrowserScreenContinue()).toEqual(state);
        expect(unsupportedBrowserState.isSetUnsupportedBrowserAlertContinue()).toEqual(state);
    }

    test('set,get and clear UnsupportedBrowserScreenContinue and UnsupportedBrowserAlertContinue', () => {
        //verify initial state
        verifyState(false);

        //verify after setting to true
        setAllStatesToTrueOneByOne();
        verifyState(true);

        //verify after clearing one by one
        clearAllStatesOneByOne();
        verifyState(false);

        //verify after setting and clearing by function
        setAllStatesToTrueOneByOne();
        verifyState(true);
        unsupportedBrowserState.clearUnsupportedBrowserStates();
        verifyState(false);
    });

    localStorage.getItem = unmockedGetItem;
    localStorage.setItem = unmockedGetItem;
});

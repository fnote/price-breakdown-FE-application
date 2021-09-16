import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import {getBusinessUnits, setInitialValues} from '../PricingHelper';

configure({adapter: new Adapter()});

jest.mock('moment', () => () => jest.requireActual('moment')('2020-01-01T00:00:00.000Z'));

describe.only('getBusinessUnits', () => {
    test('should return formatted business unit name for valid OpCo Id', () => {
        expect(getBusinessUnits([])).toEqual([]);
        const businessUnitsMap = [{
            id: '011',
            shortName: 'Louiville'
        }];
        const businessUnitList = getBusinessUnits(businessUnitsMap);
        expect(businessUnitList.length).toEqual(1);
        const props = mount(businessUnitList[0]).props();
        expect(props.value).toEqual('011');
        expect(props.children.join('')).toEqual('011 - Louiville');
    });

    test('should return empty business units', () => {
        const bunitsMap = getBusinessUnits(null);
        expect(bunitsMap.length).toBe(0);
    });
});

describe.only('setInitialValues', () => {
    test('should return price validation input when price validation request is set given', () => {
        const requestContext = {
            'isHistoryInquiryRequest': false,
            'isPriceValidationRequest': true,
            'requestData': {
                'baseRequest': {
                    'site': '019',
                    'customer': '0243',
                    'supc': '4343',
                    'split': false,
                },
                'priceValidationRequest': {
                    'quantity': 1,
                    'date': '2020-01-01',
                    'handPrice': 1,
                }
            }
        };
        expect(setInitialValues(requestContext)).toEqual({
            site: '019',
            supc: '4343',
            customer: '0243',
            quantity: 1,
            date: '2020-01-01',
            handPrice: 1,
            split: false,
        });
    });

    test('should return correct dates when transaction history given', () => {
        const requestContext = {
            'isHistoryInquiryRequest': true,
            'isPriceValidationRequest': false,
            'requestData': {
                'baseRequest': {
                    'site': '019',
                    'customer': '0243',
                    'supc': '4343',
                    'split': false,
                },
            }
        };
        expect(setInitialValues(requestContext)).toEqual({
            site: '019',
            supc: '4343',
            customer: '0243',
            quantity: 1,
            date: moment(),
            split: false,
        });
    });
    test('should return correct dates when transaction history given', () => {
        const requestContext = {
            'isHistoryInquiryRequest': false,
            'isPriceValidationRequest': false,
            'requestData': {
                'baseRequest': {
                    'site': '019',
                    'customer': '0243',
                    'supc': '4343',
                    'split': false,
                },
            }
        };
        expect(setInitialValues(requestContext)).toEqual({
            site: '',
            customer: '',
            supc: '',
            quantity: 1,
            date: moment(),
            split: false
        });
    });
});

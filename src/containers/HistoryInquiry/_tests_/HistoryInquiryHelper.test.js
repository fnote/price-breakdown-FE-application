import {configure,} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {setHistoryInquiryInitialValues} from "../HistoryInquiryHelper";

configure({adapter: new Adapter()});

describe('setInitialValues', () => {
    test('should return history inquiry input when history inquiry request is given', () => {
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
                'historyInquiryRequest': {
                    'startDate': '2020-10-01',
                    'endDate': '2021-01-01'
                }
            }
        };
        expect(setHistoryInquiryInitialValues(requestContext)).toEqual({
            "customer": "0243",
            "site": "019",
            "split": false,
            "supc": "4343",
            "rangeDate": {
                "endDate": "2021-01-01", "startDate": "2020-10-01"
            },
        })
    });

    test('should return history inquiry input when price validation request is given', () => {
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
            }
        };
        expect(setHistoryInquiryInitialValues(requestContext)).toEqual({
            "customer": "0243",
            "site": "019",
            "split": false,
            "supc": "4343",
            "rangeDate": "",
        })
    });

    test('should return default when no request is given', () => {
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
        expect(setHistoryInquiryInitialValues(requestContext)).toEqual({
            "customer": "",
            "site": "",
            "split": false,
            "supc": "",
            "rangeDate": "",
        })
    });
});
import BrowserDetector from '../BrowserDetector';

describe('BrowserDetector', () => {
    const browserDetector = new BrowserDetector({
        Chrome: 89,
        Edge: 87,
        Firefox: 84,
        Safari: 12
    });

    test('isSupported should return true when both the browser and version is correct', () => {
        browserDetector.setBrowser({
            name: 'Chrome',
            version: 90,
            fullBrowserVersion: '90.0.1'
        });
        expect(browserDetector.isSupported()).toEqual(true);
        expect(browserDetector.getBrowserName()).toEqual('Chrome');
        expect(browserDetector.getBrowserVersion()).toEqual(90);
        expect(browserDetector.getFullBrowserVersion()).toEqual('90.0.1');
    });

    test('isSupported should return false when unsupported browser', () => {
        browserDetector.setBrowser({
            name: 'IE',
            version: 90,
            fullBrowserVersion: '90.0.1'
        });
        expect(browserDetector.isSupported()).toEqual(false);
    });

    test('isSupported should return false when unsupported version', () => {
        browserDetector.setBrowser({
            name: 'Chrome',
            version: 85,
            fullBrowserVersion: '85.0.252'
        });
        expect(browserDetector.isSupported()).toEqual(false);
    });
});

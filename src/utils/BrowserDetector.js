import {
    browserName,
    browserVersion,
    fullBrowserVersion
} from "react-device-detect";

/**
 * BrowserDetector
 *
 * This util checks the current browser name and version and offers a
 * convenient API to test for specific versions or browsers and whether
 * the current visitor uses a supported browser or not.
 *
 */
export default class BrowserDetector {
    /**
     * A browser is considered supported if it is mentioned in the list and equal or newer than the mentioned versions.
     *
     * @param supportedBrowsers
     * supportedBrowsers = {
     *       Chrome: 88,
     *       Firefox: 60
     *   }
     */
    constructor(supportedBrowsers) {
        this.browser = {
            name: browserName,
            version: browserVersion,
            fullBrowserVersion: fullBrowserVersion
        }
        this.supportedBrowsers = supportedBrowsers;
    }

    /**
     * The Browser name
     * @returns {string}
     */
    getBrowserName(){
        return this.browser.name;
    }

    /**
     * The Browser main version number
     * @returns {string}
     */
    getBrowserVersion(){
        return this.browser.version;
    }

    /**
     * The Full Browser bersion number
     * @returns {string}
     */
    getFullBrowserVersion(){
        return this.browser.fullBrowserVersion;
    }

    /**
     * Checks if the current browser is supported by
     *
     * @returns {Boolean}
     */
    isSupported() {
        if (this.supportedBrowsers.hasOwnProperty(this.browser.name)) {
            if (this.browser.version >= this.supportedBrowsers[this.browser.name]) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if the current browser is from an Android device.
     *
     * @returns {Boolean}
     */
    get isAndroid() {
        return /Android/i.test(navigator.userAgent);
    }

    /**
     * Checks if the current browser is from a BlackBerry device.
     *
     * @returns {Boolean}
     */
    get isBlackBerry() {
        return /BlackBerry/i.test(navigator.userAgent);
    }

    /**
     * Checks if the current browser is from a Windows Mobile device.
     *
     * @returns {Boolean}
     */
    get isWindowsMobile() {
        return /IEMobile/i.test(navigator.userAgent);
    }

    /**
     * Checks if the current browser is Mobile Safari.
     *
     * @returns {Boolean}
     */
    get isIOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    /**
     * Checks if the current browser is a mobile browser.
     *
     * @returns {Boolean}
     */
    get isMobile() {
        return (
            this.isAndroid || this.isBlackBerry || this.isWindowsMobile || this.isIOS
        );
    }
}

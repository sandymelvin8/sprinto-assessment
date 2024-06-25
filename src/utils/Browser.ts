import { BrowserConstants } from "../constants/BrowserConstants";

/**
 * This class will handel the browser type related actions
 *
 * @export
 * @class Browser
 */
export class Browser {
    /**
     * This method will return the browser type
     *
     * @static
     * @param string browser Get browser in string as an argument
     * @return {*}  Returns browser type
     * @memberof Browser
     */
    public static type(browser: string) {
        let browserType;
        if (browser === BrowserConstants.FIREFOX) {
            browserType = BrowserConstants.FIREFOX;
        } else if (browser === BrowserConstants.WEBKIT) {
            browserType = BrowserConstants.WEBKIT;
        } else {
            browserType = BrowserConstants.CHROMIUM;
        }
        return browserType;
    }

    /**
     * This method will return the browser channel
     *
     * @static
     * @param string browser Get browser in string as an argument
     * @return {*}  string Returns browser channel in string
     * @memberof Browser
     */
    public static channel(browser: string): string {
        let browserChannel: string;
        if (browser === BrowserConstants.CHROME) {
            browserChannel = BrowserConstants.CHROME;
        } else if (browser === BrowserConstants.EDGE) {
            browserChannel = BrowserConstants.MSEDGE;
        } else {
            browserChannel = BrowserConstants.BLANK;
        }
        return browserChannel;
    }
}

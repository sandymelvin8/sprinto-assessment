import { allure } from "allure-playwright";
import * as os from "os";

/**
 * This class contains utility methods for allure report
 *
 * @export
 * @class AllureUtils
 */
export class AllureUtils {
    /**
     * This method is used to attach the description, owner and issue link to the allure report
     *
     * @static
     * @param string description - description to be attached to the allure report
     * @param string issue - issue to be attached to the allure report
     * @memberof AllureUtils
     */
    public static attachDetails(description: string, issue: string): void {
        allure.description(description);
        allure.owner(os.userInfo().username);
        if (issue !== undefined && issue !== null && issue !== "") {
            allure.link(`${process.env.LINK}${issue}`, issue);
        }
    }
}

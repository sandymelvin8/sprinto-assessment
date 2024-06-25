import * as HTMLReport from "jasmine-xml2html-converter";
import * as dotenv from "dotenv";
import { CommonConstants } from "../constants/CommonConstants";
import { logger } from "./LoggerUtils";

dotenv.config();

/**
 * This class is used to generate HTML report from JUnit results
 *
 * @export
 * @class HTMLReporterUtils
 */
export default class HTMLReporterUtils {
    /**
     * This method generates HTML report from JUnit results
     *
     * @static
     * @memberof HTMLReporterUtils
     */
    public static generate(): void {
        const testConfig = {
            reportTitle: CommonConstants.REPORT_TITLE,
            outputPath: CommonConstants.RESULTS_PATH,
            // BASE_URL: process.env.BASE_URL,
            // BROWSER: process.env.BROWSER,
        };
        new HTMLReport().from(CommonConstants.JUNIT_RESULTS_PATH, testConfig);
        logger().info("Completed creating HTML Report");
    }
}

HTMLReporterUtils.generate();

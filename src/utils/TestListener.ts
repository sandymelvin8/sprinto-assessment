/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reporter, TestCase, TestError, TestResult, TestStep } from "@playwright/test/reporter";
import { logger } from "./LoggerUtils";

const TEST_SEPARATOR = "##############################################################################";
const STEP_SEPARATOR = "------------------------------------------------------------------------------";

/**
 * This class is used to print the test logs in the console.
 *
 * @export
 * @class TestListener
 * @implements {Reporter}
 */
export default class TestListener implements Reporter {
    /**
     * This method  will print the test logs on test begins
     *
     * @param {TestCase} test
     * @param {TestResult} result
     * @memberof TestListener
     */
    onTestBegin(test: TestCase, result: TestResult): void {
        this.printLogs(`Test: ${test.title} - Started`, TEST_SEPARATOR);
    }

    /**
     * This method will print the test logs on test ends
     *
     * @param {TestCase} test
     * @param {TestResult} result
     * @memberof TestListener
     */
    onTestEnd(test: TestCase, result: TestResult): void {
        if (result.status === "failed") {
            logger().error(`Test: ${test.title} - ${result.status}\n${result.error.stack}`);
        }
        this.printLogs(`Test: ${test.title} - ${result.status}`, TEST_SEPARATOR);
    }

    /**
     * This method will print the test stdout
     *
     * @param {(string | Buffer)} chunk
     * @param {TestCase} [test]
     * @param {TestResult} [result]
     * @memberof TestListener
     */
    onStdOut(chunk: string | Buffer, test?: TestCase, result?: TestResult): void {
        logger().info(chunk);
    }

    /**
     * This method will print the test stderr
     *
     * @param {(string | Buffer)} chunk
     * @param {TestCase} [test]
     * @param {TestResult} [result]
     * @memberof TestListener
     */
    onStdErr(chunk: string | Buffer, test?: TestCase, result?: TestResult): void {
        logger().error(chunk);
    }

    /**
     * This method will print the test step logs on step begins
     *
     * @param {TestCase} test
     * @param {TestResult} result
     * @param {TestStep} step
     * @memberof TestListener
     */
    onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
        if (step.category === "test.step") {
            if (typeof step.parent !== "undefined") {
                logger().info(step.title);
            } else {
                this.printLogs(`Started Step: ${step.title}`, STEP_SEPARATOR);
            }
        }
    }

    /**
     * This method will print the test step logs on step ends
     *
     * @param {TestCase} test
     * @param {TestResult} result
     * @param {TestStep} step
     * @memberof TestListener
     */
    onStepEnd(test: TestCase, result: TestResult, step: TestStep): void {
        if (step.category === "test.step" && typeof step.parent === "undefined") {
            this.printLogs(`Completed Step: ${step.title}`, STEP_SEPARATOR);
        }
    }

    /**
     * This method will print the test error logs
     *
     * @param {TestError} error
     * @memberof TestListener
     */
    onError(error: TestError): void {
        logger().error(`Message: ${error.message}`);
        logger().error(`Stack: ${error.stack}`);
        logger().error(`Value: ${error.value}`);
    }

    /**
     * This method will print the test logs
     *
     * @private
     * @param string msg
     * @param string separator
     * @memberof TestListener
     */
    private printLogs(msg: string, separator: string) {
        logger().info(separator);
        logger().info(`${msg.toUpperCase()}`);
        logger().info(separator);
    }
}

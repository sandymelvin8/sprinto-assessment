import { PlaywrightTestConfig } from "@playwright/test";
import { Browser } from "@utils/Browser";

import * as dotenv from "dotenv";

dotenv.config();

const timeInMin: number = 60 * 1000;
const config: PlaywrightTestConfig = {
    use: {
        browserName: Browser.type(process.env.BROWSER.toLowerCase()),
        headless: process.env.HEADLESS === "true" ? true : false,
        channel: Browser.channel(process.env.BROWSER.toLowerCase()),
        launchOptions: {
            args: ["--start-maximized", "--disable-extensions", "--disable-plugins"],
            headless: process.env.HEADLESS === "true" ? true : false, // process.env.HEADLESS === "true" ? true : false,
            timeout: Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT, 10),
            slowMo: 800,
            downloadsPath: "./test-results/downloads",
        },
        viewport: { width: 1080, height: 720 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        actionTimeout: Number.parseInt(process.env.ACTION_TIMEOUT, 10) * timeInMin,
        navigationTimeout: Number.parseInt(process.env.NAVIGATION_TIMEOUT, 10) * timeInMin,
        screenshot: "on",
        video: "retain-on-failure",
        trace: "retain-on-failure",
    },
    testDir: "./src/tests",
    outputDir: "../../test-results/",
    retries: Number.parseInt(process.env.RETRIES, 10),
    preserveOutput: "always",
    reportSlowTests: null,
    timeout: Number.parseInt(process.env.TEST_TIMEOUT, 10) * timeInMin,
    workers: Number.parseInt(process.env.PARALLEL_THREAD, 10),
    reporter: [
        ["dot"],
        [
            "allure-playwright",
            {
                detail: false,
                suiteTitle: false,
            },
        ],
        ["html", { open: "never", outputFolder: "./test-results/results" }],
        ["junit", { outputFile: "./test-results/results/results.xml" }],
        ["json", { outputFile: "./test-results/results/results.json" }],
        ["./src/utils/TestListener.ts"],
        [
            "monocart-reporter",
            {
                name: "Automation Report",
                outputFile: "./test-results/results/report.html",
            },
        ],
    ],
    projects: [
        {
            name: "local",
            testMatch: `*${process.env.TEST_NAME}*`,
        },
        {
            name: "suite",
            testMatch: "*.spec.ts",
        },
    ],
};
export default config;

import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
    testDir: "./tests",
    timeout: 120000,
    expect: {
        timeout: 5000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    // workers: process.env.CI ? 1 : undefined,
    workers: 1,
    // reporter: "html",
    reporter: [["html", { outputFolder: "results/playwright-report" }]],
    use: {
        actionTimeout: 0,
        trace: "on",
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "Chrome",
            use: {
                channel: "chrome",
                launchOptions: {
                    args: ["--start-maximized", "--disable-extensions", "--disable-plugins"],
                    slowMo: 800,
                },
                video: "on",
                screenshot: "on",
            },
        },
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
            },
        },

        {
            name: "firefox",
            use: {
                ...devices["Desktop Firefox"],
            },
        },

        {
            name: "webkit",
            use: {
                ...devices["Desktop Safari"],
            },
        },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: {
        //     ...devices['Pixel 5'],
        //   },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: {
        //     ...devices['iPhone 12'],
        //   },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: {
        //     channel: 'msedge',
        //   },
        // },
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: "results/test-results/",

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   port: 3000,
    // },
};

export default config;

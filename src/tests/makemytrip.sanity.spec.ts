import { test, expect } from "@pages_factory/base";
import {getFormattedJsonStringify} from "@utils/CommonUtils";
import { ConsoleMessage, Response } from "@playwright/test";
import { logger } from "@utils/LoggerUtils";
import * as dotenv from "dotenv";
import { DateUtils } from "@utils/DateUtils";

test.describe("Make My Trip Test Suite @serialMakeMyTripTestSuite @sanity", () => {
    const dateUtils = new DateUtils();
    if (process.env.EXECUTION_MODE === "parallel" || process.env.EXECUTION_MODE === "serial") {
        test.describe.configure({ mode: process.env.EXECUTION_MODE });
    }

    let BASE_URL: string;
    let waitForConsoleEvent: Promise<ConsoleMessage>;
    let waitForResponseEvent: Promise<Response>;
    test.beforeEach(async ({ page }) => {
        dotenv.config();
        const BASE_URL = process.env.BASE_URL
        await page.goto(BASE_URL);
        await page.evaluate(() => {
            localStorage.setItem("enableLog", "true");
        });
        waitForConsoleEvent = page.waitForEvent("console");
        page.on("console", (msg) => {
            if (
                msg.text().includes("TypeError") ||
                msg.text().includes("InternalError") ||
                msg.text().includes("RangeError") ||
                msg.text().includes("ReferenceError") ||
                msg.text().includes("SyntaxError") ||
                msg.text().includes("URIError")
            ) {
                logger().error(`UI Client/JavaScript Error Occurred: 
                                Error Type: ${msg.type()}
                                Error Message: ${msg.text()}
                                Error Args: ${JSON.stringify(msg.args())}
                                Error Location: ${JSON.stringify(msg.location())}
                                `);
                if (process.env.ENABLE_CONSOLE_LISTENER.toLowerCase() === "true") {
                    expect
                        .soft(false, `UI Client/JavaScript error Occurred\nError Message: ${msg.text()}`)
                        .toBeTruthy();
                }
            }
        });
        waitForResponseEvent = page.waitForEvent("response");
        page.on("response", async (response) => {
            if (response.status() >= 500 && response.status() < 600) {
                logger().error(
                    `RESPONSE: <<, 
                     REQUEST_URL: ${response.request().url()}, 
                     REQUEST_METHOD: ${response.request().method()}, 
                     RESPONSE_STATUS: ${response.status()}, 
                     RESPONSE_HEADER: ${getFormattedJsonStringify(response.headers())}, 
                     RESPONSE_BODY: ${await response.text()}`,
                );
                expect(
                    false,
                    `Service Error Please check the build\n${response
                        .request()
                        .method()} ${response.status()} ${response.request().url()}`,
                ).toBeTruthy();
            }
        });
    });

    test("Validating the search for cheapest flights for round trip @mmt01 @makeMyTrip @sanity", async ({
        page,
        makeMyTripPage,
    }) => {
        await test.step("Navigate to flights section", async () => {
            await makeMyTripPage.dismissBanner();
            await makeMyTripPage.navigateToTopNavHeader("Flights");
        });
        await expect(page).toHaveURL(/.*flights/);
        await test.step("Select the trip type", async () => {
            await makeMyTripPage.selectTripType("roundTrip");
        });
        await test.step("Provide from and to location", async () => {
            await makeMyTripPage.selectBoardingLocation("Bengaluru");
            await makeMyTripPage.clickInternationalTrip();
            await makeMyTripPage.selectDestinationLocation("DXB");
            expect(await makeMyTripPage.getTripType()).toEqual("Round Trip")
            expect(await makeMyTripPage.getFromLocation()).toEqual("Bengaluru, India");
            expect(await makeMyTripPage.getToLocation()).toEqual("Dubai, United Arab Emirates");
        });
        await test.step("Select dates and duration", async () => {
            await makeMyTripPage.selectTravelMonth("DATES & DURATION","December, 2024");
        });
        await test.step("Set the trip duration", async () => {
            const tripDays = 10;
            await makeMyTripPage.setDurationSlider(tripDays);
            await makeMyTripPage.clickApply();
            expect(await makeMyTripPage.getDuration("DATES & DURATION")).toEqual("December, 2024 , 10 Days");
            await makeMyTripPage.search();
        });
        await test.step("Select the cheapest flight for the search" , async () => {
            await makeMyTripPage.selectCheapestFlight();
            expect(await makeMyTripPage.validateSearchResult("United Arab Emirates")).toBeTruthy();
        });
    });

    test("Validating the search for one way trip @mmt02 @makeMyTrip @sanity", async ({
        page,
        makeMyTripPage,
    }) => {
        await test.step("Navigate to flights section", async () => {
            await makeMyTripPage.dismissBanner();
            await makeMyTripPage.navigateToTopNavHeader("Flights");
        });
        await expect(page).toHaveURL(/.*flights/);
        await test.step("Select the trip type", async () => {
            await makeMyTripPage.selectTripType("oneWayTrip");
        });
        await test.step("Provide from and to location", async () => {
            await makeMyTripPage.selectBoardingLocation("Bengaluru");
            await makeMyTripPage.clickInternationalTrip();
            await makeMyTripPage.selectDestinationLocation("DXB");
            expect(await makeMyTripPage.getTripType()).toEqual("One Way")
            expect(await makeMyTripPage.getFromLocation()).toEqual("Bengaluru, India");
            expect(await makeMyTripPage.getToLocation()).toEqual("Dubai, United Arab Emirates");
        });
        await test.step("Select departure month", async () => {
            await makeMyTripPage.selectTravelMonth("DEPARTURE","December, 2024");
            await makeMyTripPage.clickApply();
            expect(await makeMyTripPage.getDuration("DEPARTURE")).toEqual("December, 2024 ");
            await makeMyTripPage.search();
            expect(await makeMyTripPage.validateSearchResult("United Arab Emirates")).toBeTruthy();
        });
    });

    test("Validating the search for one way trip with no destination @mmt03 @makeMyTrip @sanity", async ({
        page,
        makeMyTripPage,
    }) => {
        await test.step("Navigate to flights section", async () => {
            await makeMyTripPage.dismissBanner();
            await makeMyTripPage.navigateToTopNavHeader("Flights");
        });
        await expect(page).toHaveURL(/.*flights/);
        await test.step("Select the trip type", async () => {
            await makeMyTripPage.selectTripType("oneWayTrip");
        });
        await test.step("Provide from location", async () => {
            await makeMyTripPage.selectBoardingLocation("Bengaluru");
            await makeMyTripPage.clickInternationalTrip();     
            expect(await makeMyTripPage.getTripType()).toEqual("One Way")
            expect(await makeMyTripPage.getFromLocation()).toEqual("Bengaluru, India");
        });
        await test.step("Select departure month", async () => {
            await makeMyTripPage.selectTravelMonth("DEPARTURE","December, 2024");
            await makeMyTripPage.clickApply();
            expect(await makeMyTripPage.getDuration("DEPARTURE")).toEqual("December, 2024 ");
            await makeMyTripPage.search();
        });
        await test.step("Select search for anywhere" , async () => {
            expect(await makeMyTripPage.validateSearchResult("Dubai")).toBeTruthy();
        });
    });

    test("Validating the search for round trip with no destination @mmt04 @makeMyTrip @sanity", async ({
        page,
        makeMyTripPage,
    }) => {
        await test.step("Navigate to flights section", async () => {
            await makeMyTripPage.dismissBanner();
            await makeMyTripPage.navigateToTopNavHeader("Flights");
        });
        await expect(page).toHaveURL(/.*flights/);
        await test.step("Select the trip type", async () => {
            await makeMyTripPage.selectTripType("roundTrip");
        });
        await test.step("Provide from location", async () => {
            await makeMyTripPage.selectBoardingLocation("Bengaluru");
            await makeMyTripPage.clickInternationalTrip();     
            expect(await makeMyTripPage.getTripType()).toEqual("Round Trip")
            expect(await makeMyTripPage.getFromLocation()).toEqual("Bengaluru, India");
        });
        await test.step("Select dates and duration", async () => {
            await makeMyTripPage.selectTravelMonth("DATES & DURATION","December, 2024");
        });
        await test.step("Set the trip duration", async () => {
            const tripDays = 10;
            await makeMyTripPage.setDurationSlider(tripDays);
            await makeMyTripPage.clickApply();
            expect(await makeMyTripPage.getDuration("DATES & DURATION")).toEqual("December, 2024 , 10 Days");
            await makeMyTripPage.search();
        });
        await test.step("Select round trip search for anywhere" , async () => {
            // await makeMyTripPage.selectCheapestFlight();
            expect(await makeMyTripPage.validateSearchResult("Dubai")).toBeTruthy();
        });

    });
    test.afterEach(async () => {
        if (process.env.ENABLE_CONSOLE_LISTENER.toLowerCase() === "true") {
            await waitForConsoleEvent;
        }
        // await waitForResponseEvent;
    });
});
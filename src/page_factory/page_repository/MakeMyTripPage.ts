import { MakeMyTripObject } from "@pages_factory/object_repository/MakeMyTripObject";
import { Page } from "@playwright/test";
import { generateDynamicXpath, failedValidation } from "@utils/CommonUtils";
import { logger } from "@utils/LoggerUtils";

/**
 * This class is used to perform flight booking operations on the application
 *
 * @export
 * @class MakeMyTripPage
 */
export class MakeMyTripPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * This method selects the menu option available in top nav header
     *
     * @return {*}  {Promise<boolean>}
     * @memberof MakeMyTripPage
     */
    async navigateToTopNavHeader( menuOption: "Flights" | "Hotels" | "Homestays & Villas" |"Holiday Packages"| "Trains" | "Buses" |"Cabs"): Promise<boolean> {
        logger().info("Navigation to top header");
        const results = [];
        results.push(
            await this.page
            .locator(generateDynamicXpath(MakeMyTripObject.TOP_NAV_HEADER_LINK_BTN, [menuOption]))
            .click(),
        );

        return results.every((v) => v === true);
    }

    /**
     * This method dismisses the login modal
     *
     * @return {*}  {Promise<void>}
     * @memberof MakeMyTripPage
     */
    async dismissBanner():Promise<void> {
        logger().info("Dismiss the login banner");
        await this.page.waitForSelector(MakeMyTripObject.LOGIN_MODAL_CLOSE_BTN,{timeout: 5000});
        await this.page.locator(MakeMyTripObject.LOGIN_MODAL_CLOSE_BTN).click();
    }

    /**
     * This method will select the trip type
     *
     * @return {*}  {Promise<boolean>}
     * @param string tripType gets the type of trip in string as argument
     * @memberof MakeMyTripPage
     */
    async selectTripType(tripType: string):Promise<boolean> {
        logger().info("Select the trip type");
        const results = [];
        results.push(
            await this.page
            .locator(generateDynamicXpath(MakeMyTripObject.SELECT_TRIP_TYPE_DYNAMIC_RADIO_BTN, [tripType]))
            .click(),
        );
        return results.every((v) => v == true);       
    }

    /**
     * This method will return the trip type selected
     *
     * @return {*}  {Promise<string>}
     * @memberof MakeMyTripPage
     */
    async getTripType() : Promise<string> {
        return await this.page.locator(MakeMyTripObject.TRIP_TYPE_LOC).textContent();
    }

    /**
     * This method will return from location that is selected
     *
     * @return {*}  {Promise<string>}
     * @memberof MakeMyTripPage
     */
    async getFromLocation() : Promise<string> {
        return await this.page.locator(MakeMyTripObject.FROM_LABEL_LOC).textContent();
    }

    /**
     * This method will return to location that is selected
     *
     * @return {*}  {Promise<string>}
     * @memberof MakeMyTripPage
     */
    async getToLocation() : Promise<string> {
        return await this.page.locator(MakeMyTripObject.TO_LABEL_LOC).textContent();
    }

    /**
     * This method will return the departure date that is selected
     *
     * @return {*}  {Promise<string>}
     * @memberof MakeMyTripPage
     */
    async getDuration(departureDate: string) : Promise<string> {
        return await this.page.locator(generateDynamicXpath(MakeMyTripObject.DATES_AND_DURATION_LOC, [departureDate])).textContent();
    }

    /**
     * This method validates the Labels in search page of make my trip application
     *
     * @return {*}  {Promise<boolean>}
     * @memberof MakeMyTripPage
     */
    async searchPageLabelValidation(): Promise<boolean> {
        const results = new Map<string, boolean>();
        results.set(
            "FROM_LOCATION_LABEL_LOC",
            await this.page.locator(MakeMyTripObject.TRIP_TYPE_LOC).isVisible(),
        );
        results.set(
            "FROM_LABEL_LOC",
            await this.page.locator(MakeMyTripObject.FROM_LABEL_LOC).isVisible(),
        );
        results.set(
            "TO_LABEL_LOC",
            await this.page.locator(MakeMyTripObject.TO_LABEL_LOC).isVisible(),
        );
        logger().info("Make My Trip Label Failed Validations:  " + (await failedValidation(results)));
        return Array.from(results.values()).every((v) => v === true);
    }

    /**
     * This method validates the Labels in dates and duration section of make my trip application
     *
     * @return {*}  {Promise<boolean>}
     * @memberof MakeMyTripPage
     */
    async datesAndDurationLabelValidation(): Promise<boolean> {
        const results = new Map<string, boolean>();
        results.set(
            "DATES_AND_DURATION_LOC",
            await this.page.locator(MakeMyTripObject.DATES_AND_DURATION_LOC).isVisible(),
        );
        logger().info("Dates and Duration Label Failed Validations:  " + (await failedValidation(results)));
        return Array.from(results.values()).every((v) => v === true);
    }

    /**
     * Selects the boarding location
     *
     * @return {*}  {Promise<void>}
     * @param string "from" gets the location string as argument
     * @memberof MakeMyTripPage
     */
    async selectBoardingLocation(from: string): Promise<void> {
        logger().info("Selecting from and to location");
        await this.page.locator(MakeMyTripObject.FROM_LOCATION_LOC).click();
        await this.page.getByPlaceholder("From").fill(from);
        await this.page
            .locator(generateDynamicXpath(MakeMyTripObject.CITY_SELECTION_LOC, [from]))
            .click();
    }

    /**
     * Clicks on the international trip section
     *
     * @return {*}  {Promise<void>}
     * @memberof MakeMyTripPage
     */
    async clickInternationalTrip(): Promise<void>{
        await this.page.locator(MakeMyTripObject.TO_LOCATION_LOC).click();
        await this.page.locator(MakeMyTripObject.INTERNATIONAL_TRIP_BTN).click();
    }

    /**
     * Selects the destination location
     *
     * @return {*}  {Promise<void>}
     * @param string to gets to location in string as argument
     * @memberof MakeMyTripPage
     */
    async selectDestinationLocation(to: string): Promise<void> {
        logger().info("Selecting 'to' location");
        // await this.page.locator(MakeMyTripObject.TO_LOCATION_LOC).click();
        // await this.page.locator(MakeMyTripObject.INTERNATIONAL_TRIP_BTN).click();
        await this.page.locator(MakeMyTripObject.DESTINATION_DROPDOWN_LOC).click();
        const delay = 200
        await this.page.keyboard.type(to,{delay});
        await this.page.waitForTimeout(2000);
        await this.page
            .locator(generateDynamicXpath(MakeMyTripObject.SELECT_DESTINATION_LOC, [to]))
            .click();
    }
    /**
     * This method selects the travel month
     *
     * @return {*}  {Promise<boolean>}
     * @param string month gets path in string as argument
     * @memberof MakeMyTripPage
     */
    async selectTravelMonth(departureType : string, month: string): Promise<void> {
        logger().info("Select the month of travel");
        await this.page
            .locator(generateDynamicXpath(MakeMyTripObject.SELECT_DATES_LABEL_LOC, [departureType]))
            .click(); 
        await this.page
            .locator(generateDynamicXpath(MakeMyTripObject.SELECT_MONTH_LOC, [month]))
            .click(); 
    }

    /**
     * This method sets the trip duration
     *
     * @return {*}  {Promise<void>}
     * @param number days gets number as argument
     * @memberof MakeMyTripPage
     */
    async setDurationSlider(days: number): Promise<void> {
        logger().info("Setting up the trip duration");
        await this.page.waitForSelector(MakeMyTripObject.DURATION_SLIDER_LOC,{timeout: 5000});
        const slider = this.page.locator(MakeMyTripObject.DURATION_SLIDER_LOC);
        if (!slider) {
            throw new Error('Slider not found');
        }
        const sliderBoundingBox = await slider.boundingBox();
        if (!sliderBoundingBox) {
            throw new Error('Slider bounding box not found');
        }
        const min = parseInt(await slider.getAttribute('aria-valuemin') || '1');
        const max = parseInt(await slider.getAttribute('aria-valuemax') || '30');
        const currentValue = parseInt(await slider.getAttribute('aria-valuenow') || '1');
        const position = ((days - min) / (max - min)) * sliderBoundingBox.width;
        const handleX = sliderBoundingBox.x + position;
        const handleY = sliderBoundingBox.y + sliderBoundingBox.height / 2;
        await this.page.mouse.move(sliderBoundingBox.x + ((currentValue - min) / (max - min)) * sliderBoundingBox.width, handleY);
        await this.page.mouse.down();
        await this.page.mouse.move(handleX, handleY);
        await this.page.mouse.up();
        const sliderValue = await this.page.getAttribute(MakeMyTripObject.DURATION_SLIDER_LOC, 'aria-valuenow');
        logger().info("slider value is:"+sliderValue);
    }

    /**
     * This method clicks on the search button
     *
     * @return {*}  {Promise<void>}
     * @memberof MakeMyTripPage
     */
    async search(): Promise<void>{
        logger().info("Click on the search button");
        await this.page.getByRole('button',{ name:'Search' }).click();
    }

    /**
     * Clicks on the apply button
     *
     * @return {*}  {Promise<void>}
     * @memberof MakeMyTripPage
     */
    async clickApply(): Promise<void>{
        logger().info("Click on the apply button");
        await this.page.getByRole('button',{ name:'Apply' }).click();
    }

    /**
     * Returns the search result in array
     *
     * @return {*}  {Promise<boolean>}
     * @param string search item string as argument
     * @memberof MakeMyTripPage
     */
    async validateSearchResult(searchItem : string): Promise<boolean>{
        const results = [];
        results.push(
            await this.page.locator(generateDynamicXpath(MakeMyTripObject.SEARCH_RESULT_LOC, [searchItem]))
            .isVisible(),
        );
        return results.every((v) => v == true);
    }

    /**
     * This method selects the cheapest flight for the selected month
     *
     * @return {*}  {Promise<void>}
     * @memberof MakeMyTripPage
     */
    async selectCheapestFlight() : Promise<void>{
        logger().info("Selecting the cheapest flight available");
        await this.page.waitForTimeout(3000);
        const prices = await this.page.$$eval(MakeMyTripObject.FLIGHT_PRICE_LOC, priceElements =>
            priceElements.map((element, index) => {
                const priceText = element.textContent?.replace('₹', '').trim() || '0';
                return {
                    index,
                    price: parseFloat(priceText.replace(/,/g, ''))
                };
            })
        );
        const minPriceObj = prices.reduce((min, current) => (current.price < min.price ? current : min), prices[0]);
        if (minPriceObj) {
        const minPriceIndex = minPriceObj.index;
        const liElements = await this.page.$$('ul.tripFareCalDates li');
        await liElements[minPriceIndex].click();
        }
        logger().info("Minimum price is: "+minPriceObj.price);
        await this.page.waitForSelector(MakeMyTripObject.AVAILABLE_FLIGHTS_LOC)
        const flightsAvailable = await this.page.$$(MakeMyTripObject.AVAILABLE_FLIGHTS_LOC);
        if (flightsAvailable.length === 0) {
            logger().info("No flights available.");
        } else {
            logger().info(`Found ${flightsAvailable.length} flights.`);
        }
    }
}
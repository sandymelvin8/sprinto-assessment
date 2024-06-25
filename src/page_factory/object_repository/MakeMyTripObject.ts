/**
 * This class is used to define the locators for the Top navigation bar
 *
 * @export
 * @class MakeMyTripObject
 */
export class MakeMyTripObject {
    static readonly AD_BANNER_CLOSE_BTN = `//a[@class='close']`;
    static readonly LOGIN_MODAL_CLOSE_BTN = `//span[@data-cy='closeModal']`;
    static readonly TOP_NAV_HEADER_LINK_BTN = `//span[text()='replace']/preceding-sibling::span[@class='headerIconWrapper']`;
    static readonly SELECT_TRIP_TYPE_DYNAMIC_RADIO_BTN = `//ul[contains(@class,'fswTabs')]//li[@data-cy='replace']`;
    static readonly FROM_LOCATION_LOC = `//input[@id='fromCity']`;
    static readonly CITY_SELECTION_LOC = `//ul[@role='listbox']//span[text()='replace']`;
    static readonly TO_LOCATION_LOC = `//input[@id='toCity']`;
    static readonly INTERNATIONAL_TRIP_BTN = `//p[text()='Planning an international holiday?']`;
    static readonly TRIP_TYPE_LABEL_LOC = `//div[contains(@class,'tripType')]`;
    static readonly SELECT_TRIP_TYPE_OPTIONS_LOC = `//ul[@class='options']/li[text()='replace']`; // Round Trip
    static readonly DESTINATION_DROPDOWN_LOC = `//label[text()='TO']`;
    static readonly ENTER_DESTINATION_LOC = `//div[@class='picker-option ']//input[@placeholder='Enter City']`;
    static readonly SELECT_DESTINATION_LOC = `//ul[@class='flex-v']//span[text()='replace']`;
    static readonly SELECT_DATES_LABEL_LOC = `//label[text()='replace']`;
    static readonly SELECT_MONTH_LOC = `//ul[@class='monthList']//span[text()='replace']`;
    static readonly DURATION_SLIDER_LOC = `//div[contains(@class,'sliderFiltersOuter')]//div[contains(@class,'rangeslider-horizontal')]`;
    static readonly FLIGHT_PRICE_LOC = `//ul[@class='tripFareCalDates']//li//p[@class='calPrice']`;
    static readonly AVAILABLE_FLIGHTS_LOC = `//div[@class='roundTripFlightsSection']`;

    //****************************************Select flights label*************************************************************************/
    static readonly TRIP_TYPE_LOC = `//label[text()='TRIP TYPE']/following-sibling::div[@class='makeFlex']/span`;
    static readonly FROM_LABEL_LOC = `//label[text()='FROM']/following-sibling::div[@class='makeFlex']/span`;
    static readonly TO_LABEL_LOC = `//label[text()='TO']/following-sibling::div[@class='makeFlex']/span`;
    static readonly DATES_AND_DURATION_LOC = `//label[text()='replace']/following-sibling::div[@class='makeFlex']/span`;
    static readonly SEARCH_RESULT_LOC = `//p[contains(text(),'replace')]`;
}

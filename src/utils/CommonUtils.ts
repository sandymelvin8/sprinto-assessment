import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { join } from "path";
import { logger } from "./LoggerUtils";
import { CommonConstants } from "@constants/CommonConstants";
import { Locator, Page } from "@playwright/test";
import { existsSync, mkdirSync } from "fs";

/**
 * To generate a random string
 *
 * @export
 * @param {number} [charCount=4]
 * @return {*}  string Returns string
 */
export function generateRandomString(charCount = 4): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    if (charCount > 0) {
        for (let i = 0; i < charCount; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    }
    return result;
}

/**
 * This method will Read Json file and return json object
 *
 * @export
 * @param string [filepath="../../src/data/Teams.json"]
 * @return {*}   Returns json object
 */
export function readJSON(filepath = "../../src/data/Teams.json"): unknown {
    logger().info(`READ_JSON_FILE_PATH: ${join(__dirname, filepath)}`);
    const rawData = readFileSync(join(__dirname, filepath), "utf-8");
    const json_output: unknown = JSON.parse(rawData);
    return json_output;
}

/**
 * This method will write Json file
 *
 * @export
 * @param  rawData
 * @param string [filepath="../../src/data/Teams.json"]
 */
export function writeJSON(rawData: unknown, filepath = "../../src/data/Teams.json"): void {
    logger().info(`WRITE_JSON_FILE_PATH>>: ${join(__dirname, CommonConstants.FORM_FIELD_DETAILS_PATH)}`);
    const data = getFormattedJsonStringify(rawData);
    writeFileSync(join(__dirname, filepath), data);
}

/**
 * This method will stringify the JSON data
 * and format it and return as formatted JSON string
 *
 * @export
 * @param  rawData JSON data to be formatted
 * @return {*}  string Returns formatted JSON string
 */
export function getFormattedJsonStringify(rawData: unknown): string {
    return JSON.stringify(rawData, null, 4);
}

/**
 * This method will generate URL for account creation functionality
 *
 * @export
 * @param string env
 * @return {*}  string
 */
export function createAccountCreationUrl(env: string): string {
    const account_creation_url = `https://principal.${env}.zingworks.com/accounts/2/AcqFkYe4CKom5/signup`;
    logger().info(`Account URL: ${account_creation_url}`);
    return account_creation_url;
}

/**
 * This method will generate URL for site creation functionality
 *
 * @export
 * @param string subdomain Provide subdomain of the account
 * @param string environment Provide which environment need to be created for the account
 * @param string domain Provide domain of the account
 * @param string endpointUrl Provide endpoint URL to append with dynamic values. Mention dynamic values surrounded by "{}". e.g.: /emp/2/{emp_id}/
 * @param  params Provide dynamic URL values in JSON format e.g.: {"emp_id": "12312323423"}
 * @return {*}  string
 */
export function generateUrl(
    subdomain: string,
    domain: string,
    environment?: string,
    endpointUrl?: string,
    params?: unknown,
): string {
    let site_url: string;
    if (subdomain && domain && environment && endpointUrl && params) {
        site_url = `https://${subdomain}.${environment}.${domain}${endpointUrl.replace(
            /\{([^}]+)\}/g,
            (_, m) => params[m],
        )}`;
    } else if (subdomain && domain && environment && endpointUrl) {
        site_url = `https://${subdomain}.${environment}.${domain}${endpointUrl}`;
    } else if (subdomain && domain && environment) {
        site_url = `https://${subdomain}.${environment}.${domain}/`;
    } else if (subdomain && domain) {
        site_url = `https://${subdomain}.${domain}/`;
    }
    logger().info(`Site URL: ${site_url}`);
    return site_url;
}

/**
 * This method will generate xpath for dynamic value
 *
 * @export
 * @param string loc_str Provide locator string
 * @param {string[]} dynamic_replace_list Provide list of dynamic values
 * @param string [replaceable_word="replace"] Provide replaceable word. Defaults to "replace".
 * @return {*}  string
 */
export function generateDynamicXpath(
    loc_str: string,
    dynamic_replace_list: string[],
    replaceable_word = "replace",
): string {
    const word_count: number = loc_str.split(replaceable_word).length - 1;
    if (word_count === dynamic_replace_list.length) {
        for (const dynamic_val of dynamic_replace_list) {
            loc_str = loc_str.replace(replaceable_word, dynamic_val);
        }
    } else {
        throw new Error(
            `Given dynamic value list '${dynamic_replace_list}' count not match with replaceable word occurrence count '${loc_str}'`,
        );
    }
    return loc_str;
}

/**
 * This method will convert month MMM format to MM format
 *
 * @export
 * @param string month Provide Month in MMM format e.g: Jan -> 01
 * @return {*}  string
 */
export function convertMMMToMM(month: string): string {
    const monthNum = new Date(`${month} 1 2000`).getMonth() + 1;
    const monthStr = monthNum.toString().padStart(2, "0");
    return monthStr;
}

/**
 * This method will convert month MM format to MMM format
 *
 * @export
 * @param string month Provide Month in MM format e.g: 01 -> Jan
 * @return {*}  string
 */
export function convertMMToMonthShortAbbreviation(month: string): string {
    const monthNum = parseInt(month, 10) - 1;
    const monthStr = new Date(2000, monthNum).toLocaleString("default", { month: "short" });
    return monthStr;
}

/**
 * This method will convert month MM format to MMM format
 *
 * @export
 * @param string month Provide Month in MM format e.g: 01 -> January
 * @return {*}  string
 */
export function convertMMToMonthLongAbbreviation(month: string): string {
    const monthNum = parseInt(month, 10) - 1;
    const monthStr = new Date(2000, monthNum).toLocaleString("default", { month: "long" });
    return monthStr;
}

/**
 * This method will return the value of the key from the flow details json
 *
 * @export
 * @param string key
 * @return {*}  string Returns value of the key from the flow details json
 */
export function getFlowDetailsJsonValue(key: string): string {
    return readJSON(CommonConstants.FLOW_DETAILS_PATH)[key];
}
/**
 * This method will return the value of the key from the form field details json
 *
 * @export
 * @return {*}  Returns value of the key from the form field details json
 */
export function getFormFieldDetailsJson(): unknown {
    return readJSON(CommonConstants.FORM_FIELD_DETAILS_PATH);
}

/**
 * This method will return the value of the key from the format settings field details json
 *
 * @export
 * @return {*}  Returns value of the key from the format settings field details json
 */
export function getFormatSettingsJson(key: string): string {
    return readJSON(CommonConstants.FORMAT_SETTINGS_FIELD_DETAILS_PATH)[key];
}

/**
 * This method will return the value of the key from the personal details field details json
 *
 * @export
 * @return {*}  Returns value of the key from the personal details field details json
 */
export function getPersonalDetailsJson(): unknown {
    return readJSON(CommonConstants.PERSONAL_INFO_FIELD_DETAILS_PATH);
}

/**
 * This method will return the value of the key from the create access key field details json
 *
 * @export
 * @return {*}  Returns value of the key from the create access key field details json
 */
export function getAccessKeyJson(key: string): string {
    return readJSON(CommonConstants.ACCESS_KEY)[key];
}
/**
 * This method will return the boolean value if element has the class attribute
 *
 * @export
 * @param {Locator} locator
 * @param string className
 * @return {*}   Returns boolean value if element has the class attribute
 */
export async function expectHaveClasses(locator: Locator, className: string): Promise<boolean> {
    // get current classes of element
    const attrClass = await locator.getAttribute("class");
    const elementClasses: string[] = attrClass ? attrClass.split(" ") : [];
    const targetClasses: string[] = className.split(" ");
    // Every class should be present in the current class list
    const isValid = targetClasses.every((classItem) => elementClasses.includes(classItem));
    return isValid;
}

/**
 * Downloads the file and returns the downloaded file name
 * @param selector element that results in file download
 * @returns downloaded file name
 */
export async function downloadFile(page: Page, selector: string): Promise<string> {
    // let fileName: string;
    const [download] = await Promise.all([
        page.waitForEvent("download"),
        await page.locator(selector).click({ modifiers: ["Alt"] }),
    ]);
    const fileName: string = download.suggestedFilename();
    const filePath = `${CommonConstants.DOWNLOAD_PATH}${fileName}`;
    await download.saveAs(filePath);
    await download.delete();
    return fileName;
}

/**
 * Press a key on web page
 * @param key
 */
export async function keyPress(page: Page, key: string) {
    await page.keyboard.press(key);
}

/**
 * scroll into the view of the element
 *
 * @export
 * @param Locator
 * @return {*}
 */
export async function scrollIntoView(locator: Locator) {
    let i = 0;
    while (await locator.isHidden()) {
        //await this.page.locator("your locator goes here").click();
        await this.page.mouse.wheel(0, 300);
        i++;
        if (await locator.isVisible()) {
            logger().info("STopp the scroll");
            return;
        } else if (i >= 5) {
            return;
        }
    }
}

/**
 * validates the toast message appears on the page
 *
 * @export
 * @param {Page} page
 * @param {string} key
 */
export async function toastMessageValidation(page: Page, key: string) {
    await page.getByText(key).waitFor({ state: "visible", timeout: 30000 });
    await page.getByText(key).waitFor({ state: "hidden", timeout: 30000 });
}

/**
 * validates the label in the page and returns the element which is not present
 *
 * @export
 * @param {Map<string, boolean>} map
 * @return {*}  {Promise<string[]>}
 */
export async function failedValidation(map: Map<string, boolean>): Promise<string[]> {
    const resultsFailed = [];
    map.forEach((value: boolean, key: string) => {
        if (map.get(key) === false) {
            resultsFailed.push(key);
        }
    });
    return resultsFailed;
}

/**
 * This method will remove/delete file from the project folder by given file path
 *
 * @export
 * @param {string} path
 */
export function removeFile(path: string) {
    unlinkSync(path);
}

/**
 * This method will check is folder exist. If not exist will create folder
 *
 * @export
 * @param {string} dirPath
 */
export function checkAndCreateFolder(dirPath: string) {
    try {
        if (!existsSync(join(__dirname, dirPath))) {
            mkdirSync(join(__dirname, dirPath));
        }
    } catch (err) {
        logger().error(err);
    }
}

/**
 * This method will append Json file
 *
 * @export
 * @param  rawData
 * @param string [filepath="../../src/data/Teams.json"]
 */
export function appendJSON(rawData: unknown, filepath = "../../src/data/Teams.json"): void {
    logger().info(`APPEND_JSON_FILE_PATH>>: ${join(__dirname, CommonConstants.FORM_FIELD_DETAILS_PATH)}`);

    // Read the existing JSON file
    const preData = readFileSync(join(__dirname, filepath), "utf-8");
    const jsonPreData: unknown = JSON.parse(preData);
    
    Object.assign(jsonPreData, rawData);
    const data = getFormattedJsonStringify(jsonPreData);
    
    writeFileSync(join(__dirname, filepath), data);
}

/**
 * This method will return the text content of the locator
 *
 * @export
 * @param  locator
 */
export async function getTextContent(page: Page,locator): Promise<string> {

    const textContent = await page.locator(locator).textContent();
    
    return textContent
    
}

/**
 * This method will return the value of the key from the create access key field details json
 *
 * @export
 * @return {*}  Returns value of the key from the create access key field details json
 */
export function getServiceAccessKeyJson(key: string): string {
    return readJSON(CommonConstants.SERVICE_ACCOUNT_ACCESS_KEY)[key];
}

/**
 * This method will authenticate the box
 *
 * @export
 * @param string filePath get a string
 * @return {*}  {Promise<void>}
 */
export async function authenticateBox(email:string, password:string): Promise<void> {
    await this.page.getByRole('button', {name: 'Allow access'}).click();
    const pagePromise = await this.page.waitForEvent("popup");
    const newTab = pagePromise;
    await newTab.waitForLoadState();
    await newTab.getByPlaceholder("Email Address").fill(email);
    await newTab.getByPlaceholder("Password").fill(password);
    await newTab.getByTitle("Authorize").click();
    await newTab.waitForTimeout(2000);
    await newTab.getByTitle("Grant access to Box").click();
    await this.page.bringToFront();
}

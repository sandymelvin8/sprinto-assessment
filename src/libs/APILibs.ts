import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Ajv, { JSONSchemaType } from "ajv";

/**
 * Utility class for API testing with Axios.
 */
export class APILibs {
    /**
     * Send an HTTP request to the API.
     * @param baseUrl - The base URL of the API.
     * @param method - The HTTP method (GET, POST, PUT, DELETE).
     * @param endpoint - The API endpoint.
     * @param data - The data to send in the request body (for POST and PUT).
     * @returns A promise that resolves to the Axios response.
     */
    private static async sendRequest(
        baseUrl: string,
        method: string,
        endpoint: string,
        headers: Record<string, string> = {},
        data?: Record<string, unknown>,
    ): Promise<AxiosResponse> {
        const url = this.normalizeUrl(`${baseUrl}/${endpoint}`);
        let requestBody = null;

        if (data) {
            requestBody = JSON.stringify(data);
        }

        const axiosConfig: AxiosRequestConfig = {
            method,
            url,
            headers,
            data: requestBody,
        };

        return axios(axiosConfig);
    }

    /**
     * Perform an API request (GET, POST, PUT, DELETE).
     * @param baseUrl - The base URL of the API.
     * @param method - The HTTP method (GET, POST, PUT, DELETE).
     * @param endpoint - The API endpoint.
     * @param data - The data to send in the request body (for POST and PUT).
     * @returns A promise that resolves to the Axios response.
     */
    static async performApiRequest(
        baseUrl: string,
        method: string,
        endpoint: string,
        headers: Record<string, string> = {},
        data?: Record<string, unknown>,
    ): Promise<AxiosResponse> {
        return this.sendRequest(baseUrl, method, endpoint, headers, data);
    }

    /**
     * Validate a specific property in the API response.
     * @param response - The Axios response object.
     * @param propertyPath - The property path to validate (e.g., 'user.name').
     * @param expectedValue - The expected value of the property.
     * @returns `true` if the property is valid, otherwise `false`.
     */
    static validatePropertyInResponse(response: AxiosResponse, propertyPath: string, expectedValue: unknown): boolean {
        const responseData = response.data;
        const propertyValue = propertyPath.split(".").reduce((obj, key) => obj[key], responseData);
        return propertyValue === expectedValue;
    }

    /**
     * Compare two API responses to check if they are identical.
     * @param response1 - The first Axios response object.
     * @param response2 - The second Axios response object.
     * @returns `true` if the responses are equal, otherwise `false`.
     */
    static compareResponses(response1: AxiosResponse, response2: AxiosResponse): boolean {
        const responseData1 = response1.data;
        const responseData2 = response2.data;
        return JSON.stringify(responseData1) === JSON.stringify(responseData2);
    }

    static compareResponseToSchema(response: unknown, schema: JSONSchemaType<unknown>): boolean {
        const ajv = new Ajv();
        const validate = ajv.compile(schema);

        // Validate the response against the schema
        const isValid = validate(response);

        return isValid;
    }

    /**
     * Normalize a URL by removing extra slashes and ensuring a standard format.
     * @param {string} url - The URL to normalize.
     * @returns {string} The normalized URL.
     */
    private static normalizeUrl(url: string): string {
        // Use a regular expression to replace consecutive slashes with a single slash
        return url.replace(/([^:]\/)\/+/g, "$1");
    }
}

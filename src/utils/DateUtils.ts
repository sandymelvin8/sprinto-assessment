import { IDate } from "@interface/IDate.interface";
import { logger } from "./LoggerUtils";

export class DateUtils implements IDate {
    constructor() {
        __getddMMMyyyyhhmmss.bind(this);
        __getddMMMyyyyss.bind(this);
        __getddMMMyyyyms.bind(this);
        __getddMMMyyyy.bind(this);
        __getUSFormate.bind(this);
        __getFutureDate.bind(this);
        __getPastDate.bind(this);
        __getTimeStamp.bind(this);
        __getDateTimeStamp.bind(this);
        __getCurrentDay.bind(this);
        __getFutureDayFromCurrentDay.bind(this);
        __getddMMyyyyhhmmss.bind(this);
        __getCustomddmmyyyy.bind(this);
        __getCustFormatDate.bind(this);
    }

    /**
     *
     * This util will return custom date format
     * By default return US format date
     * @param string dateFormat
     * @returns
     * @memberof DateUtils
     */
    getCustomFormatDate(
        dateFormat: "dd-mm-yyyy" | "dd/mm/yyyy" | "yyyy-mm-dd" | "yyyy/mm/dd" | "m/d/yyyy" | "m-d-yyyy",
        custDate?: string,
    ) {
        const date = new Date();
        const tempDay = date.toLocaleString(undefined, {
            day: "2-digit",
        });
        const month = date.toLocaleString(undefined, {
            month: "2-digit",
        });
        const day = tempDay;
        const monthIndex = month;
        const year = date.getFullYear();
        switch (dateFormat.toLowerCase().trim()) {
            case "dd-mm-yyyy":
                return __getCustomddmmyyyy("-", custDate);

            case "dd/mm/yyyy":
                return __getCustomddmmyyyy("/", custDate);

            case "yyyy-mm-dd":
                return __getCustFormatDate(year, monthIndex, day, "-");

            case "yyyy/mm/dd":
                return __getCustFormatDate(year, monthIndex, day, "/");

            case "m/d/yyyy":
                return __getCustmdyyyy("/");

            case "m-d-yyyy":
                return __getCustmdyyyy("-");

            default:
                return __getUSFormate();
        }
    }

    /**
     *
     * This Util will return string Date as ddMMMyyyyhhmmss
     * @returns string
     */
    getddMMMyyyyhhmmss = (): string => {
        return __getddMMMyyyyhhmmss();
    };

    /**
     *
     * This Util will return string Date as ddMMyyyyhhmmss
     * @returns string
     */
    getddMMyyyyhhmmss = (): string => {
        return __getddMMyyyyhhmmss();
    };

    /**
     *
     * This Util will return string Date as ddMMMyyyyss
     * @returns string
     */
    getddMMMyyyyss = (): string => {
        return __getddMMMyyyyss();
    };

    /**
     *
     * This Util will return string Date as ddMMMyyyyss
     * @returns string
     */
    getddMMMyyyyms = (): string => {
        return __getddMMMyyyyms();
    };

    /**
     *
     * This Util will return string Date as ddMMMyyyy
     * @returns string
     */
    getddMMMyyyy = (): string => {
        return __getddMMMyyyy();
    };

    /**
     *
     * This Util will return string Date as US formate
     * @returns string
     */
    getUSFormate = (): string => {
        return __getUSFormate();
    };

    /**
     *
     * This Util will return string Date in future ddmmyyyy
     * @param {number} addDays
     * @returns string
     */
    getFutureDate = (addDays: number): string => {
        return __getFutureDate(addDays);
    };

    /**
     *
     * This Util will return string Date in past ddmmyyyy
     * @param {number} minusDays
     * @returns string
     */
    getPastDate = (minusDays: number): string => {
        return __getPastDate(minusDays);
    };

    /**
     *
     * This Util will return string Time stamp hhmmss
     * @returns string
     */
    getTimeStamp = (): string => {
        return __getTimeStamp();
    };

    /**
     *
     * This Util will return string Date as ddmmyyyyhhmmss
     * @returns string
     */
    getDateTimeStamp = (): string => {
        return __getDateTimeStamp();
    };

    /**
     *
     * This Util will return string with current day[dd]
     * @returns string
     */
    getCurrentDay = (): string => {
        return __getCurrentDay();
    };

    /**
     *
     * This Util will return string with future date from current day[dd]
     * @param {number} addDays
     * @returns string
     */
    getFutureDayFromCurrentDay = (addDays: number): string => {
        return __getFutureDayFromCurrentDay(addDays);
    };

    dateformatConverterTaskDelegation(date: string) {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const dateArray = date.split("/");
        const actualDate = dateArray[1];
        const actualMonth = dateArray[0]; //.replace("/^0+/", "")
        const actualYear = dateArray[2];
        logger().info(
            "Value of the Date is: " +
                monthNames[parseInt(actualMonth) - 1] +
                " " +
                parseInt(actualDate) +
                ", " +
                actualYear,
        );
        return monthNames[parseInt(actualMonth) - 1] + " " + parseInt(actualDate) + ", " + actualYear;
    }
}
// export const dateUtils = new DateUtils();

function __getddMMMyyyyhhmmss() {
    const date = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    return `${day}${monthNames[monthIndex]}${year}${hour}${minute}${seconds}`;
}

function __getddMMyyyyhhmmss() {
    const date = new Date();
    const day = date.toLocaleString(undefined, {
        day: "2-digit",
    });
    const month = date.toLocaleString(undefined, {
        month: "2-digit",
    });
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = new Date().toLocaleString(undefined, {
        minute: "2-digit",
    });
    const seconds = new Date().toLocaleString(undefined, {
        second: "2-digit",
    });
    return `${day}${month}${year}${hour}${minute}${seconds}`;
}

function __getCustmdyyyy(splitter: string) {
    const date = new Date();
    const day = date.toLocaleString(undefined, {
        day: "2-digit",
    });
    const month = date.toLocaleString(undefined, {
        month: "2-digit",
    });
    const year = date.getFullYear();
    return `${month}${splitter}${day}${splitter}${year}`;
}

function __getddMMMyyyyss(): string {
    const date = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const seconds = date.getSeconds();
    return `${day}${monthNames[monthIndex]}${year}${seconds}`;
}

function __getddMMMyyyyms(): string {
    const date = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const ms = date.getMilliseconds();
    return `${day}${monthNames[monthIndex]}${year}${ms}`;
}

function __getddMMMyyyy(): string {
    const date = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day}${monthNames[monthIndex]}${year}`;
}

function __getUSFormate(): string {
    const date = new Date();
    const result = date.toLocaleDateString("en-US");
    return result;
}

function __getFutureDate(addDays: number): string {
    const date = new Date();
    const nextDate = date.getDate() + addDays;
    date.setDate(nextDate);
    const newDate = date.toLocaleString(undefined, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
    return newDate;
}

function __getPastDate(minusDays: number): string {
    const date = new Date();
    const nextDate = date.getDate() - minusDays;
    date.setDate(nextDate);
    const newDate = date.toLocaleString(undefined, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
    return newDate;
}

function __getTimeStamp(): string {
    const timestamp = new Date().toLocaleString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    return timestamp;
}

function __getDateTimeStamp(): string {
    const timestamp = new Date().toLocaleString(undefined, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    return timestamp;
}

function __getCurrentDay(): string {
    const currentDay = new Date().toLocaleString(undefined, {
        day: "numeric",
    });
    return currentDay;
}

function __getFutureDayFromCurrentDay(addDays: number): string {
    const date = new Date();
    const nextDate = date.getDate() + addDays;
    date.setDate(nextDate);
    const currentDay = date.toLocaleString(undefined, {
        day: "numeric",
    });
    return currentDay;
}

function __getCustomddmmyyyy(splitter: string, custDate: string | undefined) {
    const date = new Date();
    let days;
    if (custDate) {
        days = new Date(custDate).toLocaleString(undefined, {
            day: "2-digit",
        });
    } else {
        days = new Date().toLocaleString(undefined, {
            day: "2-digit",
        });
    }
    const newDate = date.toLocaleString(undefined, {
        month: "2-digit",
    });
    const day = days;
    const monthIndex = newDate;
    const year = date.getFullYear();
    return day + splitter + monthIndex + splitter + year;
}

function __getCustFormatDate(
    format1: string | number,
    format2: string | number,
    format3: string | number,
    splitter: string,
) {
    return format1 + splitter + format2 + splitter + format3;
}

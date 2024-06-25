/**
 * This interface has the Date related abstracts
 *
 * @export
 * @interface IDate
 */
export interface IDate {
    getCurrentDay(): string;
    getDateTimeStamp(): string;
    getFutureDate(addDays: number): string;
    getFutureDayFromCurrentDay(addDays: number): string;
    getPastDate(minusDays: number): string;
    getTimeStamp(): string;
    getUSFormate(): string;
    getddMMMyyyy(): string;
    getddMMMyyyyhhmmss(): string;
    getddMMyyyyhhmmss(): string;
    getddMMMyyyyss(): string;
    getCustomFormatDate(
        dateFormat: "dd-mm-yyyy" | "dd/mm/yyyy" | "yyyy-mm-dd" | "yyyy/mm/dd" | "m/d/yyyy" | "m-d-yyyy" | string,
    ): string;
}

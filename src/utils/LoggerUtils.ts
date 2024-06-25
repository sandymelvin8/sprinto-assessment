import { ILogger } from "@interface/ILogger.interface";
import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, printf } = format;

/**
 * This class is used to log information's
 *
 * @class LoggerUtils
 */
class LoggerUtils {
    public static myFormat = printf((info) => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
    });

    /**
     * To Logs a message
     *
     * @param {ILogger} [logConf={ level: "", format: "", transports: [] }]
     * @return {*}
     * @memberof LoggerUtils
     */
    public logger(logConf: ILogger = { level: "", format: "", transports: [] }) {
        const logLevel = logConf.level ? logConf.level : (logConf.level = "info");
        const logFormat = logConf.format
            ? logConf.format
            : (logConf.format = combine(label({ label: "Logger" }), timestamp(), LoggerUtils.myFormat));
        const logTransport =
            logConf.transports && logConf.transports.length > 0
                ? logConf.transports
                : [new transports.File({ filename: "test-results/logs/execution.log" }), new transports.Console()];
        return createLogger({
            level: logLevel,
            format: logFormat,
            transports: logTransport,
        });
    }
}

export const logger = new LoggerUtils().logger;

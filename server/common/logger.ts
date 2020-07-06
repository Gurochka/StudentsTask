import * as path from 'path';
export const logDir = path.join(__dirname, '/.log');
// export const logDir = path.join(path.dirname(require.main.filename), '/.log');

import * as fs from 'fs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

import { createLogger, format, transports } from 'winston';
const { combine, printf } = format;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');
const logFile = path.join(logDir, `/log.${moment().format('YYYYMMDDHHmmss')}.txt`);

const rowFormat = printf(info => {
    return `${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} [${info.level}]: ${info.message}`;
});

class Logger {

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    private maxLoggerMessageLength = 1024;
    private logObject = null;
    public stream: any = null;

    constructor () {
        this.logObject = createLogger({
            format: combine(
                rowFormat
            ),
            transports: [
                new(transports.File)({ filename: logFile }),
                new(transports.Console)({ level: 'verbose' })
            ]
        });

        const self = this;
        this.stream = {
            write(message) {
                self.message(message);
            }
        };
    }

    public error (message: string | object, object: object = null): void {
        this.logObject.log('error', this.normalizeMessage(message, object));
    }

    public warning (message: string | object, object: object = null): void {
        this.logObject.log('warn', this.normalizeMessage(message, object));
    }

    public message (message: string | any, object: object = null): void {
        this.logObject.log('info', this.normalizeMessage(message, object));
    }

    public verbose (message: string | object, object: object = null): void {
        this.logObject.log('verbose', this.normalizeMessage(message, object));
    }

    public debug (message: string | object, object: object = null): void {
        this.logObject.log('debug', this.normalizeMessage(message, object));
    }

    public silly (message: string | object, object: object = null): void {
        this.logObject.log('silly', this.normalizeMessage(message, object));
    }

    private normalizeMessage(message: string | any, object: any): string {
        if (message.message) {
            return message.message;
        }

        let result = (typeof message === 'string' || message instanceof String)
            ? String(message)
            : JSON.stringify(message);

        try {
            if (object.message) {
                result = `${result} ${JSON.stringify(object.message)}`;
            } else {
                result = `${result} ${JSON.stringify(object)}`;
            }
        } catch (err) {
            // empty
        }

        if (result && result.length > this.maxLoggerMessageLength) {
            result = `${result.substr(0, this.maxLoggerMessageLength)} ...`;
        }
        return result;
    }
}

export const logger = new Logger();

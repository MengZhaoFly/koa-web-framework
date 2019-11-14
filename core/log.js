/** */
const path = require('path');
// const log4js = require('log4js');
const log4js = require("log4js");
const logConfig = require('../config/log4js.config.js');
log4js.configure(logConfig);

const consolelogger = log4js.getLogger('console');
const getLogger = (type) => {
    return log4js.getLogger(type);
}
exports.consolelogger = consolelogger;
exports.getLogger = getLogger;

exports.use = (app) => {
    app.use(log4js.connectLogger(logger, {level: 'info', format: ':method :url :status :response-timems'}));
}
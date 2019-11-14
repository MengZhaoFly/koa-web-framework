module.exports = {
  appenders: {
    app_log: {
      type: "dateFile",
      filename: "log/app.log",
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
    },
    app_log_error: {
      type: "dateFile",
      filename: "log/app_log_error.log",
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
    },
    console: { type: "console" }
  },
  categories: {
    default: {
      appenders: ["app_log"],
      level: "debug"
    },
    console: {
      appenders: ['console'],
      level: 'all'
    },
    app_log_error: {
      appenders: ['app_log', 'app_log_error'],
      level: 'error'
    }
  }
}
/**
  level:
    logger.trace('Entering cheese testing');
    logger.debug('Got cheese.');
    logger.info('Cheese is Comté.');
    logger.warn('Cheese is quite smelly.');
    logger.error('Cheese is too ripe!');
    logger.fatal('Cheese was breeding ground for listeria.');
*/
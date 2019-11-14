/**
 * 1. 别名初始化
 */
require('module-alias/register')
const path = require('path')
const Koa = require('koa')
const parser = require('koa-bodyparser')
const static = require('koa-static')

const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
const log = require('./core/log.js');
// 普通输出
global.LOG = log.consolelogger;
// 写入日志文件
global.APPLOG = log.getLogger();
global.APPLOGERROR = log.getLogger('app_log_error');
// global.TIMELOG = log.getLogger('recordRequestTime');
// global.UPLOADERROR = log.getLogger('recordUploadFileError');
// 加载 日志配置

const app = new Koa()

// APPLOG.debug('Got cheese.');
// APPLOG.info('Cheese is Comté.');
// logger.warn('Cheese is quite smelly.');
APPLOGERROR.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');
// 应用程序对象 中间件
app.use(catchError)
app.use(parser())
InitManager.initCore(app)
app.use(static(path.join(__dirname, './static')))


app.listen(3000, () => console.log('http://localhost:3000'))
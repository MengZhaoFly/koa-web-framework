const { HttpException } = require('../core/http-exception')
const catchError = async (ctx, next) => {
  process.on('unhandledRejection', (err) => {
    console.log('err->>>>>>>>unhandledRejection', err)
    ctx.body = {
      error_code: 400,
      msg: err
    }
  })
  process.on('uncaughtException', (err) => {
    console.log('err->>>>>>>>uncaughtException', err)
    ctx.body = {
      error_code: 400,
      msg: err
    }
  })
  try {
    await next()
  } catch (error) {
    console.log('try catch error--------', error);
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'
    //  开发环境 不是 http 异常
    if(isDev && !isHttpException) {
      throw error
    }
    // 生产环境
    if(isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ ctx.method } ${ ctx.path }`
      }
      ctx.status = error.code
    } else {
      ctx.body = {
        msg: 'we made a mistake',
        error_code: 999,
        request: `${ ctx.method } ${ ctx.path }`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
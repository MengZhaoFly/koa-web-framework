const bcrypt = require('bcryptjs')
const KoaRouter = require('koa-router')
const validator = require('validator')
const { RegisterValidator } = require('@validator')
const { User } = require('@models/user')
const { success } = require('@lib/helper')

const router = new KoaRouter({
  prefix: '/v1/user'
})

// 注册 新增数据 put get delete

router.get('/register', async (ctx) => {
  const userName = 'pilipala';
  const email = '1424254461@qq.com'
  const passWord = '123456'
  // 校验

  let aaaa = new RegisterValidator().validate([
    {
      rule: () => validator.isLength(userName, { min:4, max: 10 }),
      msg: '用户名长度为：4～10'
    },
    {
      rule: () => validator.isEmail(email),
      msg: '邮箱不合法' 
    }
  ])
  // 获取数据
  const user = {
    userName,
    email,
    passWord
  }
  // 插入数据库
  await User.create(user)

  // 返回数据给客户端
  // throw new global.errs.Success()
  success()
})
router.get('/query', async (ctx) => {
  const user = await User.findAll();
  ctx.body = user;
})

module.exports = router
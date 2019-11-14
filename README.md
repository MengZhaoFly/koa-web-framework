## 路由导入
[require-directory](https://www.npmjs.com/package/require-directory)

## 模块别名
[module-alias](https://www.npmjs.com/package/module-alias)

## api
1. 参数验证
- validator 定义规则
  ```js
  const v = await new RegisterValidator().validate(ctx)

  class RegisterValidator extends BaseValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '不符合Emial规范')
    ]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]")
    ]
    this.password2 = this.password2
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32
      })
    ]
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if(psw1 !== psw2) {
      throw new Error('两次输入密码必须相同')
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if(user) {
      throw new Error('email已存在')
      }
    }
  }
  // BaseValidator 负责整体校验
  ```
2. 获取数据
3. 插入数据库
   ```js
   await User.create(user)
   ```
  
## 初始化
1. 加载 路由
2. 加载 httpException
3. 加载 配置


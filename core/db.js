const { Sequelize, Model } = require('sequelize')
const { unset, clone, isArray } = require('lodash')
// 导入数据配置
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql', // 定义链接的数据库
  host,
  port,
  logging: false, // 命令行显示sql语句
  timezone: '+08:00',
  define: {
    timestamps: true, // 指定是否将创建 `createdAt` 和 `updatedAt` 字段
    paranoid: true, // 不删除数据库条目,但将新添加的属性deletedAt设置为当前日期(删除完成时)
    underscored: true, // 将自动设置所有属性的字段参数为下划线命名方式
    freeZeTableName: true, // 表名  不变为复数
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    },
    scopes: {                // 定义 scopes 查询的时候 可用
      deleted: {
        where: {
          deleted: true
        }
      },
      unsetTime: {

      }
    }
  }
})

// json 序列化
Model.prototype.toJSON= function() {
  // let data = this.dataValues
  let data = clone(this.dataValues)
  unset(data, 'updated_at')
  unset(data, 'created_at')
  unset(data, 'deleted_at')

  for(key in data) {
    if(key === 'image') {
      if(!data[key].startsWith('http')) {
        data[key] = global.config.host + data[key]
      }
    }
  }

  if(isArray(this.exclude)) {
    this.exclude.forEach(value => {
      unset(data, value)
    })
  }
  return data
}
/**
希望 Sequelize 根据你的模型定义自动创建表(或根据需要进行修改),
*/
sequelize.sync({
  force: false
})

module.exports = {
  sequelize
}
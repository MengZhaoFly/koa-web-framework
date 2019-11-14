const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('@db')

class User extends Model {
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
}, {
  sequelize,
  tableName: 'user'
})

module.exports = {
  User
}
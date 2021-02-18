require('dotenv').config();

module.exports = {
  app: {
    port: process.env.APP_PORT,
  },
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  passwordSalt: process.env.PASSWORD_SALT,
}

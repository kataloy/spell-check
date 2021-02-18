const config = require('.');

module.exports = {
  [process.env.NODE_ENV]: config.db,
};

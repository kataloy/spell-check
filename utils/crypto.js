const crypto = require('crypto');

const getHash = data => crypto.createHash('sha256').update(data).digest('hex');

module.exports = {
  getHash
};
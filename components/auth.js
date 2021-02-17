const crypto = require('crypto');
const { User } = require('../models');
const { ValidationError, AuthorizationError } = require('../errors');
const client = require('../utils/redis');

class Auth {
  async signUp ({ username, password }) {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (user) {
      throw new ValidationError('This username already exists.');
    }

    const record = await User.create({
      username,
      password: crypto.createHash('sha256').update(password).digest('hex'),
    });

    return {
      username,
      id: record.id,
    };
  }

  async signIn ({ username, password }) {
    const user = await User.findOne({
      where: {
        username,
        password: crypto.createHash('sha256').update(password).digest('hex'),
      },
    });

    if (!user) {
      throw new AuthorizationError('Invalid user or password');
    }

    const token = crypto.createHash('sha256').update(this.getRandom()).digest('hex');
    await client.set(token, user.id);


    return token;
  }

  getRandom () {
    return `${Math.random() * 1000000 + Date.now()}`;

  }
}

module.exports = new Auth();
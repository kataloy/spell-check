const { User } = require('../models');
const { ValidationError, AuthorizationError } = require('../errors');
const redis = require('../utils/redis');
const { passwordSalt } = require('../config');
const crypto = require('../utils/crypto');

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
      password: crypto.getHash(`${passwordSalt}${password}`),
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
        password: crypto.getHash(`${passwordSalt}${password}`),
      },
    });

    if (!user) {
      throw new AuthorizationError('Invalid user or password');
    }

    const token = crypto.getHash(this.getRandom());
    await redis.set(`token:${token}`, user.id);

    return token;
  }

  async signOut (token) {
    return await redis.del(`token:${token}`);
  }

  getRandom () {
    return `${Math.random() * 1000000}_${Date.now()}`;
  }
}

module.exports = new Auth();
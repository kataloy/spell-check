const redis = require('../utils/redis');
const { User } = require('../models');

module.exports = async (ctx, next) => {
  const { authorization } = ctx.headers;
  const [, token] = authorization.split(' ');

  const userId = await redis.get(`token:${token}`);

  if (!userId) {
    ctx.throw(401);
  }

  ctx.state.token = token;

  ctx.state.user = await User.findOne({
    where: {
      id: userId,
    },
  });

  await next();
}
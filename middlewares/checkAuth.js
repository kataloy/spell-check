const client = require('../utils/redis');

module.exports = async (ctx, next) => {
  const { authorization } = ctx.headers;
  const [, token] = authorization.split(' ');

  const userId = await client.get(token);

  if (!userId) {
    ctx.throw(401);
  }

  ctx.state.user = {
    userId,
  };

  await next();
}
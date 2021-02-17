module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const status = err.status || 500;
    const message = status >= 500 ? "Internal server error" : err.message;

    ctx.status = status;
    ctx.body = { error: message };

    ctx.app.emit('error', err, ctx);
  }
};
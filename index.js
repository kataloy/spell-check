const Koa = require('koa');
const Router = require('@koa/router');
const bodyparser = require('koa-bodyparser');
const handleError = require('./middlewares/handleError');
const { auth, spellCheck } = require('./controllers');
const { PORT } = require('./config');

const app = new Koa();
const router = new Router({ prefix: '/api/v1' });

app.on('error', console.error);

auth(router);
spellCheck(router);

app.use(handleError);
app.use(bodyparser());
app.use(router.routes());

module.exports = app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT} port`);
})
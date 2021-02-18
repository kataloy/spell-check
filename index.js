const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const handleError = require('./middlewares/handleError');
const { auth, spellCheck } = require('./controllers');
const config = require('./config');

const app = new Koa();
const router = new Router({ prefix: '/api/v1' });

app.on('error', console.error);

auth(router);
spellCheck(router);

app.use(handleError);
app.use(koaBody({
  formidable: { uploadDir: './uploads' },
  multipart: true,
  urlencoded: true,
}));
app.use(router.routes());

module.exports = app.listen(config.app.port, () => {
  console.log(`Server is listening on ${config.app.port} port`);
})
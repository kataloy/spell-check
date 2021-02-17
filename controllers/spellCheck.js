const { spellCheck } = require('../components');
const checkAuth = require('../middlewares/checkAuth');

module.exports = (router) => {
  router.post('/texts/check',checkAuth, async (ctx) => {
    ctx.body = await spellCheck.checkText(ctx.request.body);
  });
};
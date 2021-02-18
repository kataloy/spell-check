const { auth } = require('../components');
const checkAuth = require('../middlewares/checkAuth');

module.exports = (router) => {
  router.post('/auth/signup', async (ctx) => {
    ctx.body = await auth.signUp(ctx.request.body);
  });

  router.post('/auth/signin', async (ctx) => {
    ctx.body = await auth.signIn(ctx.request.body);
  });

  router.post('/auth/signout',checkAuth, async (ctx) => {
    ctx.body = await auth.signOut(ctx.state.token);
  })
};
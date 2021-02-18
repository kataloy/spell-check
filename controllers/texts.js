const { texts } = require('../components');
const checkAuth = require('../middlewares/checkAuth');
const fs = require('fs');

const fsPromises = fs.promises;

module.exports = (router) => {
  router.post('/texts/check', checkAuth, async (ctx) => {
    const { files } = ctx.request;

    if (files) {
      const text = await fsPromises.readFile(files.file.path, 'utf8');

      ctx.body = await texts.checkText({ text });
    } else {
      ctx.body = await texts.checkText(ctx.request.body);
    }
  });
};
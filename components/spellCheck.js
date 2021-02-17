const checkYaspeller = require('../utils/yaspeller');

class SpellCheck {
  correctText = (typos, originalText) => {
    let newText = originalText;

    typos.forEach((item) => {
      if(item.s.length > 0) {
        newText = newText.replace(item.word, item.s[0]);
      }
    });

    return newText;
  }

  async checkText ({ text }) {
    const result = await checkYaspeller(text, {
      lang: 'ru',
    });

    return this.correctText(result.data, result.text);
  }
}

module.exports = new SpellCheck();
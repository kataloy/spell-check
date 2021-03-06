const yaspeller = require('../utils/yaspeller');

class Texts {
  correctText (typos, text) {
    typos.forEach((item) => {
      if (item.s.length > 0) {
        text = text.replace(item.word, item.s[0]);
      }
    });

    return text;
  }

  async checkText ({ text, lang }) {
    const result = await yaspeller.checkText(text, {
      lang,
    });

    return {
      text: this.correctText(result.data, result.text)};
  };
}

module.exports = new Texts();
const yaspeller = require('yaspeller');

const checkText = (text, options) => {
  return new Promise((resolve, reject) => {
    yaspeller.checkText(text, (err, data, text) => {
      if (err) {
        reject(err);
      } else {
        resolve({ data, text });
      }
    }, options);
  });
};

module.exports = {
  checkText,
}


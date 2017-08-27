const API_BASE = 'http://emojification-server.herokuapp.com/api/v1';

const utils = {
  fetchTranslatedText: (text, cb) => {
    fetch(API_BASE + '/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: text
      })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      cb(null, json.translated);
    })
    .catch(err => {
      cb(err);
    });
  },
  parseEmojifiedText: (text) => {
    return window.twemoji.parse(
      text,
      {
        ext: '.svg',
        folder: 'svg'
      }
    );
  }
};

export default utils;
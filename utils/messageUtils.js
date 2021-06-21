const moment = require('moment');

function formatMessage(user, text, base64Photo) {
  return {
    user: user ? user : '',
    text: text ? text : '',
    photo: base64Photo ? base64Photo : undefined,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;

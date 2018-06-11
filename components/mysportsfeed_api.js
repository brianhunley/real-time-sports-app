const MySportsFeeds = require('mysportsfeeds-node');
const { Settings, SAVEDIR } = require("./settings");

let settings = new Settings();

settings.load('../settings');
const userId = settings.get('mysportsfeed.userId');
const password = settings.get('mysportsfeed.password');

const msf = new MySportsFeeds('1.2', true, null);
msf.authenticate(userId, password);

const today = new Date();
const forDate = today.getFullYear() +
  ('0' + parseInt(today.getMonth() + 1)).slice(-2) +
  ('0' + today.getDate()).slice(-2);

const getData = function() {
  return msf.getData('mlb', '2018-regular', 'scoreboard', 'json', {
    fordate: forDate,
    force: true
  });
};

module.exports = { getData };
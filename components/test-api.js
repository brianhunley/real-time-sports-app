const MySportsFeeds = require('mysportsfeeds-node');
const { Settings, SAVEDIR } = require("./settings");

let settings = new Settings();
settings.SAVEDIR = '..';
const userId = settings.get('mysportsfeed.userId');
console.log(userId);
const password = settings.get('mysportsfeed.password');
console.log(password);

exit;

const msf = new MySportsFeeds('1.2', true);
msf.authenticate(userId, password);

const today = new Date();
const forDate = today.getFullYear() +
  ('0' + parseInt(today.getMonth() + 1)).slice(-2) +
  ('0' + today.getDate()).slice(-2);

// console.log(forDate);

// msf.getData('mlb', '2017-2018-regular', 'scoreboard', 'json', {
//   fordate: forDate,
//   force: false
// });

// msf.getData('mlb', '2017-playoff', 'full_game_schedule', 'json', {});

msf.getData('mlb', '2018-regular', 'scoreboard', 'json', {
  fordate: forDate,
  force: false
});

// msf.getData('nhl', '2017-2018-regular', 'scoreboard', 'json', {
//   fordate: forDate,
//   force: true
// });

// msf.getData('nfl', '2015-2016-regular', 'cumulative_player_stats', 'json', {
//    team: 'dallas-cowboys'
// });

// msf.getData('mlb', '2018-regular', 'game_boxscore', 'json', {
//   gameid: '20180610-NYY-NYM',
//   teamstats: 'W,L',
//   playerstats: 'AB,H,R,HR,ER',
//   force: false
// });

// msf.getData('mlb', '2018-regular', 'game_boxscore', 'json', {
//   gameid: '20180610-NYY-NYM',
//   force: false
// });

const { Settings, SAVEDIR } = require("./settings");

let settings = new Settings();

settings.SAVEDIR = '..';
settings.add('mysportsfeed.userId', 'myUserId');
settings.add('mysportsfeed.password', 'myPassword');
settings.save('../settings.example');

settings.load('../settings.example');
console.log(settings.get('mysportsfeed.userId'));
console.log(settings.get('mysportsfeed.password'));
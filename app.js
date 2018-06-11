const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const mysportsfeed_api = require('./components/mysportsfeed_api');

const publicPath = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// global variable to store the latest MLB results
let latestSportsData;

// set the server path to the public folder
app.use(express.static(publicPath));

// set the routes
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

// set the server port
server.listen(port, () => {
  console.log(`HTTP Server is running on port ${port}`);
});

// load the MLB data when a client first connects
// this will be updated every 10 minutes
mysportsfeed_api.getData().then((result) => {
  latestSportsData = result;
});

io.on('connection', (socket) => {
  // when a client connects, send the latest data
  socket.emit('data', latestSportsData);

  // socket.io sample code
  // console.log('Client connection received');
  // socket.emit('sendToClient', { hello: 'world' });
  // socket.on('receivedFromClient', (data) => {
  //   console.log(data);
  // });
});

// refresh the data every 10 minutes
setInterval(() => {
  data.getData().then((results) => {
    // update the latest results
    latestSportsData = result;

    // send it to all the connected clients
    io.emit('data', result);

    console.log('Last updated: ' + new Date());
  });
}, 600000);
const Web3 = require('web3');
const Web3WsProvider = require('web3-providers-ws');
const WebSocket = require('websocket').server;
const settings = require('./config.json');
const contractABI = require('./ABI.json');
const utils = require('./utils.js');

const path = require('path');

// Create an HTTP server
const server = utils.createHTTPServer(settings.path_to_serv_frontend);

// Bind the WebSocket server to the HTTP server
const wsServer = new WebSocket({
  httpServer: server,
});

// Connect with the WebSocket provider URL
const wsProvider = new Web3WsProvider(settings.ethereum_node_ws_url);

const web3 = new Web3(wsProvider);

wsServer.on('request', (request) => {
  console.log("OBS connected");
  const connection = request.accept(null, request.origin);

  const contract = new web3.eth.Contract(contractABI, settings.contractAddress);

  contract.events.DonationEvent()
    .on('data', (event) => {
      var msg = {"address": event.returnValues._from, "value": event.returnValues._value, "message": event.returnValues._msg};
      connection.sendUTF(JSON.stringify(msg));
      console.log(`Donation: Address=${event.returnValues._from} msg=${event.returnValues._msg} amount:${event.returnValues._value / 1000000000000000} Finney`);
    })
    .on('error', (error) => {
      console.error('Error receiving event:', error);
    });
});

server.listen(settings.local_port, () => {
  console.log(`AcstRay OBS Plugin running on http://localhost:${settings.local_port}`);
});

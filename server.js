var app = require('http').createServer(function(req, res) {});
app.listen(process.env.PORT || process.env.C9_PORT || 8001);
var io = require('socket.io').listen(app),
    ioClient = require('socket.io-client');

var groups = {},
    chatServers = ["http://agc1.abhishekmunie.com", "http://agc2.abhishekmunie.com", "http://agc3.abhishekmunie.com"],
    chatServerSockets = [];
var chatLen = chatServers.length;
for (var len = chatLen; len;)(chatServerSockets[len] = new ioClient.Socket(chatServers[--len] + "/")).connect();

var insocket = io.sockets.on('connection', function(socket) {
    socket.on('createGroup', function(group) {
        socket.broadcast.emit('createGroup', group);
        //groups[group] = {sockets: []};
        io.of(group).on('connection', function(socket) {
            socket.on('message', function(data) {
                socket.broadcast.emit("message", data);
            });
        });
        //for (var len=chatLen;len;)(groups[group].sockets[len] = new ioClient.Socket(chatServers[--len] + group)).connect();
        //groups[data.group].sockets[Math.floor(Math.random() * chatLen)].emit("message", data.data);
    });
});
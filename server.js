var app = require('http').createServer(function(req, res) {});
app.listen(process.env.PORT || process.env.C9_PORT || 8001);

var io = require('socket.io').listen(app);

io.sockets.on('connection', function(socket) {
    socket.on('createGroup', function(group) {
        socket.broadcast.emit('createGroup', group);
        io.of(group).on('connection', function(socket) {
            socket.on('message', function(data) {
                socket.broadcast.emit("message", data);
            });
        });
    });
});
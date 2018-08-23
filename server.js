var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3003;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


http.listen(port, () => {
    console.log('connected to port *' + port);
});

io.on('connection', function(socket) {
    socket.on('message', function(jsonArr) {
        // io.emit('message', jsonArr.msg);
        socket.broadcast.to(jsonArr.room).emit('message', jsonArr.msg);
        console.log(jsonArr);
    });

    socket.on('join', function(room) {
        socket.join(room);
        socket.emit('show chat box', [true, room]);
    });
});



var handler = function(req, res) {
    fs.readFile('./page.html', function (err, data) {
        if(err) throw err;
        res.writeHead(200);
        res.end(data);
    });
}


var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var Moniker = require('moniker');
var port = 3250;
 
app.listen(port);



// note, io.listen(<port>) will create a http server for you
/*var io = require('socket.io').listen(80);

io.sockets.on('connection', function (socket) {
  io.sockets.emit('this', { will: 'be received by everyone'});

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.sockets.emit('user disconnected');
  });
});*/
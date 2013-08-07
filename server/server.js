/* Let’s begin with a simple server, which will deliver the application's HTML page, 
and then continue with the more interesting bits: the real time communication. 
Create an index.js file with the following core expressjs code: */

var express = require("express");
var app = express();
var port = 3700;
 
app.get("/", function(req, res){
    res.send("It works!");
});
 
app.use(express.static(__dirname + '/')); 
var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);


/* Above, we’ve created an application and defined its port. 
Next, we registered a route, which, in this case, is a simple GET request without any parameters. 
For now, the route’s handler simply sends some text to the client. 
Finally, of course, at the bottom, we run the server. 
To initialize the application, from the console, execute:

node server.js
*/

/*The Jade's syntax is not so complex, but, for a full guide, I suggest that you refer to jade-lang.com. 
In order to use Jade with ExpressJS, we require the following settings. */

app.set('views', '../tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

/* we need to write the code that will receive a message from the client, and send it to all the others. 
Every Socket.io application begins with a connection handler. We should have one: 
*/

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
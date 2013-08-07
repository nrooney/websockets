//The method reads the .html page and simply send it to the browser. 
var handler = function(req, res) {
    fs.readFile('./page.html', function (err, data) {
        if(err) throw err;
        res.writeHead(200);
        res.end(data);
    });
}

//Immediately after that define the main variables of the application and start the http server:
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var Moniker = require('moniker');
var port = 3250;
 
app.listen(port);

//Socket.io library has really nice event based API. 
// I.e. you have to subscribe or dispatch/emit events to make the communication with the client side. 
// adds listener to the connection event which fires every time when a new user visits the game

io.sockets.on('connection', function (socket) { //The handler accepts socket object which is actually the socket to that specific user
    var user = addUser(); //new user object (check below for addUser function) is created. It will keep the username of the user and his clicks.
    updateWidth();
    socket.emit("welcome", user); //if you want to send something to only this user you should use socket.emit
    socket.on('disconnect', function () {
        removeUser(user);
    });
    socket.on("click", function() {
        currentWidth += 1;
        user.clicks += 1;
        if(currentWidth == winWidth) {
            currentWidth = initialWidth;
            io.sockets.emit("win", { message: "<strong>" + user.name + "</strong> rocks!" }); //Pay attention to the usage of io.sockets.emit. That's how you will send a message to all the users in the game.
        }
        updateWidth();
        updateUsers();
    });
});

//Here is the rest of the back-end code:
var initialWidth = 20;
var currentWidth = initialWidth;
var winWidth = 150;
var users = [];
 
//creates a new user with unique random name and adds it to users array
var addUser = function() {
    var user = {
        name: Moniker.choose(),
        clicks: 0
    }
    users.push(user);
    updateUsers();
    return user;
}

// removes user from users array
var removeUser = function(user) {
    for(var i=0; i<users.length; i++) {
        if(user.name === users[i].name) {
            users.splice(i, 1);
            updateUsers();
            return;
        }
    }
}

// composes string/list with all the current users
var updateUsers = function() {
    var str = '';
    for(var i=0; i<users.length; i++) {
        var user = users[i];
        str += user.name + ' <small>(' + user.clicks + ' clicks)</small>';
    }
    io.sockets.emit("users", { users: str });
}

// sends the current width of the block to the front-end
var updateWidth = function() {
    io.sockets.emit("update", { currentWidth: currentWidth });
}

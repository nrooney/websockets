var app = {
    
    // Application Constructor
    initialize: function() {
    	console.log('RUNNING');

    	/* we create an array, which will store all the messages, a socket object, 
    	and few shortcuts to our DOM elements. Again, similar to the back-end, we bind a function, 
    	which will react to the socket's activity. In our case, this is an event, named message. 
    	When such an event occurs, we expect to receive an object, data, with the property, message. 
    	Add that message to our storage and update the content div. 
    	We’ve also included the logic for sending the message. It’s quite simple, simply emitting a 
    	message with the name, send.
    	*/


        var messages = [];
	    var socket = io.connect('http://localhost:3700');
	    var user = document.getElementById("user");
	    var field = document.getElementById("field");
	    var sendButton = document.getElementById("send");
	    var content = document.getElementById("content");
	 
	    socket.on('message', function (data) {
	        if(data.message) {
	            messages.push(data.message);
	            var html = '';
	            for(var i=0; i<messages.length; i++) {
	                html += messages[i];
	            }
	            content.innerHTML = html;
	        } else {
	            console.log("There is a problem:", data);
	        }
	    });
	 
	    sendButton.onclick = function() {
	        var text = '<div class="wholemessage"><div class="auser">' + user.value + '</div><div class="amessage">' + 
	        			field.value + '</div></div>';
	        field.value = '';
	        socket.emit('send', { message: text });
	    }
		//this.socketio();

    },

    // socketio fun!
    // connecting to the http server (by using the specific port). 
    // After that there are several listeners which are updating the front end containers. 
    // There is only one place where the script sends something to the back-end and 
    // this is when the user clicks on the block.
    socketio: function() {
 
	    var welcome = document.getElementById("welcome");
	    var allUsers = document.getElementById("users");
	    var progress = document.getElementById("progress");
	    var results = document.getElementById("results");
	 
	    var socket = io.connect('http://localhost:3250');
	    socket.on('welcome', function (data) {
	        console.log(data);
	        welcome.innerHTML = "Welcome to the game <strong>" + data.name + "</strong>";
	    });
	    socket.on('users', function (data) {
	        allUsers.innerHTML = "<strong>Users:</strong>" + data.users;
	    });
	    socket.on('update', function (data) {
	        progress.innerHTML = data.currentWidth;
	        progress.style.width = parseInt(data.currentWidth) + "px";
	    });
	    socket.on('win', function (data) {
	        results.innerHTML = data.message;
	    });
	 
	    progress.onclick = function() {
	        socket.emit("click");
	    }
    }
    
};





var app = {
    
    // Application Constructor
    initialize: function() {
    	console.log('RUNNING');
        var connection = new WebSocket('ws://html5rocks.websocket.org/echo', ['soap', 'xmpp']);

        // When the connection is open, send some data to the server
		connection.onopen = function () {
		  	connection.send('Ping'); // Send the message 'Ping' to the server

		  	// Sending String
			connection.send('Hi! I am testing websockets!');

			// Sending canvas ImageData as ArrayBuffer
			//var img = canvas_context.getImageData(0, 0, 400, 320);
			//var binary = new Uint8Array(img.data.length);
			//for (var i = 0; i < img.data.length; i++) {
			//  binary[i] = img.data[i];
			//}
			//connection.send(binary.buffer);

			// Sending file as Blob
			//var file = document.querySelector('input[type="file"]').files[0];
			//connection.send(file);
		};

		// Log errors
		connection.onerror = function (error) {
		  console.log('WebSocket Error ' + error);
		};

		// Log messages from the server
		connection.onmessage = function (e) {
		  console.log('Server: ' + e.data);
		};

		/*var socket = io.connect('http://localhost');
		socket.on('news', function (data) {
			console.log(data);
			socket.emit('my other event', { my: 'data' });
		});*/

		this.socketio();

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





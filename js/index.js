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

		var socket = io.connect('http://localhost');
		socket.on('news', function (data) {
			console.log(data);
			socket.emit('my other event', { my: 'data' });
		});

    }
    
};





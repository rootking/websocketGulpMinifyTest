var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

io.on('connection', function(socket) {
  socket.on('setPseudo', function(data) {
    socket.pseudo = data;
  });
  socket.on('message', function(message) {
    var err = {
      "message": "you need a username!"
    };
    var sendThis = {
      "message": message,
      "pseudo": socket.pseudo
    };
    if (socket.pseudo !== undefined) {
      io.emit('message', sendThis);

      console.log(JSON.stringify(sendThis, null, 4));
    } else {
      console.log("hmmm, no username");
      socket.emit('gah', err);
    }
  });
});
var jade = require('jade');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", {
  layout: false
});
app.use(express.static(__dirname + '/public/javascript'));
app.get('/', function(req, res) {
  res.render('home.jade');
});

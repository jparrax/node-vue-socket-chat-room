const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const PORT = 3000;
const socketio = require('socket.io');
const mongo = require('mongodb').MongoClient
const io = socketio(server);

app.use(express.static(__dirname + '/public/'));




io.on('connection', socket => {

  mongo.connect('mongodb://127.0.0.1/mongochat', function(err, db) {

    if(err){
      throw err;
    }

    console.log('Mongo connected...');

    console.log('New web socket created...');

    let chat = db.db('mongochat').collection('chats');

    findChats = function(){
      chat.find().sort({_id:1}).toArray(function(err, res){
        if(err){
          throw err;
        }

        socket.emit('messages', res);
      })
    }

    findChats();

    socket.on('input', function(data){
      let name = data.name;
      let message = data.message;

      // Check for name and message
      if(name == '' || message == ''){
        // Send error status
        console.log('Input no autorizado');
      }else {
        // Insert message
        chat.insert({name: name, message: message}, function(){
          findChats();
        });
      }
    });

  });

});


server.listen(PORT, () => console.log('Example app listening at http://localhost:' + PORT));
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const PORT = 3000;
const socketio = require('socket.io');
let url = 'mongodb://127.0.0.1/mongochat';
const mongo = require('mongodb').MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
const io = socketio(server);

function findChats(chat, socket){
  chat.find().sort({_id:1}).toArray(function(err, res){
    if(err){
      throw err;
    }
    socket.emit('messages', res);
    console.log('chats sent');
  })
}

app.use(express.static(__dirname + '/public/'));

mongo.connect(function(err, db) {

  if(err){
    throw err;
  }

  console.log('Mongo connected...');

  io.on('connection', socket => {

    console.log("Is the user connected?, " + socket.connected + ".")

    let chat = db.db('mongochat').collection('chats');

    findChats(chat, socket);

    socket.on('input', function(data){
      let name = data.name;
      let message = data.message;

      // Check for name and message
      if(name == '' || message == ''){
        // Send error status
        console.log('Not allowed input');
      }else {
        // Insert message
        chat.insertOne({name: name, message: message}, function(){
          console.log('Insert done');
          findChats(chat, io);
        });
      }
    })
    
    socket.on('disconnect', function(){
      console.log('disconnected');
    })
  });
});

server.listen(PORT, () => console.log('Example app listening at http://localhost:' + PORT));
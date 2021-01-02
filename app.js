const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const usericon = '<img style="height:40px; width: 30px;" src="https://www.flaticon.com/svg/static/icons/svg/3983/3983397.svg" />';
var boticon = '<img style="height:40px; width: 30px;" src="https://www.flaticon.com/svg/static/icons/svg/3983/3983130.svg" />';


app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '<img style="height:40px; width: 30px;" src="https://www.flaticon.com/svg/static/icons/svg/3983/3983397.svg" /> <i >' + socket.username + ' join the chat..</i>');
    });


    socket.on('bot', function(bot) {
        socket.bot = bot;
        io.emit('is_online', '<img style="height:40px; width: 30px;" src="https://www.flaticon.com/svg/static/icons/svg/3983/3983130.svg" /> <i >' + socket.bot + ' join the chat..</i><br/><hr>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + usericon + socket.username + '</strong>: ' + message);
       
        setTimeout(function() {
            Message(message);
        }, 1000);


       
        
    });

});
let port = process.env.PORT || 80;
const server = http.listen(port, function() {
    console.log('listening on *:80');
});




function Message(message){
    
    if(message === "hi"){
           
        io.emit('chat_message', '<strong style="color: blue;"> ' + boticon+   " Robot" + '</strong>: ' + "Hi, How are you");
    }
    else if(message ==="fine"){
        io.emit('chat_message', '<strong style="color: blue;">'  + boticon+  "Robot" + '</strong>: ' + "Good to Know, whats up ?");

    }
    else{
        io.emit('chat_message', '<strong style="color: red;">' +  boticon+ "Robot" + '</strong>: ' + "Please Feed me with the data  and follow me at   :  <a href='https://github.com/DaimDN'> Follow Now </a> "  );

    }
  
   
}

const express = require('express');
const messages = require('./utils/messageUtils');
const path = require('path');
const {
  JoinChat,
  getUser,
  LeaveChat,
  getRoom
} = require('./utils/usersUtils');

const app = express();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const defaultBotName = 'Chat Bot';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/content/index.html');
});

// Run when client start the connection
io.on('connection', socket => {
  socket.on('joinRoom', (chatUser, room) => {
    const user = JoinChat(socket.id, chatUser, room);
  
  socket.join(user.room);

  // Welcome message
  socket.emit('broadcastMessage', messages(defaultBotName, 'Welcome to Chat!'));

  // Alert when a user joins the chat
  socket.broadcast
    .to(user.room)
    .emit('broadcastMessage', messages(defaultBotName, `Someone new has joined the chat. Welcome to ${user.chatUser}!`));

  // Send users and room info
  io.to(user.room).emit('roomUsers', {
    room: user.room,
    users: getRoom(user.room)
  });
});

 // Listen for messages
 socket.on('messages', (text) => {
    const user = getUser(socket.id);
    io.emit('broadcastMessage', messages(user.chatUser, text));
  });
});
 
// Runs when client disconnects
socket.on('disconnect', () => {
  const user = LeaveChat(socket.id);

  if (user) {
    io.to(user.room).emit(
      'broadcastMessage',
      messages(defaultBotName, `${user.chatUser} has left the chat right now`)
    );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoom(user.room)
    });
  }
});


httpServer.listen(port, () => console.log(`Server running on port ${port}`));
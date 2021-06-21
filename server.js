const express = require('express');
const messages = require('./utils/messageUtils');
const path = require('path');

const app = express();

const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'content')));

io.on('connection', socket => {
  socket.on('mensagem', (text, userId) => {
    console.log({userId});
    io.emit('broadcastMessage', messages(userId, text));
  });

  socket.on('attachmentMessage', (base64Photo, text, userId) => {
    console.log({text});
    io.emit('broadcastMessage', messages(userId, text, base64Photo));
  });
});


httpServer.listen(port, () => console.log(`Server running on port ${port}`));
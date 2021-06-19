const express = require('express');
const messages = require('./utils/messageUtils');
const path = require('path');

const app = express();

const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/content/index.html');
});

io.on('connection', socket => {
  socket.on('mensagem', (text, userId) => {
    io.emit('broadcastMessage', messages(userId, text));
  });
});


httpServer.listen(port, () => console.log(`Server running on port ${port}`));
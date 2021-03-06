const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;

app.set('port', PORT);
app.use(cors())
app.get('/', (req, res) => {
    res.send('hola')
})
const server = app.listen(PORT, () => console.log('Servidor iniciado en el puerto %d', PORT));

const socketio = require('socket.io');
const io = socketio(server, {
    cors: {
        origins: ['*']
    }
});

const usuarios = []
    // SOCKETS
io.on('connection', (socket) => {
    usuarios.push(socket.id);
    console.log("---", socket)
    socket.on('mensaje', (data) => {
        socket.emit('recibido', 'te recibo')
    })
});

io.on('disconnected', (socket) => {
    io.sockets.disconnect();
    io.sockets.close();
})
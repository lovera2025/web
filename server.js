const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Define el puerto para el servidor
// Utiliza el puerto proporcionado por el entorno (Render) o el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Sirve archivos estáticos desde la carpeta actual (donde se encuentra index.html)
app.use(express.static(__dirname));

// Ruta principal para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Manejo de conexiones Socket.IO
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    // Manejar eventos de chat
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Emitir el mensaje a todos los clientes conectados
    });

    // Manejar desconexiones
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`Accede a la app en http://localhost:${PORT} (solo localmente)`);
});
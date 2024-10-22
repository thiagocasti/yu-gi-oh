const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:3000');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Un nuevo cliente se ha conectado.');

  socket.on('message', (message) => {
    console.log(`Mensaje recibido: ${message}`);
    // Envía el mensaje a todos los clientes conectados
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('Un cliente se ha desconectado.');
  });
});

console.log('Servidor WebSocket corriendo en ws://localhost:8080');

socket.onopen = function(event) {
    console.log('Conexión WebSocket abierta', event);
};

socket.onmessage = function(event) {
    console.log('Mensaje recibido:', event.data);
};

socket.onerror = function(error) {
    console.error('Error en WebSocket:', error);
};

socket.onclose = function(event) {
    console.log('Conexión WebSocket cerrada', event);
};

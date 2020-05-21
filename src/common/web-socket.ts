import { Server, WebSocket } from 'mock-socket';

const mockUrl = 'wss://fake-url.com';

export const server = new Server(mockUrl);
export const connection = new WebSocket(mockUrl);

server.on('connection', (socket) => {
  socket.on('message', (data) => {
    socket.send(data);
  });
});

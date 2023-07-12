import { vars } from 'config/vars';
import { io } from 'socket.io-client';

const socket = io(vars.SERVER_URL, {
  autoConnect: false,
  reconnection: true,
  transports: ['polling']
});

export default socket;

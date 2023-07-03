import { RemoteTrack } from 'livekit-client';
import { Socket } from 'socket.io-client';

export interface IParticipant {
  socket: Socket;
  audioTracks: RemoteTrack[];
  videoTracks: RemoteTrack[];
  identity: string;
};

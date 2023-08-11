import { RemoteTrack } from 'livekit-client';

export interface IParticipant {
  identity: string;
  name: string;
  audioTracks: RemoteTrack[];
  videoTracks: RemoteTrack[];
};

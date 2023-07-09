import { RemoteTrack } from 'livekit-client';

export interface IParticipant {
  identity: string;
  audioTracks: RemoteTrack[];
  videoTracks: RemoteTrack[];
};

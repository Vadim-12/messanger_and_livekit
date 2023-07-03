import { VideoRenderer, useParticipant } from '@livekit/react-core';
import { Participant } from 'livekit-client';
import React from 'react';

interface Props {
	participant: Participant;
}

const ParticipantView: React.FC<Props> = ({ participant }) => {
	const { isSpeaking, connectionQuality, isLocal, cameraPublication } = useParticipant(participant);

	if (!cameraPublication?.track) {
		return null;
	}

	if (cameraPublication?.isMuted ?? true) {
		return <></>;
	}

	if (!cameraPublication?.isSubscribed) {
		return null;
	}

	return (
		<VideoRenderer track={cameraPublication.track} isLocal={isLocal}/>
	);
};

export default ParticipantView;

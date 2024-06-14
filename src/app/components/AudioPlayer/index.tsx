'use client';
import React, { useRef } from 'react';
import { FaPlayCircle } from 'react-icons/fa';

type AudioPlayerProps = {
	url: string;
};

const AudioPlayer = ({ url }: AudioPlayerProps) => {
	const audioRef = useRef<HTMLAudioElement>(null);

	const playAudio = () => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	};

	return (
		<div>
			<audio ref={audioRef}>
				<source src={url} type="audio/ogg" />
				Your browser does not support the audio element.
			</audio>
			<div>
				<FaPlayCircle className="h-10 w-10" onClick={playAudio} />
			</div>
		</div>
	);
};

export default AudioPlayer;

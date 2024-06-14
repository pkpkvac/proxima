'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { typeColors } from '@/utils/colorMap';
import { PokemonProfile } from '@/app/types';
import AudioPlayer from '../../AudioPlayer';

type SelectedPokemonDetailsProps = {
	pokemon: PokemonProfile;
	onBack: () => void;
};

const SelectedPokemonDetails: React.FC<SelectedPokemonDetailsProps> = ({
	pokemon,
	onBack,
}) => {
	const [screenWidth, setScreenWidth] = useState<number>(0);

	useEffect(() => {
		const handleResize = () => setScreenWidth(window.innerWidth);
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const getSelectedPokemonSize = () => {
		if (screenWidth < 640) {
			return { height: 175, width: 175, imageSize: 150, marginTop: '-mt-5' };
		} else {
			return { height: 350, width: 350, imageSize: 300, marginTop: '-mt-10' };
		}
	};

	const { height, width, imageSize, marginTop } = getSelectedPokemonSize();

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
			className="flex flex-col items-center p-10"
		>
			<button onClick={onBack} className="text-white mb-4 text-2xl ">
				Back
			</button>
			<div
				className="flex flex-col items-center rounded-full p-8"
				style={{
					backgroundColor: typeColors[pokemon.types[0].type.name],
					height,
					width,
				}}
			>
				<Image
					src={pokemon.sprites.front_default}
					alt={pokemon.name}
					width={imageSize}
					height={imageSize}
					className="rounded-full"
				/>
				<div className={marginTop}>
					<AudioPlayer
						url={`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`}
					/>
				</div>
			</div>
			<h3 className="text-white text-2xl font-bold my-4 capitalize">
				{pokemon.name}
			</h3>
		</motion.div>
	);
};

export default SelectedPokemonDetails;

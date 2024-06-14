'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { PokemonProfile } from '../../types';
import { typeColors } from '@/utils/colorMap';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { motion } from 'framer-motion';
import AudioPlayer from '../AudioPlayer';

type ListAProps = {
	pokemonList: PokemonProfile[];
};

const ListA: React.FC<ListAProps> = ({ pokemonList }) => {
	const [selectedPokemon, setSelectedPokemon] = useState<PokemonProfile | null>(
		null,
	);
	const scrollRef = useRef<HTMLDivElement>(null);

	const handlePokemonClick = (pokemon: PokemonProfile) => {
		setSelectedPokemon(pokemon);
		const audio = new Audio(
			`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`,
		);
		audio.play();
	};

	const scrollUp = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ top: -500, behavior: 'smooth' });
		}
	};

	const scrollDown = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ top: 500, behavior: 'smooth' });
		}
	};

	return (
		<>
			<div className="flex flex-col items-center">
				<div className="text-white font-semibold text-4xl">Pokedex</div>
				<div>
					<Image
						className=""
						alt="logo"
						src={'/pokedex.png'}
						height={200}
						width={200}
					/>
				</div>
			</div>
			<div
				ref={scrollRef}
				className="relative w-full rounded-2xl border-[30px] border-red-400 bg-gradient-to-b from-[#128B87] to-[#4BE4DF] min-h-[900px] max-h-[900px] overflow-scroll mb-10"
			>
				{!selectedPokemon && (
					<div className="sticky top-0 z-20">
						<div
							style={{ background: '#128B87' }}
							className="flex items-center justify-center"
						>
							<div
								style={{
									background: '#8AFBE8',
								}}
								className="w-full h-[1px] mt-2"
							/>
							<MdOutlineArrowDropUp
								className="cursor-pointer z-30"
								color="#8AFBE8"
								size={50}
								onClick={scrollUp}
							/>
							<div
								style={{
									background: '#8AFBE8',
								}}
								className="w-full h-[1px] mt-2"
							/>
						</div>
					</div>
				)}

				{selectedPokemon ? (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
						className="flex flex-col items-center p-10"
					>
						<button
							onClick={() => setSelectedPokemon(null)}
							className="text-white mb-4 text-2xl "
						>
							Back
						</button>
						<div
							className="flex flex-col items-center rounded-full p-8"
							style={{
								backgroundColor: typeColors[selectedPokemon.types[0].type.name],
								height: 350,
								width: 350,
							}}
						>
							<Image
								src={selectedPokemon.sprites.front_default}
								alt={selectedPokemon.name}
								width={300}
								height={300}
								className="rounded-full"
							/>
							<div className="-mt-10">
								<AudioPlayer
									url={`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${selectedPokemon.id}.ogg`}
								/>
							</div>
						</div>
						<h3 className="text-white text-2xl font-bold my-4 capitalize">
							{selectedPokemon.name}
						</h3>
					</motion.div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
						{pokemonList.map((pokemon, index) => (
							<div
								key={pokemon.id}
								className="flex flex-col items-center cursor-pointer"
								onClick={() => handlePokemonClick(pokemon)}
							>
								<div
									className="z-0 relative rounded-full flex items-center justify-center border-2 border-transparent"
									style={{
										backgroundColor: typeColors[pokemon.types[0].type.name],
									}}
								>
									<Image
										src={pokemon.sprites.front_default}
										alt={pokemon.name}
										width={150}
										height={150}
									/>
									<Image
										src={`/icons/${pokemon.types[0].type.name.toLowerCase()}.svg`}
										alt={'type'}
										height={16}
										width={16}
										className="absolute top-[8%] right-[24%]"
									/>
								</div>
								<span className="mt-1 capitalize font-medium underline">
									01{index + 1}
								</span>
							</div>
						))}
					</div>
				)}

				{!selectedPokemon && (
					<div className="sticky bottom-0 z-20">
						<div
							style={{ background: '#128B87' }}
							className="flex items-center justify-center"
						>
							<div
								style={{
									background: '#8AFBE8',
								}}
								className="w-full h-[1px] -mt-1"
							/>
							<MdOutlineArrowDropDown
								className="cursor-pointer z-30"
								color="#8AFBE8"
								size={50}
								onClick={scrollDown}
							/>
							<div
								style={{
									background: '#8AFBE8',
								}}
								className="w-full h-[1px] -mt-1"
							/>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ListA;

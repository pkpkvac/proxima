'use client';
import React from 'react';
import Image from 'next/image';
import { typeColors } from '@/utils/colorMap';
import { PokemonProfile } from '@/app/types';
import AudioPlayer from '../../AudioPlayer';

type PokemonDetailsProps = {
	pokemon: PokemonProfile;
	loremTexts: string[];
	headerSize: number;
	paragraphSize: number;
	bgColor: string;
	fontColor: string;
	isShiny: boolean;
	isFront: boolean;
};

const PokemonDetails: React.FC<PokemonDetailsProps> = ({
	pokemon,
	loremTexts,
	headerSize,
	paragraphSize,
	bgColor,
	fontColor,
	isShiny,
	isFront,
}) => {
	const primaryType = pokemon.types[0].type.name;

	const sprite = isShiny
		? isFront
			? pokemon.sprites.front_shiny
			: pokemon.sprites.back_shiny
		: isFront
			? pokemon.sprites.front_default
			: pokemon.sprites.back_default;

	const typeIconSrc = `/icons/${primaryType.toLowerCase()}.svg`;

	return (
		<div className="flex justify-center w-full">
			<div
				style={{
					backgroundImage: `url('/background/${primaryType}.jpeg')`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
				className="border-8 rounded-md border-card max-w-[521px] w-auto shadow-lg py-5 h-min"
			>
				<div className="px-[40px]">
					<div className="flex justify-between items-center">
						<h3
							className="font-bold capitalize"
							style={{ fontSize: headerSize, color: fontColor }}
						>
							{pokemon.name}
						</h3>
						<div className="flex items-center">
							<span
								className="font-bold text-red-500"
								style={{ fontSize: headerSize, color: fontColor }}
							>
								100 HP
							</span>
							<span className="ml-2 text-sm font-bold">
								<div
									className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-black"
									style={{ backgroundColor: typeColors[primaryType] }}
								>
									<Image
										src={typeIconSrc}
										alt={primaryType}
										height={16}
										width={16}
									/>
								</div>
							</span>
						</div>
					</div>
					<div
						className="relative border-4 flex my-2"
						style={{
							justifyContent: 'center',
							borderImageSource:
								'linear-gradient(90deg, #D4AF37 0%, #F3D27D 30%, #D4AF37 60%, #F3D27D 90%, #D4AF37 100%)',
							borderImageSlice: 1,
							backgroundColor: bgColor,
						}}
					>
						{sprite && (
							<Image
								src={sprite}
								alt={pokemon.name}
								width={250}
								height={300}
								className="rounded-lg"
							/>
						)}
						<div className="absolute bottom-2 right-2 cursor-pointer">
							<AudioPlayer
								url={`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`}
							/>
						</div>
					</div>
					<div className="mt-2">
						<div
							className="flex justify-between capitalize px-5 bg-gold-gradient mx-5 py-1"
							style={{ fontSize: paragraphSize, color: fontColor }}
						>
							<span>{`${primaryType} Pokemon. Height: ${pokemon.height} feet, Weight: ${pokemon.weight} lbs.`}</span>
						</div>
						<h3
							className="font-bold"
							style={{ fontSize: headerSize, color: fontColor }}
						>
							Moves
						</h3>
						{pokemon.movesDetails.map((move, index) => (
							<div
								key={index}
								className="flex mb-4 justify-between items-center"
							>
								<div className="flex items-center">
									<div className="flex flex-col justify-center mr-4">
										{Array.from({ length: index + 1 }).map((_, i) => (
											<span
												key={i}
												className="h-6 w-6 rounded-full flex items-center justify-center border-2 border-black mb-1"
												style={{ backgroundColor: typeColors[primaryType] }}
											>
												<Image
													src={typeIconSrc}
													alt={primaryType}
													height={12}
													width={12}
												/>
											</span>
										))}
									</div>
									<div className="flex-1">
										<span
											className="font-semibold capitalize"
											style={{ fontSize: headerSize, color: fontColor }}
										>
											{move.name.split('-').join(' ') + ' '}
										</span>
										<span
											className="normal-case line-clamp-3"
											style={{ fontSize: paragraphSize, color: fontColor }}
										>
											{loremTexts[index]}
										</span>
									</div>
								</div>
								<div
									className="ml-2"
									style={{ fontSize: headerSize, color: fontColor }}
								>
									{move.power ?? 10}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokemonDetails;

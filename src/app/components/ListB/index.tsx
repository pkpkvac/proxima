'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PokemonProfile } from '../../types';
import { getRandomLorem } from '../../utils/randomLorem';
import AudioPlayer from '../AudioPlayer';
import { typeColors } from '@/utils/colorMap';
import Button from '../Button';
import { Poppins, Inter } from 'next/font/google';
import { cn } from '@/utils/classMerge';
import { SketchPicker, ColorResult } from 'react-color';

type ListBProps = {
	pokemon: PokemonProfile;
};

const inter = Inter({
	subsets: ['latin'],
	weight: ['400', '700'],
});

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '700'],
});

const ListB: React.FC<ListBProps> = ({ pokemon }) => {
	const [isShiny, setIsShiny] = useState(false);
	const [isFront, setIsFront] = useState(true);
	const [loremTexts, setLoremTexts] = useState<string[]>([]);
	const [fontFamily, setFontFamily] = useState<'Inter' | 'Poppins'>('Inter');
	const [headerSize, setHeaderSize] = useState(20);
	const [paragraphSize, setParagraphSize] = useState(16);
	const [bgColor, setBgColor] = useState('#FFFFFF');
	const [fontColor, setFontColor] = useState('#000000');
	const primaryType = pokemon.types[0].type.name;

	useEffect(() => {
		const texts = pokemon.movesDetails.map(() => getRandomLorem(10, 40));
		setLoremTexts(texts);
	}, [pokemon.movesDetails]);

	const toggleShiny = () => setIsShiny(!isShiny);
	const toggleFrontBack = () => setIsFront(!isFront);
	const toggleFont = () =>
		setFontFamily((prev) => (prev === 'Inter' ? 'Poppins' : 'Inter'));

	const increaseHeaderSize = () => setHeaderSize(headerSize + 2);
	const decreaseHeaderSize = () => setHeaderSize(headerSize - 2);

	const increaseParagraphSize = () => setParagraphSize(paragraphSize + 2);
	const decreaseParagraphSize = () => setParagraphSize(paragraphSize - 2);

	const handleBgColorChange = (color: ColorResult) => {
		setBgColor(color.hex);
	};

	const handleFontColorChange = (color: ColorResult) => {
		setFontColor(color.hex);
	};

	const sprite = isShiny
		? isFront
			? pokemon.sprites.front_shiny
			: pokemon.sprites.back_shiny
		: isFront
			? pokemon.sprites.front_default
			: pokemon.sprites.back_default;

	const typeIconSrc = `/icons/${primaryType.toLowerCase()}.svg`;

	const fontClass =
		fontFamily === 'Inter' ? inter.className : poppins.className;

	return (
		<div className={cn('flex flex-col md:flex-row', fontClass)}>
			<div className="flex justify-center w-full ">
				<div
					style={{
						backgroundImage: `url('/background/${primaryType}.jpeg')`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
					className="border-8 rounded-md border-card w-[521px] shadow-lg py-5 h-min"
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
						<div
							className="flex justify-between capitalize px-5 bg-gold-gradient mx-5 py-1"
							style={{ fontSize: paragraphSize, color: fontColor }}
						>
							<span>{`${primaryType} Pokemon. Height: ${pokemon.height} feet, Weight: ${pokemon.weight} lbs.`}</span>
						</div>
						<div className="mt-4">
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
			<div className="flex flex-col ml-4 gap-4 w-full md:w-1/2">
				{pokemon.sprites.back_default && (
					<Button
						onClick={toggleFrontBack}
						className="px-7 py-3 w-full bg-gold-gradient font-bold text-black rounded"
					>
						{isFront ? 'Show Back' : 'Show Front'}
					</Button>
				)}
				{pokemon.sprites.front_shiny && (
					<Button
						onClick={toggleShiny}
						className="px-7 py-3 w-full bg-gold-gradient font-bold text-black rounded"
					>
						{isShiny ? 'Show Normal' : 'Show Shiny'}
					</Button>
				)}
				<Button
					onClick={toggleFont}
					className="px-7 py-3 w-full bg-gold-gradient font-bold text-black rounded"
				>
					{fontFamily === 'Inter' ? 'Switch to Poppins' : 'Switch to Inter'}
				</Button>

				<div className="flex items-center gap-2">
					<span className="text-white font-bold">
						Header size: {headerSize}px
					</span>
					<Button
						onClick={increaseHeaderSize}
						className="px-3 py-1 bg-gold-gradient font-bold text-black rounded"
					>
						↑
					</Button>
					<Button
						onClick={decreaseHeaderSize}
						className="px-3 py-1 bg-gold-gradient font-bold text-black rounded"
					>
						↓
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-white font-bold">
						Paragraph size: {paragraphSize}px
					</span>
					<Button
						onClick={increaseParagraphSize}
						className="px-3 py-1 bg-gold-gradient font-bold text-black rounded"
					>
						↑
					</Button>
					<Button
						onClick={decreaseParagraphSize}
						className="px-3 py-1 bg-gold-gradient font-bold text-black rounded"
					>
						↓
					</Button>
				</div>

				<div className="mt-4 w-full">
					<h3 className="text-white font-bold mb-2">Background Color</h3>
					<SketchPicker
						width="300px"
						color={bgColor}
						onChangeComplete={handleBgColorChange}
					/>
				</div>
				<div className="mt-4 w-full">
					<h3 className="text-white font-bold mb-2">Font Color</h3>
					<SketchPicker
						width="300px"
						color={fontColor}
						onChangeComplete={handleFontColorChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default ListB;

'use client';
import React, { useEffect, useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import Button from '../../Button';
import { PokemonProfile } from '@/app/types';

type ListBControllerProps = {
	isFront: boolean;
	isShiny: boolean;
	fontFamily: 'Inter' | 'Poppins';
	headerSize: number;
	paragraphSize: number;
	bgColor: string;
	fontColor: string;
	toggleFrontBack: () => void;
	toggleShiny: () => void;
	toggleFont: () => void;
	increaseHeaderSize: () => void;
	decreaseHeaderSize: () => void;
	increaseParagraphSize: () => void;
	decreaseParagraphSize: () => void;
	handleBgColorChange: (color: ColorResult) => void;
	handleFontColorChange: (color: ColorResult) => void;
	pokemon: PokemonProfile;
};

const ListBController: React.FC<ListBControllerProps> = ({
	isFront,
	isShiny,
	fontFamily,
	headerSize,
	paragraphSize,
	bgColor,
	fontColor,
	toggleFrontBack,
	toggleShiny,
	toggleFont,
	increaseHeaderSize,
	decreaseHeaderSize,
	increaseParagraphSize,
	decreaseParagraphSize,
	handleBgColorChange,
	handleFontColorChange,
	pokemon,
}) => {
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.matchMedia('(max-width: 639px)').matches);
		};

		handleResize(); // Set the initial value
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const headerSizeLimits = {
		min: isSmallScreen ? 10 : 14,
		max: isSmallScreen ? 20 : 30,
	};

	const paragraphSizeLimits = {
		min: isSmallScreen ? 8 : 12,
		max: isSmallScreen ? 18 : 24,
	};

	return (
		<div className="flex flex-col gap-4 w-full">
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
					className={`px-3 py-1 bg-gold-gradient font-bold text-black rounded ${headerSize >= headerSizeLimits.max ? 'opacity-50 cursor-not-allowed' : ''}`}
					disabled={headerSize >= headerSizeLimits.max}
				>
					↑
				</Button>
				<Button
					onClick={decreaseHeaderSize}
					className={`px-3 py-1 bg-gold-gradient font-bold text-black rounded ${headerSize <= headerSizeLimits.min ? 'opacity-50 cursor-not-allowed' : ''}`}
					disabled={headerSize <= headerSizeLimits.min}
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
					className={`px-3 py-1 bg-gold-gradient font-bold text-black rounded ${paragraphSize >= paragraphSizeLimits.max ? 'opacity-50 cursor-not-allowed' : ''}`}
					disabled={paragraphSize >= paragraphSizeLimits.max}
				>
					↑
				</Button>
				<Button
					onClick={decreaseParagraphSize}
					className={`px-3 py-1 bg-gold-gradient font-bold text-black rounded ${paragraphSize <= paragraphSizeLimits.min ? 'opacity-50 cursor-not-allowed' : ''}`}
					disabled={paragraphSize <= paragraphSizeLimits.min}
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
	);
};

export default ListBController;

'use client';
import React, { useState, useEffect } from 'react';
import { PokemonProfile } from '../../types';
import { getRandomLorem } from '../../utils/randomLorem';
import { ColorResult } from 'react-color';
import { Poppins, Inter } from 'next/font/google';
import { cn } from '@/utils/classMerge';
import PokemonDetails from './PokemonDetails';
import ListBController from './ListController/ListBController';

const inter = Inter({
	subsets: ['latin'],
	weight: ['400', '700'],
});

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '700'],
});

type ListBProps = {
	pokemon: PokemonProfile;
};

const ListB: React.FC<ListBProps> = ({ pokemon }) => {
	const [isShiny, setIsShiny] = useState(false);
	const [isFront, setIsFront] = useState(true);
	const [loremTexts, setLoremTexts] = useState<string[]>([]);
	const [fontFamily, setFontFamily] = useState<'Inter' | 'Poppins'>('Inter');
	const [headerSize, setHeaderSize] = useState(20);
	const [paragraphSize, setParagraphSize] = useState(16);
	const [bgColor, setBgColor] = useState('#FFFFFF');
	const [fontColor, setFontColor] = useState('#000000');

	const setDefaultsForBreakpoint = (width: number) => {
		if (width < 640) {
			setHeaderSize(16);
			setParagraphSize(14);
		} else if (width >= 640 && width < 1024) {
			setHeaderSize(20);
			setParagraphSize(16);
		} else {
			setHeaderSize(20);
			setParagraphSize(16);
		}
	};

	useEffect(() => {
		const texts = pokemon.movesDetails.map(() => getRandomLorem(10, 40));
		setLoremTexts(texts);

		const updateSizes = () => {
			setDefaultsForBreakpoint(window.innerWidth);
		};

		updateSizes();

		window.addEventListener('resize', updateSizes);
		return () => {
			window.removeEventListener('resize', updateSizes);
		};
	}, [pokemon.movesDetails]);

	const toggleShiny = () => setIsShiny(!isShiny);
	const toggleFrontBack = () => setIsFront(!isFront);
	const toggleFont = () =>
		setFontFamily((prev) => (prev === 'Inter' ? 'Poppins' : 'Inter'));

	const increaseHeaderSize = () =>
		setHeaderSize((size) => Math.min(size + 2, 44));
	const decreaseHeaderSize = () =>
		setHeaderSize((size) => Math.max(size - 2, 10));

	const increaseParagraphSize = () =>
		setParagraphSize((size) => Math.min(size + 2, 28));
	const decreaseParagraphSize = () =>
		setParagraphSize((size) => Math.max(size - 2, 8));

	const handleBgColorChange = (color: ColorResult) => {
		setBgColor(color.hex);
	};

	const handleFontColorChange = (color: ColorResult) => {
		setFontColor(color.hex);
	};

	const fontClass =
		fontFamily === 'Inter' ? inter.className : poppins.className;

	return (
		<div className={cn('flex flex-col lg:flex-row gap-4', fontClass)}>
			<PokemonDetails
				pokemon={pokemon}
				loremTexts={loremTexts}
				headerSize={headerSize}
				paragraphSize={paragraphSize}
				bgColor={bgColor}
				fontColor={fontColor}
				isShiny={isShiny}
				isFront={isFront}
			/>
			<ListBController
				isFront={isFront}
				isShiny={isShiny}
				fontFamily={fontFamily}
				headerSize={headerSize}
				paragraphSize={paragraphSize}
				bgColor={bgColor}
				fontColor={fontColor}
				toggleFrontBack={toggleFrontBack}
				toggleShiny={toggleShiny}
				toggleFont={toggleFont}
				increaseHeaderSize={increaseHeaderSize}
				decreaseHeaderSize={decreaseHeaderSize}
				increaseParagraphSize={increaseParagraphSize}
				decreaseParagraphSize={decreaseParagraphSize}
				handleBgColorChange={handleBgColorChange}
				handleFontColorChange={handleFontColorChange}
				pokemon={pokemon}
			/>
		</div>
	);
};

export default ListB;

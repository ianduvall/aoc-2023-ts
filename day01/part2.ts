import { readFileSync } from "fs";

const input = readFileSync("./day01/input.txt", "utf8");

const lines = input.split("\n");

type DigitChar = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
const isDigitChar = (digit: number): digit is DigitChar => {
	return (
		digit === 1 ||
		digit === 2 ||
		digit === 3 ||
		digit === 4 ||
		digit === 5 ||
		digit === 6 ||
		digit === 7 ||
		digit === 8 ||
		digit === 9
	);
};

const wordDigitMap = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
} as const;
const parseWordDigit = (substr: string): DigitChar | undefined => {
	for (const [wordDigit, digit] of Object.entries(wordDigitMap)) {
		if (substr.startsWith(wordDigit)) {
			return digit;
		}
	}
};

const longestWordDigitLength = Object.keys(wordDigitMap).reduce(
	(longest, wordDigit) => {
		return Math.max(longest, wordDigit.length);
	},
	0,
);

let total = 0;

for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
	const line = lines[lineIndex];
	let firstDigit = 0;
	let lastDigit = 0;
	const setLastDigit = (digit: DigitChar) => {
		if (firstDigit === 0) {
			firstDigit = digit;
		}
		lastDigit = digit;
	};

	for (let i = 0; i < line.length; i++) {
		const char = line[i];
		const digitInt = parseInt(char, 10);
		if (isDigitChar(digitInt)) {
			setLastDigit(digitInt);
			continue;
		}

		const substr = line.slice(i, i + longestWordDigitLength);
		const digit = parseWordDigit(substr);
		if (digit) {
			setLastDigit(digit);
			continue;
		}
	}

	const number = parseInt(`${firstDigit}${lastDigit}`, 10);

	total += number;
}

console.log("Part 2: ", total);

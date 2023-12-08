import { readFileSync } from "fs";

const input = readFileSync("./day03/input.txt", "utf8");

const lines = input.split("\n");

const grid = lines.map((line) => line.split(""));

const isDigit = (char: string) => {
	const int = Number(char);
	return 0 <= int && int <= 9;
};
const isSymbol = (char: string) => {
	return !isDigit(char) && char !== ".";
};
const directions = [
	// top left
	[-1, -1],
	// top
	[0, -1],
	// top right
	[1, -1],
	// left
	[-1, 0],
	// right
	[1, 0],
	// bottom left
	[-1, 1],
	// bottom
	[0, 1],
	// bottom right
	[1, 1],
];
const isTouchingSymbol = (rowIndex: number, colIndex: number): boolean => {
	for (const [rowOffset, colOffset] of directions) {
		const adjacentChar = grid[rowIndex + rowOffset]?.[colIndex + colOffset];
		if (adjacentChar === undefined) {
			continue;
		} else if (isSymbol(adjacentChar)) {
			return true;
		}
	}
	return false;
};

let total = 0;
const initialPartNumber = { partString: "", isTouchingSymbol: false };
let partNumber = { ...initialPartNumber };

let i = 0;
const handlePartNumber = () => {
	i++;

	if (partNumber.partString && partNumber.isTouchingSymbol) {
		console.log("Part number touching symbol: ", partNumber.partString);
		total += Number(partNumber.partString);
	} else if (partNumber.partString) {
		console.log("Part number not touching symbol: ", partNumber.partString);
	}
	partNumber = { ...initialPartNumber };
};

grid.forEach((row, rowIndex) => {
	row.forEach((char, colIndex) => {
		if (isDigit(char)) {
			partNumber.partString = `${partNumber.partString}${char}`;

			if (!partNumber.isTouchingSymbol) {
				partNumber.isTouchingSymbol = isTouchingSymbol(rowIndex, colIndex);
			}
		} else {
			handlePartNumber();
		}
	});
	handlePartNumber();
});
handlePartNumber();

console.log("Part 1: ", total);

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

let total = 0;
interface Part {
	partString: string;
}
const initialPartNumber = { partString: "" };
let part = { ...initialPartNumber };

const gears = new Map<`${number},${number}`, Part[]>();

const handlePartNumber = () => {
	part = { ...initialPartNumber };
};

const checkForAdjacentGears = (rowIndex: number, colIndex: number) => {
	const adjacentGears = [];

	for (const [rowOffset, colOffset] of directions) {
		const adjacentRowIndex = rowIndex + rowOffset;
		const adjacentColIndex = colIndex + colOffset;
		const adjacentChar = grid[adjacentRowIndex]?.[adjacentColIndex];
		if (adjacentChar === "*") {
			adjacentGears.push([adjacentRowIndex, adjacentColIndex] as const);
		}
	}

	return adjacentGears;
};

grid.forEach((row, rowIndex) => {
	row.forEach((char, colIndex) => {
		if (isDigit(char)) {
			part.partString = `${part.partString}${char}`;

			checkForAdjacentGears(rowIndex, colIndex).forEach(
				([adjacentRowIndex, adjacentColIndex]) => {
					const adjacentParts = gears.get(
						`${adjacentRowIndex},${adjacentColIndex}`,
					);
					if (adjacentParts) {
						if (!adjacentParts.includes(part)) {
							adjacentParts.push(part);
						}
					} else {
						gears.set(`${adjacentRowIndex},${adjacentColIndex}`, [part]);
					}
				},
			);
		} else {
			handlePartNumber();
		}
	});
	handlePartNumber();
});
handlePartNumber();

for (const [location, parts] of gears.entries()) {
	console.log();
	if (parts.length === 2) {
		console.log(
			"gear at ",
			location,
			" has two parts: ",
			parts.map((p) => p.partString),
		);
		const [part1, part2] = parts;
		total += Number(part1.partString) * Number(part2.partString);
	}
}

console.log("Part 2: ", total);

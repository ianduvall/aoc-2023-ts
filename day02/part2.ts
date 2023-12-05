import { readFileSync } from "fs";

const input = readFileSync("./day02/input.txt", "utf8");

const lines = input.split("\n");

type Draw = typeof drawInitial;
type Color = keyof Draw;
const drawInitial = {
	blue: 0,
	green: 0,
	red: 0,
};
const isColor = (color: string): color is Color => {
	return color in drawInitial;
};

const cubeCounts = {
	blue: 14,
	green: 13,
	red: 12,
} as const;

const parseGame = (line: string) => {
	const [left, right] = line.split(": ");

	const gameId = parseInt(left.split(" ")[1], 10);
	const draws = right.split("; ").map((drawString) => {
		const draw = {
			...drawInitial,
		};
		drawString.split(", ").forEach((drawPart) => {
			const [count, color] = drawPart.split(" ");
			if (!isColor(color)) {
				throw new Error(`Invalid color: ${color}`);
			}
			draw[color] = parseInt(count, 10);
		});

		return draw;
	});

	return {
		gameId,
		draws,
	} as const;
};

let total = 0;

lines.forEach((line) => {
	const { gameId, draws } = parseGame(line);

	const game = {
		...drawInitial,
	};

	for (const draw of draws) {
		for (const color of Object.keys(cubeCounts) as Color[]) {
			game[color] = Math.max(game[color], draw[color]);
		}
	}

	const power = Object.values(game).reduce((acc, val) => acc * val, 1);
	total += power;
});

console.log("Part 2: ", total);

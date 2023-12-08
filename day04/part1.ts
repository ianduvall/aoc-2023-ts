import { readFileSync } from "fs";

const input = readFileSync("./day04/input.txt", "utf8");

const lines = input.split("\n");

let total = 0;

const parseCard = (line: string) => {
	const [winningNumbers, numbers] = line
		.split(": ")[1]
		.split(" | ")
		.map((str) =>
			str
				.split(" ")
				.filter(Boolean)
				.map((number) => Number(number.trim())),
		);

	const card = {
		winningNumbers,
		numbers,
	} as const;

	return card;
};

for (const line of lines) {
	const { winningNumbers, numbers } = parseCard(line);
	const numbersSet = new Set(numbers);

	let cardTotal = 0;
	for (const winningNumber of winningNumbers) {
		if (numbersSet.has(winningNumber)) {
			if (cardTotal === 0) {
				cardTotal = 1;
			} else {
				cardTotal *= 2;
			}
		}
	}
	total += cardTotal;
}

console.log("Part 1: ", total);

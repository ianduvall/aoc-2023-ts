import { readFileSync } from "fs";

const input = readFileSync("./day04/input.txt", "utf8");

const lines = input.split("\n");

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

const cards = lines.map(parseCard);

const cardCounts = new Map<number, number>(
	cards.map((card, index) => [index, 1]),
);

cards.forEach((card, index) => {
	const { winningNumbers, numbers } = card;
	const numbersSet = new Set(numbers);

	let matchingNumbers = 0;
	for (const winningNumber of winningNumbers) {
		if (numbersSet.has(winningNumber)) {
			matchingNumbers++;
		}
	}

	let cardCount = cardCounts.get(index) ?? 0;

	while (cardCount > 0) {
		cardCount--;

		for (let i = 1; i <= matchingNumbers; i++) {
			const copyIndex = index + i;
			if (copyIndex >= cards.length) {
				break;
			}

			const currentCardCount = cardCounts.get(copyIndex) ?? 0;
			cardCounts.set(copyIndex, currentCardCount + 1);
		}
	}
});

let total = 0;
for (const count of cardCounts.values()) {
	total += count;
}

console.log("Part 2: ", total);

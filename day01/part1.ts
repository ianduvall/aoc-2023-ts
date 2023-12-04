import { readFileSync } from "fs";

const input = readFileSync("./day01/input.txt", "utf8");

const lines = input.split("\n");

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
const isDigit = (char: string): char is Digit => {
	return (
		char === "0" ||
		char === "1" ||
		char === "2" ||
		char === "3" ||
		char === "4" ||
		char === "5" ||
		char === "6" ||
		char === "7" ||
		char === "8" ||
		char === "9"
	);
};

let total = 0;

for (const line of lines) {
	const chars = line.split("");

	const firstDigit = chars.find((char) => isDigit(char));
	const lastDigit = chars.findLast((char) => isDigit(char));
	const number = Number(`${firstDigit}${lastDigit}`);
	total += number;
}

console.log("Part 1: ", total);

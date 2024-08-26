import { resolve } from "node:path";

export const getFuncsPath = () => {
	const commands = process.argv.slice(2);

	const existsFuncsPaths =
		commands.includes("--funcs") || commands.includes("-fs");

	if (!existsFuncsPaths) {
		return resolve("supabase", "functions");
	}

	const index = commands.findIndex((item) => ["--funcs", "-fs"].includes(item));

	return resolve(commands[index + 1]);
};

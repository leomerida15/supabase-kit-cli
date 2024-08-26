import { readdirSync } from "node:fs";
import { join } from "node:path";

export const getEdges = (funcsPath) => {
	const directorys = readdirSync(funcsPath, { withFileTypes: true })
		.filter((archivo) => archivo.isDirectory())
		.map((archivo) => join(funcsPath, archivo.name));

	return directorys;
};

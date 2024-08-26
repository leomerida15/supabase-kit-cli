#!/usr/bin/env node

import { copyFile, existsSync, mkdirSync, readdirSync, stat } from "node:fs";
import { join, resolve } from "node:path";
import { getEdges } from "./getEdges.js";
import { getFuncsPath } from "./getFuncsPath.js";

function copyDirRecursive(src, dest) {
	mkdirSync(dest, { recursive: true }); // Crea el directorio de destino si no existe

	readdirSync(src).map((file) => {
		const srcPath = `${src}/${file}`;
		const destPath = `${dest}/${file}`;

		stat(srcPath, (err, stats) => {
			if (err) throw err;
			if (stats.isDirectory()) {
				copyDirRecursive(srcPath, destPath); // Llama a la función recursivamente para subdirectorios
			} else {
				copyFile(srcPath, destPath, (err) => {
					if (err) throw err;
				});
			}
		});
	});
}

export const cpCommon = () => {
	const funcsPath = getFuncsPath();

	const edgesPaths = getEdges(funcsPath).splice(1);

	const commondPath = resolve(funcsPath, "common");

	const existsCommondPath = existsSync(commondPath);

	if (!existsCommondPath) return console.log("No common folder found");

	edgesPaths.map((funcsPath, i) => {
		const commonPathInfunc = join(funcsPath, "common");

		copyDirRecursive(commondPath, commonPathInfunc);
	});
};

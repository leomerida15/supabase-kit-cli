#!/usr/bin/env node
import nodemon from "nodemon";
import { join, resolve } from "node:path";
import { cpCommon } from "./cpCommon.js";
import cli from "./cli.js";

const { input, showHelp } = cli;

/**
 * Do something!
 */
export async function CommonFuncs() {
	input.includes("help") && showHelp(0);

	if (input.includes("copy")) return cpCommon();

	if (input.includes("serve"))
		return nodemon({
			watch: [`${resolve("supabase", "functions", "common")}/**/*.ts`],
			script: join(
				"node_modules",
				"@supabase-kit",
				"cli",
				"src",
				"commands",
				"funcs",
				"common",
				"onCpCommon.js",
			),
			ext: "ts,js", // Especificar extensiones a monitorear
			verbose: true,
			delay: 200, // Pequeño retraso para evitar reinicios excesivos
			env: {
				NODE_ENV: "development",
			},
		})
			.on("restart", () => {
				console.log("common copy!");
			})
			.on("crash", () => {
				console.error("common copy crashed!");
			})
			.on("exit", () => {
				console.log("common exited!");
			});
}

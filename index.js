#!/usr/bin/env node

/**
 * cli
 * Helpers by edge functions.
 *
 * @author Dimas Leopoldo Mérida Flores - gh: leomerida15 <https://github.com/leomerida15>
 */

import cli, { CommandsGlobal } from "./src/cli.js";
import { commands } from "./src/commands/index.js";
import init from "./src/init.js";
import log from "./src/log.js";

const { flags, input, showHelp } = cli;
const { clear, debug } = flags;

(async () => {
	await init({ clear });
	debug && log(flags);

	const existingCommand = CommandsGlobal.find((command) =>
		input.includes(command),
	);

	if (input.includes("help") && !existingCommand) showHelp(0);

	commands(input);
})();

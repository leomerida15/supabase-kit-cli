#!/usr/bin/env node

import meowHelp from "cli-meow-help";
import meow from "meow";

const flags = {
	clear: {
		type: "boolean",
		default: false,
		shortFlag: "c",
		desc: "Clear the console",
	},
	debug: {
		type: "boolean",
		default: false,
		shortFlag: "d",
		desc: "Print debug info",
	},
};

const commands = {
	help: { desc: "Print help info" },
	funcs: {
		desc: "Helpers by edge functions.",
	},
};

export const CommandsGlobal = Object.keys(commands).filter(
	(key) => !["help"].includes(key),
);

const helpText = meowHelp({
	name: "supa",
	flags,
	commands,
});

const options = {
	importMeta: import.meta,
	description: false,
	hardRejection: false,
	flags,
};

export default meow(helpText, options);

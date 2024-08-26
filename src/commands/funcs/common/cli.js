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
	copy: {
		desc: "Helpers by edge functions.",
	},
	serve: {
		desc: "start dev serbe listen 'supabase/funcstions/common' folder implement command 'copy' by change",
	},
};

const helpText = meowHelp({
	name: "supa funcs",
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

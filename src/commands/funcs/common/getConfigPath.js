import { join, resolve } from 'node:path';

export const getConfigPath = () => {
	const commands = process.argv.slice(2);
	const existsPath = commands.includes('--config') || commands.includes('-c');

	if (!existsPath) {
		return join(__dirname, 'nodemon.json');
	}

	const index = commands.findIndex((item) =>
		['--config', '-f'].includes(item)
	);

	const configPath = resolve(commands[index + 1]);

	return configPath;
};

import { Command } from "commander";
import { getPackageJson } from "./common";
import { InitCommand } from "./commands/init";
import { MigrateCommand } from "./commands";

const pkgJson = getPackageJson("./../package.json");

const program = new Command();

program.name(pkgJson.name).description("CLI to use @supabase-kit").version(pkgJson.version);

InitCommand(program);

MigrateCommand(program);

program.parse();

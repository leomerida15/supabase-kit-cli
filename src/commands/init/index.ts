import { resolve } from "node:path";
import { Command } from "commander";
import { exec } from "shelljs";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { getPackageJson } from "../../common";
import { getPkm } from "../funcs/getPkm";
import { setToml } from "../funcs/setToml";
import { execSync } from "../funcs/execSync";

export const InitCommand = (program: Command) => {
    program
        .command("init")
        .description("Init proyect")
        .option("-n, --name <char>", "name project", "supa")
        .option(
            "-pf --port_family  <numbers>",
            "port family by docker container for local dev",
            "5432",
        )
        .action(async (str, options) => {
            const pkm = getPkm();

            await execSync(`${pkm.i} supabase -D`);

            await execSync(`${pkm.pk} supabase init`);

            setToml(str.name, str.port_family);

            await execSync(`${pkm.i} prisma @supabase/supabase-js`);

            // await execSync("cd supabase/schemas/helpers -- mkdir auth public helpers");

            // await execSync("cd supabase/schemas/helpers -- mkdir auth public helpers");
        });
};

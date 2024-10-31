import { resolve } from "node:path";
import { Command } from "commander";
import { exec } from "shelljs";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { getPackageJson } from "../../common";
import { getPkm } from "../funcs/getPkm";
import { execSync } from "../funcs/execSync";
import { getTemp } from "../funcs";

export const MigrateCommand = (program: Command) => {
    const migrate = program.command("migrate").description("manager migrastions and db flow");

    migrate
        .command("init")
        .description("init migrations flow")
        .action(async () => {
            const pkm = getPkm();

            await execSync(`${pkm.i} prisma-import -D`);

            const pkJson = getPackageJson();

            if (pkm.file !== "bun") await execSync(`${pkm.i} ts-node -D`);

            pkJson.prisma = {
                seed: pkm.seed,
                import: {
                    schemas: "supabase/schemas/**/*.prisma",
                },
                schema: "supabase/schema.prisma",
            };

            unlinkSync(resolve("package.json"));

            writeFileSync(JSON.stringify(pkJson), resolve("package.json"));

            exec("cd supabase -- mkdir migrations");

            exec("cd supabase/migrations -- mkdir 0_init");

            writeFileSync(
                getTemp().migrate_0_init,
                resolve("supabase", "migrations", "0_init", "migration.sql"),
            );

            exec("cd supabase -- mkdir schemas");
            exec("cd supabase/schemas -- mkdir auth public helpers");

            writeFileSync(
                getTemp().auth_schema,
                resolve("supabase", "schemas", "auth", "auth.prisma"),
            );

            writeFileSync(
                getTemp().connect_helper_schema,
                resolve("supabase", "schemas", "helpers", "connections.prisma"),
            );
        });
};

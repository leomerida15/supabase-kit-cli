import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export const setToml = (name: string, port: string) => {
    const basePath = resolve("supabase", "config.toml");
    let config = readFileSync(basePath).toString();
    const regex = /^\d+$/;

    config = config.replaceAll("5432", port);

    config = config.replace('project_id = "cli"', `project_id = "${name}"`);

    writeFileSync(basePath, config);
};

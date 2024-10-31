import { exec } from "shelljs";

export const execSync = (cmd: string) => {
    return new Promise((resolve) => exec(cmd, { async: true }, resolve));
};

import { Command } from 'commander';
import { getPkm } from '../funcs/getPkm';
import { setToml } from '../funcs/setToml';
import { exec, execSync } from 'node:child_process';

export const InitCommand = (program: Command) => {
    program
        .command('init')
        .description('Init project')
        .option('-n, --name <char>', 'name project', 'supa')
        .option(
            '-pf --port_family <numbers>',
            'port family by docker container for local dev',
            '5432',
        )
        .action(async (str) => {
            try {
                const pkm = getPkm();

                exec(`${pkm.i} prisma-import supabase -D`);
                exec(`${pkm.i} prisma @supabase/supabase-js`);

                // Ejecuta 'supabase init' de manera sincrónica
                execSync(`${pkm.run} supabase init`, { stdio: 'pipe' });

                // Configura el archivo toml
                setToml(str.name, str.port_family);
            } catch (errorr) {
                const err = errorr as Error;

                console.error('Error al ejecutar supabase init:', err.message);
            }
        });
};

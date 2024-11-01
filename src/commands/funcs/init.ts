import { resolve } from 'node:path';
import { Command } from 'commander';
import { exec } from 'shelljs';
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';

const execSync = (cmd: string) => {
    return new Promise((resolve) => exec(cmd, { async: true }, resolve));
};

const getPkm = () => {
    const pkms = {
        npm: { pk: 'npm', i: 'npm i', file: 'package-lock.json' },
        bun: { pk: 'bun', i: 'bun add', file: 'bun.lockb' },
        yarn: { pk: 'yarn', i: 'yarn add', file: 'yarn.lock' },
        pnpm: { pk: 'pnpm', i: 'pnpm add', file: 'pnpm-lock.yaml' },
    };

    const pkmSeartch = Object.values(pkms).find((p) => {
        const basePath = resolve(p.file);

        return existsSync(basePath);
    });

    const pkm = (pkmSeartch?.pk || 'npm') as keyof typeof pkms;

    return pkms[pkm];
};

export const InitCommand = (program: Command) => {
    program
        .command('init')
        .description('Init proyect')
        .action(async () => {
            const pkm = getPkm();

            await execSync('bun supabase functions new example');
            await execSync('cd supabase/functions -- exit && deno init');
            unlinkSync(resolve('supabase', 'functions', 'main.ts'));
            await execSync(
                'cd supabase/functions -- exit && deno add npm:@rocket-kit/edge jsr:@supabase/functions-js',
            );
            writeFileSync(
                resolve('supabase', 'functions', 'example', 'index.ts'),
                readFileSync(resolve('src', 'commands', 'funcs', 'example.txt')).toString(),
            );

            await execSync(`${pkm.i} @rocket-kit/edge prisma @supabase/supabase-js`);

            await execSync(`${pkm.i} prisma-import -D`);
        });
};

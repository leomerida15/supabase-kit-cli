import { readFileSync } from 'node:fs';
import {} from 'node:path';

export const getTemp = () => {
    const migrate_0_init = readFileSync('./migrate_0_init.txt').toString();
    const auth_schema = readFileSync('./auth_schema.txt').toString();
    const connect_helper_schema = readFileSync('./connect_helper_schema.txt').toString();

    return { migrate_0_init, auth_schema, connect_helper_schema };
};

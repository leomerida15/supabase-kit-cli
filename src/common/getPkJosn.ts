/**
 * Get Package.json file.
 *
 * Read a package json file
 *
 * @author Awais <https://twitter.com/MrAhmadAwais/>
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export function getPackageJson(customPath = './package.json') {
    const err = new Error().stack as string;

    // Get the caller's file path
    const callerFile = ((err.split('\n')[2] ?? '').match(/\((.*):\d+:\d+\)/) ?? '')[1];

    // Convert file URL to path if necessary
    const callerPath = callerFile.startsWith('file:') ? fileURLToPath(callerFile) : callerFile;

    const callerDir = dirname(callerPath);

    const packagePath = join(callerDir, customPath);
    try {
        const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
        return packageJson;
    } catch (error) {
        console.error(`Error reading package.json from ${packagePath}:`, error);
        throw error;
    }
}

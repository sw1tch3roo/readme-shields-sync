import path from 'node:path';
import { fileExists, readTextIfExists } from './common.mjs';

/**
 * @typedef {object} RustMetadata
 * @property {'rust'} eco
 * @property {string | null} name
 */

/**
 * @param {string} cwd
 * @returns {RustMetadata | null}
 */
export function detectRust(cwd) {
    const cargo = path.join(cwd, 'Cargo.toml');

    if (!fileExists(cargo)) {
        return null;
    }

    const txt = readTextIfExists(cargo);
    const match = txt.match(/\[package\][\s\S]*?name\s*=\s*["']([^"']+)["']/);
    const name = match ? match[1] : null;

    return { eco: 'rust', name };
}

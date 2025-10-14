import path from 'node:path';
import { fileExists, readTextIfExists } from './common.mjs';

/**
 * @typedef {object} GoMetadata
 * @property {'go'} eco
 * @property {string | null} modulePath
 */

/**
 * @param {string} cwd
 * @returns {GoMetadata | null}
 */
export function detectGo(cwd) {
    const gomod = path.join(cwd, 'go.mod');

    if (!fileExists(gomod)) {
        return null;
    }

    const txt = readTextIfExists(gomod);
    const match = txt.match(/^module\s+([^\s]+)$/m);
    const modulePath = match ? match[1] : null;

    return { eco: 'go', modulePath };
}

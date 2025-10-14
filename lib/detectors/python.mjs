import path from 'node:path';
import { fileExists, readTextIfExists } from './common.mjs';

/**
 * @typedef {object} PythonMetadata
 * @property {'python'} eco
 * @property {string | null} name
 */

/**
 * @param {string} cwd
 * @returns {PythonMetadata | null}
 */
export function detectPython(cwd) {
    const pyproject = path.join(cwd, 'pyproject.toml');
    const setupCfg = path.join(cwd, 'setup.cfg');
    const setupPy = path.join(cwd, 'setup.py');

    if (!(fileExists(pyproject) || fileExists(setupCfg) || fileExists(setupPy))) {
        return null;
    }

    /** @type {string | null} */
    const name = (() => {
        const t1 = readTextIfExists(pyproject);
        const m1 = t1.match(/name\s*=\s*["']([^"']+)["']/);

        if (m1) {
            return m1[1];
        }

        const t2 = readTextIfExists(setupCfg);
        const m2 = t2.match(/name\s*=\s*([^\s]+)/);

        if (m2) {
            return m2[1]?.replace(/["']/g, '');
        }

        const t3 = readTextIfExists(setupPy);
        const m3 = t3.match(/name\s*=\s*["']([^"']+)["']/);

        return m3 ? m3[1] : null;
    })();

    return { eco: 'python', name };
}

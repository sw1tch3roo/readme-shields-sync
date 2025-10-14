import path from 'node:path';
import { fileExists, readJsonIfExists } from './common.mjs';

/**
 * @typedef {object} JSMetadata
 * @property {'js'} eco
 * @property {string | null} name
 * @property {string | null} license
 * @property {boolean} hasTypes
 * @property {number} depsCount
 * @property {number} devDepsCount
 * @property {string | null} enginesNode
 */

/**
 * @param {string} cwd
 * @returns {JSMetadata | null}
 */
export function detectJS(cwd) {
    const pkgPath = path.join(cwd, 'package.json');

    if (!fileExists(pkgPath)) {
        return null;
    }

    const pkg = readJsonIfExists(pkgPath);

    if (!pkg || typeof pkg !== 'object') {
        return null;
    }

    const pkgJson = /** @type {Record<string, unknown>} */ (pkg);

    const deps = /** @type {Record<string, unknown>} */ (
        typeof pkgJson.dependencies === 'object' && pkgJson.dependencies ? pkgJson.dependencies : {}
    );
    const devDeps = /** @type {Record<string, unknown>} */ (
        typeof pkgJson.devDependencies === 'object' && pkgJson.devDependencies ? pkgJson.devDependencies : {}
    );
    const engines = /** @type {Record<string, unknown>} | undefined */ (
        typeof pkgJson.engines === 'object' && pkgJson.engines ? pkgJson.engines : undefined
    );

    const hasTypes = Boolean(
        typeof pkgJson.types === 'string' || typeof pkgJson.typings === 'string' || 'typescript' in devDeps,
    );

    const depsCount = Object.keys(deps).length;
    const devDepsCount = Object.keys(devDeps).length;
    const enginesNode = engines && typeof engines.node === 'string' ? /** @type {string} */ (engines.node) : null;
    const name = typeof pkgJson.name === 'string' ? pkgJson.name : null;
    const license = typeof pkgJson.license === 'string' ? pkgJson.license : null;

    return {
        eco: 'js',
        name,
        license,
        hasTypes,
        depsCount,
        devDepsCount,
        enginesNode,
    };
}

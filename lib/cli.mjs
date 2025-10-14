import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { BADGES_START, BADGES_END, getOwnerRepo, detectCoverageProvider, updateReadme } from './detectors/common.mjs';
import { detectJS } from './detectors/js.mjs';
import { detectPython } from './detectors/python.mjs';
import { detectGo } from './detectors/go.mjs';
import { detectRust } from './detectors/rust.mjs';
import * as S from './renderers/shields.mjs';

/**
 * @typedef {import('./detectors/js.mjs').JSMetadata} JSMetadata
 * @typedef {import('./detectors/python.mjs').PythonMetadata} PythonMetadata
 * @typedef {import('./detectors/go.mjs').GoMetadata} GoMetadata
 * @typedef {import('./detectors/rust.mjs').RustMetadata} RustMetadata
 * @typedef {{ include?: string[]; exclude?: string[] }} BadgesConfig
 */

/**
 * Read optional include/exclude configuration.
 *
 * @param {string} cwd
 * @returns {BadgesConfig}
 */
function readConfig(cwd) {
    const configPath = path.join(cwd, '.readme-badges.json');

    if (!existsSync(configPath)) {
        return {};
    }

    try {
        return JSON.parse(readFileSync(configPath, 'utf8'));
    } catch {
        return {};
    }
}

/**
 * Pick a workflow file name that feeds the CI badge.
 *
 * @param {string} cwd
 * @returns {string}
 */
function findWorkflowName(cwd) {
    try {
        const dir = path.join(cwd, '.github', 'workflows');
        const files = readdirSync(dir, { withFileTypes: true })
            .filter((entry) => entry.isFile() && entry.name.endsWith('.yml'))
            .map((entry) => entry.name);

        return files[0] || 'ci.yml';
    } catch {
        return 'ci.yml';
    }
}

/**
 * @param {(string | null)} badge
 * @returns {badge is string}
 */
function isStringBadge(badge) {
    return typeof badge === 'string';
}

/**
 * @param {(string | null)[]} badges
 * @param {BadgesConfig} cfg
 * @returns {string[]}
 */
function filterByConfig(badges, cfg) {
    const include = cfg.include || null;
    const exclude = new Set(cfg.exclude || []);
    let filtered = badges.filter(isStringBadge);

    if (include) {
        filtered = filtered.filter((badge) => include.some((key) => badge.toLowerCase().includes(key)));
    }

    if (exclude.size) {
        filtered = filtered.filter((badge) => ![...exclude].some((key) => badge.toLowerCase().includes(key)));
    }

    return filtered;
}

/**
 * CLI entry-point.
 *
 * @returns {Promise<void>}
 */
export async function main() {
    const cwd = process.cwd();
    const ownerRepo = getOwnerRepo();
    const coverageProvider = detectCoverageProvider(cwd);
    const cfg = readConfig(cwd);
    const workflow = findWorkflowName(cwd);

    /** @type {Array<string | null>} */
    const badges = [];

    const js = /** @type {JSMetadata | null} */ (detectJS(cwd));
    const py = /** @type {PythonMetadata | null} */ (detectPython(cwd));
    const go = /** @type {GoMetadata | null} */ (detectGo(cwd));
    const rust = /** @type {RustMetadata | null} */ (detectRust(cwd));

    badges.push(S.ghStars(ownerRepo));
    badges.push(S.ghCI(ownerRepo, workflow));

    if (js?.license) {
        badges.push(S.licenseLabel(js.license));
    }

    badges.push(S.coverageBadge(coverageProvider, ownerRepo));

    if (js) {
        badges.push(S.npmVersion(js.name));
        badges.push(S.npmDownloads(js.name));
        badges.push(S.bundlephobiaMinzip(js.name));
        badges.push(S.nodeEngines(js.enginesNode));
        badges.push(S.tsTypes(js.hasTypes));
        badges.push(S.depsCountBadge(js.depsCount, js.devDepsCount));
    }

    if (py) {
        badges.push(S.pypiVersion(py.name));
        badges.push(S.pypiDownloads(py.name));
    }

    if (rust) {
        badges.push(S.cratesVersion(rust.name));
        badges.push(S.cratesDownloads(rust.name));
    }

    if (go) {
        badges.push(S.goPkg(go.modulePath));
    }

    const final = filterByConfig(badges, cfg);
    const block = final.join(' ');

    const readmePath = path.join(cwd, 'README.md');
    const current = existsSync(readmePath) ? readFileSync(readmePath, 'utf8') : '';
    const next = updateReadme(current, block);

    writeFileSync(readmePath, next, 'utf8');

    // eslint-disable-next-line no-console
    console.log('✅ README badges synced.');
    // eslint-disable-next-line no-console
    console.log('   Between markers:', BADGES_START, BADGES_END);
}

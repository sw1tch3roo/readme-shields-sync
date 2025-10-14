import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';

export const BADGES_START = '<!-- badges:start -->';
export const BADGES_END = '<!-- badges:end -->';

/**
 * @param {string} filePath
 * @returns {unknown | null}
 */
export const readJsonIfExists = (filePath) => {
    try {
        return JSON.parse(readFileSync(filePath, 'utf8'));
    } catch {
        return null;
    }
};

/**
 * @param {string} filePath
 * @returns {boolean}
 */
export const fileExists = (filePath) => existsSync(filePath);

/**
 * Resolve the owner/repo tuple from the current git remote configuration.
 *
 * @returns {string | null}
 */
export function getOwnerRepo() {
    try {
        const url = execSync('git config --get remote.origin.url', { stdio: ['ignore', 'pipe', 'ignore'] })
            .toString()
            .trim();
        let ownerRepo = null;

        if (url.includes('github.com')) {
            if (url.startsWith('git@')) {
                const [, repo = ''] = url.split(':');

                ownerRepo = repo;
            } else {
                const [, repo = ''] = url.split('github.com/');

                ownerRepo = repo;
            }

            ownerRepo = ownerRepo.replace(/\.git$/, '').trim();
        }

        return ownerRepo || null;
    } catch {
        return null;
    }
}

/**
 * @param {string} filePath
 * @returns {string}
 */
export function readTextIfExists(filePath) {
    try {
        return readFileSync(filePath, 'utf8');
    } catch {
        return '';
    }
}

/**
 * @param {string} cwd
 * @returns {'codecov' | 'coveralls' | null}
 */
export function detectCoverageProvider(cwd) {
    const codecov = fileExists(path.join(cwd, 'codecov.yml')) || fileExists(path.join(cwd, '.codecov.yml'));
    const coveralls = fileExists(path.join(cwd, '.coveralls.yml')) || fileExists(path.join(cwd, 'coveralls.yml'));

    if (codecov) {
        return 'codecov';
    }

    if (coveralls) {
        return 'coveralls';
    }

    return null;
}

/**
 * @param {string} readme
 * @param {string} badgesBlock
 * @returns {string}
 */
export function updateReadme(readme, badgesBlock) {
    if (!readme) {
        return `${BADGES_START}\n${badgesBlock}\n${BADGES_END}\n\n# Project\n\nDescribe your project here.\n`;
    }

    const startIndex = readme.indexOf(BADGES_START);
    const endIndex = readme.indexOf(BADGES_END);

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        return readme.slice(0, startIndex + BADGES_START.length) + '\n' + badgesBlock + '\n' + readme.slice(endIndex);
    }

    return `${BADGES_START}\n${badgesBlock}\n${BADGES_END}\n\n${readme}`;
}

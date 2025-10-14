import { describe, expect, it } from 'vitest';
import { ghStars, ghCI, licenseLabel, coverageBadge, npmVersion, depsCountBadge } from '../shields.mjs';

describe('renderers/shields', () => {
    it('generates GitHub badges when owner/repo is provided', () => {
        expect(ghStars('owner/repo')).toBe(
            '[https://img.shields.io/github/stars/owner/repo?style=social](https://github.com/owner/repo/stargazers)',
        );
        expect(ghCI('owner/repo', 'ci.yml')).toBe(
            '[https://img.shields.io/github/actions/workflow/status/owner/repo/ci.yml?label=CI](https://github.com/owner/repo/actions)',
        );
    });

    it('omits GitHub badges when owner/repo is missing', () => {
        expect(ghStars(null)).toBeNull();
        expect(ghCI(null)).toBeNull();
    });

    it('renders license and npm badges', () => {
        expect(licenseLabel('MIT')).toBe('![license](https://img.shields.io/badge/license-MIT-green)');
        expect(npmVersion('demo')).toBe(
            '[![npm version](https://img.shields.io/npm/v/demo.svg)](https://www.npmjs.com/package/demo)',
        );
    });

    it('renders coverage badges for supported providers', () => {
        expect(coverageBadge('codecov', 'owner/repo')).toBe(
            '[https://img.shields.io/codecov/c/github/owner/repo](https://codecov.io/gh/owner/repo)',
        );
        expect(coverageBadge('coveralls', 'owner/repo')).toBe(
            '[https://img.shields.io/coverallsCoverage/github/owner/repo](https://coveralls.io/github/owner/repo)',
        );
        expect(coverageBadge(null, 'owner/repo')).toBeNull();
    });

    it('omits dependency badge when both counts are missing', () => {
        expect(depsCountBadge(null, null)).toBeNull();
        expect(depsCountBadge(undefined, undefined)).toBeNull();
    });

    it('includes dependency badge when at least one count is present', () => {
        expect(depsCountBadge(2, 3)).toBe(
            '![dependencies](https://img.shields.io/badge/dependencies-2%20prod%20%2F%203%20dev-informational)',
        );
        expect(depsCountBadge(null, 1)).toBe(
            '![dependencies](https://img.shields.io/badge/dependencies-0%20prod%20%2F%201%20dev-informational)',
        );
    });
});

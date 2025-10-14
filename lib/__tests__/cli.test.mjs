import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { BADGES_START, BADGES_END } from '../detectors/common.mjs';
import { main } from '../cli.mjs';

describe('cli main', () => {
    const originalCwd = process.cwd();
    /** @type {string} */
    let tempDir = '';
    /** @type {ReturnType<typeof vi.spyOn> | null} */
    let logSpy = null;

    beforeEach(() => {
        tempDir = mkdtempSync(path.join(tmpdir(), 'rbs-cli-'));
        logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        process.chdir(originalCwd);

        if (logSpy) {
            logSpy.mockRestore();
            logSpy = null;
        }

        if (tempDir) {
            rmSync(tempDir, { recursive: true, force: true });
            tempDir = '';
        }
    });

    it('writes badge block to README.md', async () => {
        const pkg = {
            name: 'cli-test-package',
            version: '1.0.0',
            license: 'MIT',
            dependencies: {},
            devDependencies: {},
        };

        if (!tempDir) {
            throw new Error('tempDir not initialized');
        }

        writeFileSync(path.join(tempDir, 'package.json'), JSON.stringify(pkg, null, 2));
        writeFileSync(path.join(tempDir, 'README.md'), '# Heading\n\nSome content.\n');

        process.chdir(tempDir);
        await main();

        const readme = readFileSync(path.join(tempDir, 'README.md'), 'utf8');

        expect(readme).toContain(BADGES_START);
        expect(readme).toContain(BADGES_END);
        expect(readme).toMatch(/https:\/\/img\.shields\.io\/npm\/v\/cli-test-package\.svg/);
    });
});

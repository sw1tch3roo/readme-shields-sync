import { describe, expect, it } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { BADGES_START, BADGES_END, updateReadme, detectCoverageProvider } from '../common.mjs';

describe('detectors/common', () => {
    it('inserts a badges block when README is empty', () => {
        const result = updateReadme('', 'badge-one badge-two');

        expect(result.startsWith(`${BADGES_START}`)).toBe(true);
        expect(result).toContain('badge-one badge-two');
        expect(result).toContain(BADGES_END);
    });

    it('replaces an existing badges block', () => {
        const original = `${BADGES_START}\nold badges\n${BADGES_END}\n\n# Title`;
        const result = updateReadme(original, 'new badges');
        const expected = `${BADGES_START}\nnew badges\n${BADGES_END}\n\n# Title`;

        expect(result).toBe(expected);
    });

    it('detects coverage provider based on config files', () => {
        const base = mkdtempSync(path.join(tmpdir(), 'rbs-common-'));
        const codecovPath = path.join(base, 'codecov.yml');

        writeFileSync(codecovPath, 'coverage: true');

        expect(detectCoverageProvider(base)).toBe('codecov');

        rmSync(codecovPath);
        writeFileSync(path.join(base, '.coveralls.yml'), 'service_name: test');
        expect(detectCoverageProvider(base)).toBe('coveralls');

        rmSync(base, { recursive: true, force: true });
    });
});

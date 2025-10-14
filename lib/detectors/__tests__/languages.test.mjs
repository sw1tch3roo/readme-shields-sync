import { describe, expect, it } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { detectJS } from '../js.mjs';
import { detectPython } from '../python.mjs';
import { detectGo } from '../go.mjs';
import { detectRust } from '../rust.mjs';

describe('language detectors', () => {
    it('extracts metadata from package.json', () => {
        const dir = mkdtempSync(path.join(tmpdir(), 'rbs-js-'));
        const pkg = {
            name: 'test-package',
            license: 'MIT',
            dependencies: {
                lodash: '^4.17.0',
            },
            devDependencies: {
                typescript: '^5.0.0',
            },
            engines: {
                node: '>=18',
            },
        };

        writeFileSync(path.join(dir, 'package.json'), JSON.stringify(pkg, null, 2));

        const result = detectJS(dir);

        expect(result).toEqual({
            eco: 'js',
            name: 'test-package',
            license: 'MIT',
            hasTypes: true,
            depsCount: 1,
            devDepsCount: 1,
            enginesNode: '>=18',
        });

        rmSync(dir, { recursive: true, force: true });
    });

    it('extracts metadata from pyproject.toml', () => {
        const dir = mkdtempSync(path.join(tmpdir(), 'rbs-py-'));

        writeFileSync(path.join(dir, 'pyproject.toml'), 'name = "demo-pkg"');

        expect(detectPython(dir)).toEqual({ eco: 'python', name: 'demo-pkg' });
        rmSync(dir, { recursive: true, force: true });
    });

    it('extracts module path from go.mod', () => {
        const dir = mkdtempSync(path.join(tmpdir(), 'rbs-go-'));

        writeFileSync(path.join(dir, 'go.mod'), 'module github.com/example/project');

        expect(detectGo(dir)).toEqual({ eco: 'go', modulePath: 'github.com/example/project' });
        rmSync(dir, { recursive: true, force: true });
    });

    it('extracts crate name from Cargo.toml', () => {
        const dir = mkdtempSync(path.join(tmpdir(), 'rbs-rust-'));

        writeFileSync(path.join(dir, 'Cargo.toml'), '[package]\nname = "awesome-crate"\nversion = "0.1.0"\n');

        expect(detectRust(dir)).toEqual({ eco: 'rust', name: 'awesome-crate' });
        rmSync(dir, { recursive: true, force: true });
    });
});

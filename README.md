# readme-shields-sync

Keep your README badges fresh across ecosystems (Javascript, TypeScript, Python, Rust, Go) with one command.

## Quick Start

```bash
npx readme-shields-sync
```

It inserts/updates the badges block between:

```
<!-- badges:start -->
[https://img.shields.io/github/stars/sw1tch3roo/readme-shields-sync?style=social](https://github.com/sw1tch3roo/readme-shields-sync/stargazers) [https://img.shields.io/github/actions/workflow/status/sw1tch3roo/readme-shields-sync/readme-badges.yml?label=CI](https://github.com/sw1tch3roo/readme-shields-sync/actions) ![license](https://img.shields.io/badge/license-MIT-green) [https://img.shields.io/npm/v/readme-shields-sync.svg](https://www.npmjs.com/package/readme-shields-sync) [https://img.shields.io/npm/dm/readme-shields-sync.svg](https://www.npmjs.com/package/readme-shields-sync) [https://img.shields.io/bundlephobia/minzip/readme-shields-sync](https://bundlephobia.com/package/readme-shields-sync) ![node](https://img.shields.io/badge/node-%3E%3D18-success) ![types](https://img.shields.io/badge/types-TypeScript-blue) ![dependencies](https://img.shields.io/badge/dependencies-0%20prod%20%2F%205%20dev-informational)
<!-- badges:end -->
```

### What it detects

- **GitHub**: stars, CI status (auto-detected workflow), coverage (Codecov/Coveralls), license
- **JS/TS**: npm version/downloads, bundle size (bundlephobia), deps count, Node engines, TS types
- **Python**: PyPI version/downloads
- **Rust**: crates.io version/downloads
- **Go**: pkg.go.dev link

### Optional config

`.readme-shields.json`

```json
{
  "include": [
    "npm",
    "downloads",
    "license",
    "ci",
    "stars",
    "coverage",
    "bundle",
    "deps",
    "node",
    "types",
    "pypi",
    "crates",
    "go"
  ],
  "exclude": []
}
```

### GitHub Action

See `.github/workflows/readme-shields.yml` to auto-sync weekly.

## License

MIT © sw1tch3roo

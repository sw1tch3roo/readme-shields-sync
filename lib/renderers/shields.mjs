/**
 * Wrap a badge image with a link if provided.
 *
 * @param {string | null | undefined} href
 * @param {string} imgMarkup
 * @returns {string}
 */
export function badge(href, imgMarkup) {
    return href ? `[${imgMarkup}](${href})` : `${imgMarkup}`;
}

/**
 * Create a Shields.io image block.
 *
 * @param {string} url
 * @param {string} [alt]
 * @returns {string}
 */
export function img(url, alt = '') {
    return `![${alt}](${url})`;
}

/**
 * @param {string | null} ownerRepo
 * @returns {string | null}
 */
export function ghStars(ownerRepo) {
    if (!ownerRepo) {
        return null;
    }

    return badge(
        `https://github.com/${ownerRepo}/stargazers`,
        `https://img.shields.io/github/stars/${ownerRepo}?style=social`,
    );
}

/**
 * @param {string | null} ownerRepo
 * @param {string} [workflow='ci.yml']
 * @returns {string | null}
 */
export function ghCI(ownerRepo, workflow = 'ci.yml') {
    if (!ownerRepo) {
        return null;
    }

    return badge(
        `https://github.com/${ownerRepo}/actions`,
        `https://img.shields.io/github/actions/workflow/status/${ownerRepo}/${workflow}?label=CI`,
    );
}

/**
 * @param {string | null} lic
 * @returns {string | null}
 */
export function licenseLabel(lic) {
    if (!lic) {
        return null;
    }

    return img(`https://img.shields.io/badge/license-${encodeURIComponent(lic)}-green`, 'license');
}

/**
 * @param {string | null} name
 * @returns {string | null}
 */
export function npmVersion(name) {
    if (!name) {
        return null;
    }

    return badge(`https://www.npmjs.com/package/${name}`, `https://img.shields.io/npm/v/${name}.svg`);
}

/**
 * @param {string | null} name
 * @returns {string | null}
 */
export function npmDownloads(name) {
    if (!name) {
        return null;
    }

    return badge(`https://www.npmjs.com/package/${name}`, `https://img.shields.io/npm/dm/${name}.svg`);
}

/**
 * @param {string | null} range
 * @returns {string | null}
 */
export function nodeEngines(range) {
    if (!range) {
        return null;
    }

    return img(`https://img.shields.io/badge/node-${encodeURIComponent(range)}-success`, 'node');
}

/**
 * @param {boolean} hasTypes
 * @returns {string | null}
 */
export function tsTypes(hasTypes) {
    if (!hasTypes) {
        return null;
    }

    return img('https://img.shields.io/badge/types-TypeScript-blue', 'types');
}

/**
 * @param {string | null} name
 * @returns {string | null}
 */
export function bundlephobiaMinzip(name) {
    if (!name) {
        return null;
    }

    return badge(`https://bundlephobia.com/package/${name}`, `https://img.shields.io/bundlephobia/minzip/${name}`);
}

/**
 * @param {number | null | undefined} prod
 * @param {number | null | undefined} dev
 * @returns {string | null}
 */
export function depsCountBadge(prod, dev) {
    const prodMissing = prod === null || prod === undefined;
    const devMissing = dev === null || dev === undefined;

    if (prodMissing && devMissing) {
        return null;
    }

    const label = encodeURIComponent(`${prod ?? 0} prod / ${dev ?? 0} dev`);

    return img(`https://img.shields.io/badge/dependencies-${label}-informational`, 'dependencies');
}

/**
 * @param {string | null} name
 * @returns {string | null}
 */
export function pypiVersion(name) {
    if (!name) {
        return null;
    }

    return badge(`https://pypi.org/project/${name}/`, `https://img.shields.io/pypi/v/${name}`);
}

/**
 * @param {string | null} name
 * @returns {string | null}
 */
export function pypiDownloads(name) {
    if (!name) {
        return null;
    }

    return img(`https://img.shields.io/pypi/dm/${name}`, 'pypi downloads');
}

/**
 * @param {string | null} name
 * @returns {string | null}
 */
export function cratesVersion(name) {
    if (!name) {
        return null;
    }

    return badge(`https://crates.io/crates/${name}`, `https://img.shields.io/crates/v/${name}`);
}

/**
 * @param {string | null} name
 * @returns {string | null}
 */
export function cratesDownloads(name) {
    if (!name) {
        return null;
    }

    return img(`https://img.shields.io/crates/d/${name}`, 'crates downloads');
}

/**
 * @param {string | null} modulePath
 * @returns {string | null}
 */
export function goPkg(modulePath) {
    if (!modulePath) {
        return null;
    }

    return badge(`https://pkg.go.dev/${modulePath}`, 'https://img.shields.io/badge/go-pkg.go.dev-blue');
}

/**
 * @param {'codecov' | 'coveralls' | null} provider
 * @param {string | null} ownerRepo
 * @returns {string | null}
 */
export function coverageBadge(provider, ownerRepo) {
    if (!provider || !ownerRepo) {
        return null;
    }

    if (provider === 'codecov') {
        return badge(`https://codecov.io/gh/${ownerRepo}`, `https://img.shields.io/codecov/c/github/${ownerRepo}`);
    }

    if (provider === 'coveralls') {
        return badge(
            `https://coveralls.io/github/${ownerRepo}`,
            `https://img.shields.io/coverallsCoverage/github/${ownerRepo}`,
        );
    }

    return null;
}

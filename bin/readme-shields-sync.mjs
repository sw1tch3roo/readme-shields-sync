#!/usr/bin/env node
import { main } from '../lib/cli.mjs';

main().catch((e) => {
    // eslint-disable-next-line no-console
    console.error('[readme-shields-sync] Error:', e?.stack || e?.message || e);
    process.exit(1);
});

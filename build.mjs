import * as esbuild from 'esbuild';

const watch = process.argv.some((arg) => arg === '--watch');

const browserBuild = await esbuild.context({
    entryPoints: ['src/script.ts'],
    bundle: true,
    outdir: 'dist',
});

if (watch) {
    await browserBuild.watch();
} else {
    await browserBuild.rebuild();
    await browserBuild.dispose();
}

const nodeBuild = await esbuild.context({
    entryPoints: ['src/benchmark.ts'],
    bundle: true,
    outdir: 'dist',
    platform: 'node',
});

if (watch) {
    await nodeBuild.watch();
} else {
    await nodeBuild.rebuild();
    await nodeBuild.dispose();
}

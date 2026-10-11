import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';

// Exercise the pasted component's pure calendar math without a browser or network.
const source = readFileSync(new URL('../components/ui/contribution-skyline.tsx', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
});
const compiledModule = { exports: {} };
runInNewContext(outputText, { module: compiledModule, exports: compiledModule.exports, require: createRequire(import.meta.url) });
const { buildGrid, computeStats, dayMs, resolvePalette } = compiledModule.exports;

test('preserves every day and count in GitHub’s rolling yearly calendar', () => {
  const days = [{ date: '2025-10-12', count: 9 }, { date: '2026-10-11', count: 4 }];
  const { cells } = buildGrid(days, dayMs('2026-10-11'));
  const stats = computeStats(cells);
  assert.equal(stats.total, 13);
  assert.equal(stats.busiest.date, '2025-10-12');
  assert.equal(stats.busiest.count, 9);
  assert.equal(cells.at(-1).date, '2026-10-11');
});

test('calculates streaks while allowing today to remain incomplete', () => {
  const data = [
    { date: '2026-10-08', count: 2 }, { date: '2026-10-09', count: 3 },
    { date: '2026-10-10', count: 1 }, { date: '2026-10-11', count: 0 },
  ];
  const stats = computeStats(buildGrid(data, dayMs('2026-10-11')).cells);
  assert.equal(stats.total, 6);
  assert.equal(stats.current.days, 3);
  assert.equal(stats.longest.days, 3);
});

test('zero activity stays zero and the palette works without a preset', () => {
  const stats = computeStats(buildGrid([{ date: '2026-10-11', count: 0 }], dayMs('2026-10-11')).cells);
  assert.equal(stats.total, 0);
  assert.equal(stats.current.days, 0);
  assert.equal(stats.busiest.date, null);
  assert.equal(resolvePalette(undefined, true).length, 4);
  assert.equal(source.includes('generateContributions'), false);
});

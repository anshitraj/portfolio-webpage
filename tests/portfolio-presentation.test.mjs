import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';

function dataset(path) {
  const code = readFileSync(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  const compiled = { exports: {} };
  runInNewContext(outputText, { module: compiled, exports: compiled.exports, require: createRequire(import.meta.url) });
  return compiled.exports;
}

const { IMPACT_GROUPS, IMPACT_METRICS } = dataset('../data/metrics.ts');
const { HOME_PROJECTS } = dataset('../data/home.ts');
const visible = IMPACT_METRICS.filter((metric) => metric.verified !== false);

test('all 15 original quantified outcomes remain visible and grouped once', () => {
  assert.equal(visible.length, 15);
  assert.equal(new Set(visible.map((metric) => metric.id)).size, 15);
  for (const metric of visible) {
    assert.equal(IMPACT_GROUPS.filter((group) => group.id === metric.group).length, 1);
    assert.ok(metric.shortLabel && metric.context && metric.label && metric.value);
  }
  assert.equal(visible.find((metric) => metric.id === 'clients').value, '$100K');
  assert.equal(visible.find((metric) => metric.id === 'artyug').value, '₹80,000');
  assert.equal(visible.find((metric) => metric.id === 'zama').value, '$1,500');
  assert.equal(visible.find((metric) => metric.id === 'cloud').value, '$20,000');
  assert.match(visible.find((metric) => metric.id === 'cloud').shortLabel, /credits/i);
});

test('compact project copy retains the original descriptions, demos and proof points', () => {
  for (const project of HOME_PROJECTS) {
    assert.ok(project.description.length > project.shortDescription.length);
    assert.ok(project.metrics.length >= 2);
  }
  for (const project of HOME_PROJECTS.slice(0, 4)) assert.ok(project.video.src.endsWith('.mp4'));
});

test('GitHub follows projects and uses scroll-driven 2D to 3D with manual controls', () => {
  const home = readFileSync(new URL('../components/portfolio/HomePortfolio.tsx', import.meta.url), 'utf8');
  const github = readFileSync(new URL('../components/portfolio/GitHubContributions.tsx', import.meta.url), 'utf8');
  const skyline = readFileSync(new URL('../components/ui/contribution-skyline.tsx', import.meta.url), 'utf8');
  assert.ok(home.indexOf('id="projects"') < home.indexOf('id="github"'));
  assert.ok(home.indexOf('id="github"') < home.indexOf('id="about"'));
  assert.equal(home.split('id="github"').length - 1, 1);
  assert.match(github, /defaultView="2d"/);
  assert.match(github, /offset: \['start 82%', 'start 38%'\]/);
  assert.match(github, /scrollProgress=\{manualView \? undefined : cameraProgress\}/);
  assert.match(github, /reducedMotion \? \(progress >= 0\.5 \? 1 : 0\)/);
  assert.match(skyline, /const Hc = cfg\.current\.scrollMorph \? H3 : lerp/);
});

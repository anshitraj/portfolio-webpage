import { projects } from '@/data/projects';
import { skillGroups } from '@/data/skills';

/**
 * Ties each capability group back to the projects that actually shipped with it.
 *
 * The point is the same as everywhere else on this site: a list of technology
 * names is a claim, and a claim is worth less than the thing it shipped in. The
 * proof is derived from `data/projects.ts` rather than written by hand, so it
 * cannot drift out of date when a project's tech list changes.
 */

/** Names that differ between the skill list and how projects spell them. */
const ALIASES: Record<string, string[]> = {
  'LLM integrations': ['LLMs', 'Qwen3', 'Featherless'],
  'Circle Wallets': ['Circle', 'Circle Gateway', 'Circle Developer Controlled Wallets'],
  'AI Agents': ['MCP', 'AI Agents'],
};

const squash = (value: string) => value.toLowerCase().replace(/[\s.\-/]/g, '');

/**
 * True when a project's technology is the skill, or a more specific version of
 * it — "Next.js 15" counts as Next.js, "Tempo testnet" counts as Tempo.
 *
 * The boundary check matters: a naive `startsWith` would let "Google" satisfy
 * "Go", so the next character has to be a separator or a version digit.
 */
function isSameTech(projectTech: string, skill: string): boolean {
  const p = projectTech.toLowerCase();
  const s = skill.toLowerCase();

  if (p === s) return true;
  if (squash(p) === squash(s)) return true;
  if (p.startsWith(s)) {
    const next = p[s.length];
    return next === ' ' || /[0-9]/.test(next);
  }
  return false;
}

export type StackGroup = {
  name: string;
  items: string[];
  /** Titles of shipped projects using anything in this group. */
  shippedIn: string[];
};

export const stackGroups: StackGroup[] = skillGroups.map((group) => {
  const names = group.items.flatMap((item) => [item, ...(ALIASES[item] ?? [])]);

  const shippedIn = projects
    .filter((project) => project.tech.some((tech) => names.some((n) => isSameTech(tech, n))))
    .map((project) => project.title);

  return { name: group.name, items: group.items, shippedIn };
});

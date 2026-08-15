import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Geist TTFs for OG image rendering.
 *
 * Satori needs a real font: without one it falls back per-glyph and renders
 * inconsistent word spacing. The files are vendored (OFL licensed) rather than
 * fetched, so the build has no network dependency.
 *
 * TTF specifically — satori does not read WOFF2, which is what next/font emits.
 */
export async function geistFonts() {
  const dir = join(process.cwd(), 'assets', 'fonts');
  const [regular, semibold] = await Promise.all([
    readFile(join(dir, 'Geist-400.ttf')),
    readFile(join(dir, 'Geist-600.ttf')),
  ]);

  return [
    { name: 'Geist', data: regular, weight: 400 as const, style: 'normal' as const },
    { name: 'Geist', data: semibold, weight: 600 as const, style: 'normal' as const },
  ];
}

export const GITHUB_WEEKS = 52;
export const GITHUB_DAYS = 7;

// Intensity levels from 0 (no contributions) to 4 (high activity).
// This is a locally stored demo dataset that approximates a real GitHub heatmap.
// Each inner array represents a week (column), with 7 entries for days (rows).
export const githubContribMatrix: number[][] = Array.from(
  { length: GITHUB_WEEKS },
  (_, weekIndex) => {
    return Array.from({ length: GITHUB_DAYS }, (_, dayIndex) => {
      // Create some waves of activity across the year.
      const base =
        Math.sin((weekIndex / GITHUB_WEEKS) * Math.PI * 3) * 2 +
        Math.cos((dayIndex / GITHUB_DAYS) * Math.PI * 2);

      const noise =
        ((weekIndex * 7 + dayIndex) % 5 === 0 ? 1 : 0) +
        ((weekIndex * 3 + dayIndex * 2) % 7 === 0 ? 0.5 : 0);

      const value = base + noise;

      if (value < -0.5) return 0;
      if (value < 0.8) return 1;
      if (value < 1.8) return 2;
      if (value < 2.6) return 3;
      return 4;
    });
  }
);


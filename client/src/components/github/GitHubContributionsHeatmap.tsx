import { githubContribMatrix, GITHUB_WEEKS, GITHUB_DAYS } from '@/content/githubContrib';

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Approximate month positions across the 52-week grid
const monthPositions: { label: string; column: number }[] = monthLabels.map((label, index) => ({
  label,
  column: Math.round((index / 12) * GITHUB_WEEKS),
}));

const levelToClassName: Record<number, string> = {
  0: 'bg-emerald-950/20',
  1: 'bg-emerald-900/60',
  2: 'bg-emerald-700',
  3: 'bg-emerald-500',
  4: 'bg-emerald-300',
};

export function GitHubContributionsHeatmap() {
  return (
    <button
      type="button"
      onClick={() => window.open('https://github.com/anshitraj', '_blank', 'noreferrer')}
      className="w-full text-left group focus:outline-none"
    >
      <div className="flex flex-col gap-3">
        {/* Month labels */}
        <div className="ml-8 flex gap-[3px] text-[10px] text-muted-foreground/80 font-mono">
          {Array.from({ length: GITHUB_WEEKS }).map((_, weekIndex) => {
            const monthForColumn = monthPositions.find((m) => m.column === weekIndex);
            return (
              <div key={weekIndex} className="w-3 h-3 flex items-center justify-center">
                {monthForColumn && (
                  <span className="translate-x-[-50%]">
                    {monthForColumn.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex">
          {/* Day labels */}
          <div className="mr-2 flex flex-col justify-between text-[10px] text-muted-foreground/70 font-mono h-[84px] py-[2px]">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Grid */}
          <div className="flex gap-[3px]">
            {githubContribMatrix.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.slice(0, GITHUB_DAYS).map((level, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-[3px] ${levelToClassName[level]} transition-colors duration-150 group-hover:brightness-110`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}


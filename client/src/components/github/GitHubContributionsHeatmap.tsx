import { githubContribMatrix, GITHUB_WEEKS, GITHUB_DAYS } from '@/content/githubContrib';
import { useGitHubContributions } from '@/hooks/use-github-contributions';

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Approximate month positions across the 52-week grid
const monthPositions: { label: string; column: number }[] = monthLabels.map((label, index) => ({
  label,
  column: Math.round((index / 12) * GITHUB_WEEKS),
}));

const levelToClassName: Record<number, string> = {
  0: 'bg-emerald-200/50 dark:bg-emerald-950/20',
  1: 'bg-emerald-400/70 dark:bg-emerald-900/60',
  2: 'bg-emerald-600 dark:bg-emerald-700',
  3: 'bg-emerald-500',
  4: 'bg-emerald-400 dark:bg-emerald-300',
};

export function GitHubContributionsHeatmap() {
  const { matrix: liveMatrix, loading, error } = useGitHubContributions();
  const matrix = liveMatrix ?? githubContribMatrix;

  return (
    <button
      type="button"
      onClick={() => window.open('https://github.com/anshitraj', '_blank', 'noreferrer')}
      className="group w-full text-left focus:outline-none"
      aria-label="Open GitHub profile"
    >
      <div className="overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max flex-col gap-2.5 sm:gap-3">
          {/* Month labels */}
          <div className="ml-6 flex gap-[2px] font-mono text-[9px] text-muted-foreground/80 sm:ml-8 sm:gap-[3px] sm:text-[10px]">
            {Array.from({ length: GITHUB_WEEKS }).map((_, weekIndex) => {
              const monthForColumn = monthPositions.find((m) => m.column === weekIndex);
              const monthIndex = monthForColumn ? monthLabels.indexOf(monthForColumn.label) : -1;
              const hideOnMobile = monthIndex !== -1 && monthIndex % 2 !== 0;
              return (
                <div key={weekIndex} className="flex h-2 w-2 items-center justify-center sm:h-3 sm:w-3">
                  {monthForColumn && (
                    <span className={`translate-x-[-50%] whitespace-nowrap ${hideOnMobile ? 'hidden sm:inline' : ''}`}>
                      {monthForColumn.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex">
            {/* Day labels */}
            <div className="mr-2 flex h-[58px] flex-col justify-between py-[1px] font-mono text-[9px] text-muted-foreground/70 sm:h-[84px] sm:py-[2px] sm:text-[10px]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Grid */}
            <div className="relative flex gap-[2px] sm:gap-[3px]">
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-zinc-200/60 dark:bg-black/40 font-mono text-[10px] text-muted-foreground">
                  Loading contributions…
                </div>
              )}
              {matrix.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px] sm:gap-[3px]">
                  {week.slice(0, GITHUB_DAYS).map((level, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`h-2 w-2 rounded-[2px] sm:h-3 sm:w-3 sm:rounded-[3px] ${levelToClassName[level]} transition-colors duration-150 group-hover:brightness-110`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

"use client";

import { SectionHeading, AnimateOnScroll } from "@/components/SectionHeading";
import type { ContributionCalendar } from "@/lib/github";

const LEVEL_COLORS = [
  "rgba(255,255,255,0.06)", // 0 — no contributions
  "rgba(48,209,88,0.25)", // 1
  "rgba(48,209,88,0.45)", // 2
  "rgba(48,209,88,0.7)", // 3
  "rgba(48,209,88,1)", // 4 — most active
];

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface GitHubActivityProps {
  calendar: ContributionCalendar | null;
}

export default function GitHubActivity({ calendar }: GitHubActivityProps) {
  if (!calendar || calendar.weeks.length === 0) return null;

  // Figure out which weeks start a new month, for the top-row labels
  const monthMarkers: { weekIndex: number; label: string }[] = [];
  let lastMonth = -1;
  calendar.weeks.forEach((week, i) => {
    const firstDay = week[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date + "T00:00:00").getMonth();
    if (month !== lastMonth) {
      monthMarkers.push({ weekIndex: i, label: MONTH_LABELS[month] });
      lastMonth = month;
    }
  });

  return (
    <section
      id="github-activity"
      className="bg-bg-primary"
      style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-6">
        <AnimateOnScroll>
          <SectionHeading
            title="GitHub Activity"
            subtitle={`${calendar.totalContributions.toLocaleString()} contributions in the last year.`}
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="overflow-x-auto rounded-[var(--radius-card)] border border-white/5 bg-bg-elevated p-6">
            <div className="inline-block min-w-full">
              {/* Month labels */}
              <div className="mb-1 flex pl-8 text-xs text-text-tertiary">
                {calendar.weeks.map((_, i) => {
                  const marker = monthMarkers.find((m) => m.weekIndex === i);
                  return (
                    <div key={i} className="w-[13px] shrink-0">
                      {marker && <span>{marker.label}</span>}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-[3px]">
                {/* Day-of-week labels */}
                <div className="mr-1 flex flex-col justify-between py-[1px] text-[10px] text-text-tertiary">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                {calendar.weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day) => (
                      <div
                        key={day.date}
                        title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`}
                        className="h-[10px] w-[10px] rounded-[2px] transition-transform duration-150 hover:scale-125"
                        style={{ background: LEVEL_COLORS[day.level] }}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-4 flex items-center justify-end gap-1.5 pr-1 text-[11px] text-text-tertiary">
                <span>Less</span>
                {LEVEL_COLORS.map((color, i) => (
                  <div
                    key={i}
                    className="h-[10px] w-[10px] rounded-[2px]"
                    style={{ background: color }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

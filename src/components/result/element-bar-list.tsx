import { Badge } from "@/components/ui/badge";
import { ELEMENT_META, ELEMENT_ORDER } from "@/lib/element-meta";
import { formatScoreFraction } from "@/lib/format";
import type { AnalysisResult } from "@/types/saju";

interface ElementBarListProps {
  result: AnalysisResult;
}

export function ElementBarList({ result }: ElementBarListProps) {
  return (
    <ul className="flex flex-col gap-3" aria-label="오행 점수 분포">
      {ELEMENT_ORDER.map((key) => {
        const meta = ELEMENT_META[key];
        const score = result.score[key];
        const isLow = result.weakElements.includes(key);
        const percentage = result.totalLetters == 0 ? 0 : (score / result.totalLetters) * 100;

        return (
          <li
            key={key}
            className="rounded-2xl border border-border/70 bg-background px-4 py-4"
            style={{
              boxShadow: isLow ? `inset 0 0 0 1px ${meta.accent}33` : undefined,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-3 rounded-full"
                  style={{ backgroundColor: meta.accent }}
                />
                <div>
                  <div className="font-medium text-foreground">{meta.fullLabel}</div>
                  <div className="text-xs text-muted-foreground">천간 1점 + 지지 1점</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isLow ? (
                  <Badge variant="secondary" className="rounded-full px-2.5 py-1">
                    낮음
                  </Badge>
                ) : null}
                <strong className="text-base font-semibold text-foreground">
                  {formatScoreFraction(score, result.totalLetters)}
                </strong>
              </div>
            </div>
            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-muted"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                  minWidth: score > 0 ? "0.5rem" : undefined,
                  backgroundColor: meta.accent,
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

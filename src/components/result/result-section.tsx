import { DisclaimerCard } from "@/components/result/disclaimer-card";
import { ElementScoreCard } from "@/components/result/element-score-card";
import { InsightCard } from "@/components/result/insight-card";
import { RecommendationCard } from "@/components/result/recommendation-card";
import { ResultSummaryCard } from "@/components/result/result-summary-card";
import type { AnalysisResult } from "@/types/saju";

interface ResultSectionProps {
  result: AnalysisResult;
}

export function ResultSection({ result }: ResultSectionProps) {
  return (
    <section id="result-section" aria-label="조회 결과" className="flex flex-col gap-5">
      <p className="text-sm font-medium text-primary">조회 결과</p>

      <ResultSummaryCard result={result} />

      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <ElementScoreCard result={result} />
        <InsightCard result={result} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <RecommendationCard result={result} />
        <DisclaimerCard />
      </div>
    </section>
  );
}

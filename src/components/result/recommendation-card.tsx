import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ELEMENT_META } from "@/lib/element-meta";
import type { AnalysisResult } from "@/types/saju";

interface RecommendationCardProps {
  result: AnalysisResult;
}

export function RecommendationCard({ result }: RecommendationCardProps) {
  const primaryMeta = ELEMENT_META[result.primaryElement];

  return (
    <Card className="border border-border/70 shadow-[0_16px_48px_-32px_rgba(15,23,42,0.25)]">
      <CardHeader>
        <CardTitle>추천 포인트</CardTitle>
        <CardDescription>
          {primaryMeta.fullLabel} 보완을 염두에 둔 가벼운 참고용 제안입니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-foreground">추천 컬러</h3>
          <div className="flex flex-wrap gap-2">
            {result.combinedContent.colors.map((color) => (
              <Badge key={color} variant="outline" className="rounded-full px-3 py-1.5">
                {color}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-foreground">키워드</h3>
          <div className="flex flex-wrap gap-2">
            {result.combinedContent.keywords.map((keyword) => (
              <Badge
                key={keyword}
                variant="secondary"
                className="rounded-full px-3 py-1.5"
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-foreground">태도 · 보완 포인트</h3>
          <ul className="flex flex-col gap-2 text-sm leading-6 text-muted-foreground">
            {result.combinedContent.tips.slice(0, 3).map((tip) => (
              <li
                key={tip}
                className="rounded-xl border border-border/70 bg-background px-4 py-3"
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

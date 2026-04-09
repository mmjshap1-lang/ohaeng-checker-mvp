import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ElementBarList } from "@/components/result/element-bar-list";
import type { AnalysisResult } from "@/types/saju";

interface ElementScoreCardProps {
  result: AnalysisResult;
}

export function ElementScoreCard({ result }: ElementScoreCardProps) {
  return (
    <Card className="border border-border/70 shadow-[0_16px_48px_-32px_rgba(15,23,42,0.25)]">
      <CardHeader>
        <CardTitle>오행 분포</CardTitle>
        <CardDescription>
          연주·월주·일주·시주의 천간과 지지를 각각 1점으로 집계한 결과예요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ElementBarList result={result} />
      </CardContent>
    </Card>
  );
}

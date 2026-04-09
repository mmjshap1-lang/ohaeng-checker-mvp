import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { withBasePath } from "@/lib/asset-path";
import type { AnalysisResult } from "@/types/saju";

interface InsightCardProps {
  result: AnalysisResult;
}

const INTERPRETATION_IMAGE = withBasePath("/insight.jpg");

export function InsightCard({ result }: InsightCardProps) {
  return (
    <Card className="border border-border/70 shadow-[0_16px_48px_-32px_rgba(15,23,42,0.25)]">
      <CardHeader>
        <CardTitle>오행 해석</CardTitle>
        <CardDescription>
          부족한 오행을 중심으로 현재 흐름을 읽기 쉽게 정리했어요.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/20 p-2">
          <div className="relative aspect-[2752/1536] w-full overflow-hidden rounded-xl">
            <Image
              src={INTERPRETATION_IMAGE}
              alt="오행 해석 안내 이미지"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain object-center"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-muted px-4 py-4">
          <div className="text-sm font-medium text-foreground">한눈에 요약</div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {result.combinedContent.summary}
          </p>
        </div>

        <Separator />

        <div className="flex flex-col gap-4 text-sm leading-6 text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground">재물</h3>
            <p className="mt-1">{result.combinedContent.wealth}</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">건강</h3>
            <p className="mt-1">{result.combinedContent.health}</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">관계</h3>
            <p className="mt-1">{result.combinedContent.relationship}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

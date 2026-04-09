import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { withBasePath } from "@/lib/asset-path";
import { formatWeaknessHeadline, formatWeaknessSubtext } from "@/lib/format";
import type { AnalysisResult, ElementKey } from "@/types/saju";

interface ResultSummaryCardProps {
  result: AnalysisResult;
}

const RESULT_IMAGE_MAP: Record<ElementKey, { src: string; alt: string }> = {
  wood: {
    src: withBasePath("/result-wood.png"),
    alt: "목이 부족할 때 표시되는 목 안내 이미지",
  },
  fire: {
    src: withBasePath("/result-fire.png"),
    alt: "화가 부족할 때 표시되는 화 안내 이미지",
  },
  earth: {
    src: withBasePath("/result-earth.png"),
    alt: "토가 부족할 때 표시되는 토 안내 이미지",
  },
  metal: {
    src: withBasePath("/result-metal.png"),
    alt: "금이 부족할 때 표시되는 금 안내 이미지",
  },
  water: {
    src: withBasePath("/result-water.png"),
    alt: "수가 부족할 때 표시되는 수 안내 이미지",
  },
};

export function ResultSummaryCard({ result }: ResultSummaryCardProps) {
  const resultImage = result.weakElements[0]
    ? RESULT_IMAGE_MAP[result.weakElements[0]]
    : null;

  return (
    <Card className="border border-border/70 bg-card shadow-[0_16px_48px_-28px_rgba(15,23,42,0.28)]">
      <CardHeader className="gap-3 border-b border-border/70 pb-2.5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] md:items-center lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <div className="flex min-w-0 flex-col items-center gap-2 text-center md:pr-2">
            <CardTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
              {formatWeaknessHeadline(result.weaknessKind, result.weakElements)}
            </CardTitle>
            <CardDescription className="text-sm leading-6 sm:text-base">
              {formatWeaknessSubtext(result.weaknessKind, result.weakElements)}
            </CardDescription>
          </div>
          {resultImage ? (
            <div className="mx-auto mt-[15px] w-full max-w-[320px] overflow-hidden rounded-2xl border border-border/60 bg-muted/20 p-2 md:mx-0 md:max-w-none">
              <div className="relative aspect-[2752/1536] w-full overflow-hidden rounded-xl">
                <Image
                  src={resultImage.src}
                  alt={resultImage.alt}
                  fill
                  sizes="(max-width: 768px) min(100vw - 4rem, 360px), (max-width: 1280px) 34vw, 360px"
                  className="object-contain object-center"
                />
              </div>
            </div>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pt-3">
        <div className="rounded-2xl bg-primary/5 px-4 py-3 text-sm leading-6 text-foreground">
          {result.interpretation}
        </div>
        <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border/70 bg-background px-4 py-3">
            <dt className="text-muted-foreground">이름</dt>
            <dd className="mt-1 font-medium text-foreground">{result.input.name}</dd>
          </div>
          <div className="rounded-xl border border-border/70 bg-background px-4 py-3">
            <dt className="text-muted-foreground">생년월일</dt>
            <dd className="mt-1 font-medium text-foreground">
              {result.userSummary.birthDateLabel}
            </dd>
          </div>
          <div className="rounded-xl border border-border/70 bg-background px-4 py-3">
            <dt className="text-muted-foreground">달력 기준</dt>
            <dd className="mt-1 font-medium text-foreground">
              {result.userSummary.calendarLabel}
            </dd>
          </div>
          <div className="rounded-xl border border-border/70 bg-background px-4 py-3">
            <dt className="text-muted-foreground">출생시간 반영</dt>
            <dd className="mt-1 font-medium text-foreground">
              {result.userSummary.birthTimeLabel}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

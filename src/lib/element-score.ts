import { ELEMENT_ORDER } from "@/lib/element-meta";
import type { ElementKey, ElementScore } from "@/types/saju";

// MVP 오행 매핑 규칙
// - 천간 1글자 = 1점
// - 지지 1글자 = 1점
// - 지장간, 월령 가중치, 용신/희신, 대운/세운은 이번 범위에서 제외합니다.
export const STEM_TO_ELEMENT = {
  갑: "wood",
  을: "wood",
  병: "fire",
  정: "fire",
  무: "earth",
  기: "earth",
  경: "metal",
  신: "metal",
  임: "water",
  계: "water",
} as const satisfies Record<string, ElementKey>;

export const BRANCH_TO_ELEMENT = {
  자: "water",
  축: "earth",
  인: "wood",
  묘: "wood",
  진: "earth",
  사: "fire",
  오: "fire",
  미: "earth",
  신: "metal",
  유: "metal",
  술: "earth",
  해: "water",
} as const satisfies Record<string, ElementKey>;

export function createEmptyElementScore(): ElementScore {
  return {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  };
}

export function getStemElement(stem: string): ElementKey {
  const element = STEM_TO_ELEMENT[stem as keyof typeof STEM_TO_ELEMENT];

  if (!element) {
    throw new Error(`알 수 없는 천간입니다: ${stem}`);
  }

  return element;
}

export function getBranchElement(branch: string): ElementKey {
  const element = BRANCH_TO_ELEMENT[branch as keyof typeof BRANCH_TO_ELEMENT];

  if (!element) {
    throw new Error(`알 수 없는 지지입니다: ${branch}`);
  }

  return element;
}

export function addElementPoint(
  score: ElementScore,
  key: ElementKey,
  point = 1,
): ElementScore {
  return {
    ...score,
    [key]: score[key] + point,
  };
}

export function getLowestElementKeys(
  score: ElementScore,
  maxCount = 2,
): ElementKey[] {
  const minScore = Math.min(...ELEMENT_ORDER.map((key) => score[key]));

  return ELEMENT_ORDER.filter((key) => score[key] == minScore).slice(0, maxCount);
}

export function getMinElementScore(score: ElementScore): number {
  return Math.min(...ELEMENT_ORDER.map((key) => score[key]));
}

export function getTotalLetters(score: ElementScore): number {
  return ELEMENT_ORDER.reduce((sum, key) => sum + score[key], 0);
}

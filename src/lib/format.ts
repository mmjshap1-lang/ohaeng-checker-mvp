import { ELEMENT_META } from "@/lib/element-meta";
import type { CalendarType, ElementKey, WeaknessKind } from "@/types/saju";

export function formatBirthDate(year: number, month: number, day: number) {
  return `${year}년 ${month}월 ${day}일`;
}

export function formatBirthTime(
  hour: number,
  minute: number,
  unknownBirthTime: boolean,
) {
  if (unknownBirthTime) {
    return "출생시간 모름 · 시주 제외";
  }

  return `${String(hour).padStart(2, "0")}시 ${String(minute).padStart(2, "0")}분`;
}

export function formatCalendarLabel(
  calendarType: CalendarType,
  isLeapMonth: boolean,
) {
  if (calendarType == "solar") {
    return "양력";
  }

  return isLeapMonth ? "음력 · 윤달" : "음력 · 평달";
}

export function formatElementLabel(key: ElementKey) {
  return ELEMENT_META[key].fullLabel;
}

export function formatElementList(keys: ElementKey[]) {
  return keys.map(formatElementLabel).join(", ");
}

export function formatWeaknessHeadline(
  weaknessKind: WeaknessKind,
  weakElements: ElementKey[],
) {
  const target = formatElementList(weakElements);
  const prefix =
    weaknessKind == "lacking"
      ? "당신에게 부족한 오행은"
      : "당신에게 상대적으로 약한 오행은";

  return `${prefix} ${target}입니다.`;
}

export function formatWeaknessSubtext(
  weaknessKind: WeaknessKind,
  weakElements: ElementKey[],
) {
  const target = formatElementList(weakElements);

  if (weaknessKind == "lacking") {
    return `현재 사주 구성에서는 ${target}의 기운이 비어 있거나 매우 적게 나타납니다.`;
  }

  return `현재 사주 구성에서는 ${target}의 기운이 상대적으로 약하게 나타납니다.`;
}

export function formatScoreFraction(score: number, totalLetters: number) {
  return `${score} / ${totalLetters}`;
}

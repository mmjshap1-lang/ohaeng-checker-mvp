import { calculateFourPillars } from "manseryeok";

import { ELEMENT_CONTENT } from "@/lib/element-content";
import {
  addElementPoint,
  createEmptyElementScore,
  getBranchElement,
  getLowestElementKeys,
  getMinElementScore,
  getStemElement,
  getTotalLetters,
} from "@/lib/element-score";
import {
  formatBirthDate,
  formatBirthTime,
  formatCalendarLabel,
  formatElementList,
} from "@/lib/format";
import type {
  AnalysisResult,
  CombinedElementContent,
  NormalizedFormResult,
  SajuFormErrors,
  SajuFormValues,
  SajuInput,
} from "@/types/saju";

const SAFE_UNKNOWN_TIME = {
  hour: 12,
  minute: 0,
};

function toInteger(value: string) {
  return Number.parseInt(value, 10);
}

function hasValue(value: string) {
  return value.trim().length > 0;
}

function getSolarDayMax(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function mergeUnique(items: string[], nextItems: string[], maxCount: number) {
  const merged = [...items];

  for (const item of nextItems) {
    if (merged.includes(item)) {
      continue;
    }

    merged.push(item);

    if (merged.length >= maxCount) {
      break;
    }
  }

  return merged;
}

export function getInitialFormValues(): SajuFormValues {
  return {
    name: "",
    gender: "male",
    calendarType: "solar",
    isLeapMonth: false,
    year: "",
    month: "",
    day: "",
    hour: "",
    minute: "",
    unknownBirthTime: false,
  };
}

export function validateSajuForm(values: SajuFormValues): SajuFormErrors {
  const errors: SajuFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "이름을 입력해주세요.";
  }

  if (!hasValue(values.year)) {
    errors.year = "연도를 입력해주세요.";
  } else {
    const year = toInteger(values.year);

    if (!Number.isInteger(year) || values.year.trim().length != 4) {
      errors.year = "연도는 4자리 숫자로 입력해주세요.";
    } else if (year < 1900 || year > 2100) {
      errors.year = "연도는 1900년부터 2100년 사이로 입력해주세요.";
    }
  }

  if (!hasValue(values.month)) {
    errors.month = "월을 입력해주세요.";
  } else {
    const month = toInteger(values.month);

    if (!Number.isInteger(month) || month < 1 || month > 12) {
      errors.month = "월은 1부터 12 사이로 입력해주세요.";
    }
  }

  if (!hasValue(values.day)) {
    errors.day = "일을 입력해주세요.";
  } else {
    const day = toInteger(values.day);
    const year = toInteger(values.year);
    const month = toInteger(values.month);

    if (!Number.isInteger(day) || day < 1) {
      errors.day = "일은 1 이상의 숫자로 입력해주세요.";
    } else if (!errors.year && !errors.month) {
      const maxDay =
        values.calendarType == "solar" ? getSolarDayMax(year, month) : 30;

      if (day > maxDay) {
        errors.day =
          values.calendarType == "solar"
            ? `입력한 월에는 ${maxDay}일까지 있어요.`
            : "음력 날짜는 1일부터 30일 사이로 입력해주세요.";
      }
    }
  }

  if (!values.unknownBirthTime) {
    if (!hasValue(values.hour)) {
      errors.hour = "출생 시간을 입력해주세요.";
    } else {
      const hour = toInteger(values.hour);

      if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
        errors.hour = "시간은 0부터 23 사이로 입력해주세요.";
      }
    }

    if (!hasValue(values.minute)) {
      errors.minute = "분을 입력해주세요.";
    } else {
      const minute = toInteger(values.minute);

      if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
        errors.minute = "분은 0부터 59 사이로 입력해주세요.";
      }
    }
  }

  return errors;
}

export function normalizeSajuForm(values: SajuFormValues): NormalizedFormResult {
  const errors = validateSajuForm(values);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hour = values.unknownBirthTime ? SAFE_UNKNOWN_TIME.hour : toInteger(values.hour);
  const minute = values.unknownBirthTime
    ? SAFE_UNKNOWN_TIME.minute
    : toInteger(values.minute);

  return {
    errors: {},
    data: {
      name: values.name.trim(),
      gender: values.gender,
      calendarType: values.calendarType,
      isLeapMonth: values.calendarType == "lunar" ? values.isLeapMonth : false,
      year: toInteger(values.year),
      month: toInteger(values.month),
      day: toInteger(values.day),
      hour,
      minute,
      unknownBirthTime: values.unknownBirthTime,
    },
  };
}

function combineElementContent(keys: AnalysisResult["weakElements"]): CombinedElementContent {
  const merged = keys.map((key) => ELEMENT_CONTENT[key]);
  const [first, ...rest] = merged;

  return rest.reduce<CombinedElementContent>(
    (accumulator, current) => ({
      fullLabel: `${accumulator.fullLabel}, ${current.fullLabel}`,
      summary: `${accumulator.summary} ${current.summary}`,
      wealth: `${accumulator.wealth} ${current.wealth}`,
      health: `${accumulator.health} ${current.health}`,
      relationship: `${accumulator.relationship} ${current.relationship}`,
      colors: mergeUnique(accumulator.colors, current.colors, 5),
      keywords: mergeUnique(accumulator.keywords, current.keywords, 6),
      tips: mergeUnique(accumulator.tips, current.tips, 4),
    }),
    {
      fullLabel: first.fullLabel,
      summary: first.summary,
      wealth: first.wealth,
      health: first.health,
      relationship: first.relationship,
      colors: [...first.colors],
      keywords: [...first.keywords],
      tips: [...first.tips],
    },
  );
}

export function analyzeSaju(input: SajuInput): AnalysisResult {
  try {
    const fourPillars = calculateFourPillars({
      year: input.year,
      month: input.month,
      day: input.day,
      hour: input.hour,
      minute: input.minute,
      isLunar: input.calendarType == "lunar",
      isLeapMonth: input.calendarType == "lunar" ? input.isLeapMonth : undefined,
    });

    const includedPillars = [fourPillars.year, fourPillars.month, fourPillars.day];

    // MVP 계산 규칙
    // - 연주 / 월주 / 일주의 천간 + 지지를 각각 1점으로 집계합니다.
    // - 출생시간을 모르면 시주는 계산에서 제외합니다.
    // - 출생시간을 모를 때도 라이브러리 계산을 위해 12:00을 넣지만,
    //   실제 점수와 판정에서는 시주를 사용하지 않습니다.
    if (!input.unknownBirthTime) {
      includedPillars.push(fourPillars.hour);
    }

    const score = includedPillars.reduce((currentScore, pillar) => {
      const stemElement = getStemElement(pillar.heavenlyStem);
      const branchElement = getBranchElement(pillar.earthlyBranch);

      return addElementPoint(addElementPoint(currentScore, stemElement), branchElement);
    }, createEmptyElementScore());

    const weakElements = getLowestElementKeys(score, 2);
    const weaknessKind = getMinElementScore(score) == 0 ? "lacking" : "weak";
    const combinedContent = combineElementContent(weakElements);
    const interpretation =
      weaknessKind == "lacking"
        ? `${formatElementList(weakElements)}의 기운이 현재 구성에서 비어 있거나 매우 적게 나타납니다.`
        : `${formatElementList(weakElements)}의 기운이 다른 오행보다 상대적으로 약하게 나타납니다.`;

    return {
      input,
      pillars: {
        year: {
          stem: fourPillars.year.heavenlyStem,
          branch: fourPillars.year.earthlyBranch,
          text: `${fourPillars.year.heavenlyStem}${fourPillars.year.earthlyBranch}`,
        },
        month: {
          stem: fourPillars.month.heavenlyStem,
          branch: fourPillars.month.earthlyBranch,
          text: `${fourPillars.month.heavenlyStem}${fourPillars.month.earthlyBranch}`,
        },
        day: {
          stem: fourPillars.day.heavenlyStem,
          branch: fourPillars.day.earthlyBranch,
          text: `${fourPillars.day.heavenlyStem}${fourPillars.day.earthlyBranch}`,
        },
        ...(input.unknownBirthTime
          ? {}
          : {
              hour: {
                stem: fourPillars.hour.heavenlyStem,
                branch: fourPillars.hour.earthlyBranch,
                text: `${fourPillars.hour.heavenlyStem}${fourPillars.hour.earthlyBranch}`,
              },
            }),
      },
      score,
      totalLetters: getTotalLetters(score),
      weakElements,
      weaknessKind,
      primaryElement: weakElements[0],
      combinedContent,
      interpretation,
      userSummary: {
        birthDateLabel: formatBirthDate(input.year, input.month, input.day),
        calendarLabel: formatCalendarLabel(input.calendarType, input.isLeapMonth),
        birthTimeLabel: formatBirthTime(
          input.hour,
          input.minute,
          input.unknownBirthTime,
        ),
        reflectsTime: !input.unknownBirthTime,
      },
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "사주 계산 중 알 수 없는 오류가 발생했습니다.";

    throw new Error(
      message.includes("음력") || input.calendarType == "lunar"
        ? "음력 날짜 또는 윤달 설정을 다시 확인해주세요. 입력값으로 사주를 계산하지 못했습니다."
        : "입력한 생년월일 또는 출생시간을 다시 확인해주세요. 사주를 계산하지 못했습니다.",
    );
  }
}

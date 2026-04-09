export type Gender = "male" | "female";
export type CalendarType = "solar" | "lunar";
export type WeaknessKind = "lacking" | "weak";
export type ElementKey = "wood" | "fire" | "earth" | "metal" | "water";

export interface SajuFormValues {
  name: string;
  gender: Gender;
  calendarType: CalendarType;
  isLeapMonth: boolean;
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  unknownBirthTime: boolean;
}

export interface SajuInput {
  name: string;
  gender: Gender;
  calendarType: CalendarType;
  isLeapMonth: boolean;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  unknownBirthTime: boolean;
}

export type SajuFormField =
  | "name"
  | "year"
  | "month"
  | "day"
  | "hour"
  | "minute";

export type SajuFormErrors = Partial<Record<SajuFormField, string>>;

export interface ElementScore {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

export interface ElementContent {
  key: ElementKey;
  labelKo: string;
  labelHanja: string;
  fullLabel: string;
  summary: string;
  wealth: string;
  health: string;
  relationship: string;
  colors: string[];
  keywords: string[];
  tips: string[];
}

export interface ElementMeta {
  key: ElementKey;
  labelKo: string;
  labelHanja: string;
  fullLabel: string;
  accent: string;
  soft: string;
}

export interface PillarDisplay {
  stem: string;
  branch: string;
  text: string;
}

export interface FourPillarDisplay {
  year: PillarDisplay;
  month: PillarDisplay;
  day: PillarDisplay;
  hour?: PillarDisplay;
}

export interface UserSummary {
  birthDateLabel: string;
  calendarLabel: string;
  birthTimeLabel: string;
  reflectsTime: boolean;
}

export interface CombinedElementContent {
  fullLabel: string;
  summary: string;
  wealth: string;
  health: string;
  relationship: string;
  colors: string[];
  keywords: string[];
  tips: string[];
}

export interface AnalysisResult {
  input: SajuInput;
  pillars: FourPillarDisplay;
  score: ElementScore;
  totalLetters: number;
  weakElements: ElementKey[];
  weaknessKind: WeaknessKind;
  primaryElement: ElementKey;
  combinedContent: CombinedElementContent;
  interpretation: string;
  userSummary: UserSummary;
}

export interface NormalizedFormResult {
  data?: SajuInput;
  errors: SajuFormErrors;
}

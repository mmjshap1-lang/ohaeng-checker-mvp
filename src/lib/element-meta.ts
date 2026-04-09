import type { ElementKey, ElementMeta } from "@/types/saju";

export const ELEMENT_ORDER: ElementKey[] = [
  "wood",
  "fire",
  "earth",
  "metal",
  "water",
];

export const ELEMENT_META: Record<ElementKey, ElementMeta> = {
  wood: {
    key: "wood",
    labelKo: "목",
    labelHanja: "木",
    fullLabel: "목(木)",
    accent: "#2f8f68",
    soft: "#ecfdf3",
  },
  fire: {
    key: "fire",
    labelKo: "화",
    labelHanja: "火",
    fullLabel: "화(火)",
    accent: "#ef6a57",
    soft: "#fff1ef",
  },
  earth: {
    key: "earth",
    labelKo: "토",
    labelHanja: "土",
    fullLabel: "토(土)",
    accent: "#b8863b",
    soft: "#fff7e6",
  },
  metal: {
    key: "metal",
    labelKo: "금",
    labelHanja: "金",
    fullLabel: "금(金)",
    accent: "#6b7280",
    soft: "#f3f4f6",
  },
  water: {
    key: "water",
    labelKo: "수",
    labelHanja: "水",
    fullLabel: "수(水)",
    accent: "#3b82f6",
    soft: "#eff6ff",
  },
};

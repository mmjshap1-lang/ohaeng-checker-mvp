import { ELEMENT_META } from "@/lib/element-meta";
import type { ElementContent, ElementKey } from "@/types/saju";

export const ELEMENT_CONTENT: Record<ElementKey, ElementContent> = {
  wood: {
    key: "wood",
    labelKo: ELEMENT_META.wood.labelKo,
    labelHanja: ELEMENT_META.wood.labelHanja,
    fullLabel: ELEMENT_META.wood.fullLabel,
    summary:
      "목의 기운은 성장, 확장, 시작하는 힘과 관련이 있습니다. 현재는 방향을 정하고 꾸준히 밀어붙이는 에너지가 다소 약하게 나타날 수 있습니다.",
    wealth:
      "재물 흐름에서는 기회를 넓게 보기보다 우선순위를 정리하고 장기적인 기준을 세우는 태도가 도움이 될 수 있습니다.",
    health:
      "건강 면에서는 몸을 굳히지 않도록 규칙적으로 움직이고 생활 리듬을 유연하게 유지하는 습관이 도움이 될 수 있습니다.",
    relationship:
      "관계에서는 먼저 마음을 열고 대화를 시작하는 작은 시도가 분위기를 부드럽게 만드는 데 도움이 될 수 있습니다.",
    colors: ["그린", "올리브", "세이지"],
    keywords: ["성장", "확장", "유연함", "시작"],
    tips: [
      "계획을 작게 나눠 바로 시작하기",
      "답답할수록 몸을 먼저 움직이기",
      "하고 싶은 말을 한 문장으로 정리해보기",
    ],
  },
  fire: {
    key: "fire",
    labelKo: ELEMENT_META.fire.labelKo,
    labelHanja: ELEMENT_META.fire.labelHanja,
    fullLabel: ELEMENT_META.fire.fullLabel,
    summary:
      "화의 기운은 활력과 표현력, 존재감을 드러내는 힘과 관련이 있습니다. 현재는 에너지를 밖으로 표현하는 흐름이 상대적으로 약하게 보일 수 있습니다.",
    wealth:
      "재물 흐름에서는 타이밍보다 준비된 실행이 중요하게 작용할 수 있어, 아이디어를 빠르게 정리하고 작게 실험해보는 태도가 도움이 될 수 있습니다.",
    health:
      "건강 면에서는 지나친 무기력감을 방치하지 않고 수면, 활동, 식사 리듬을 일정하게 유지하는 것이 도움이 될 수 있습니다.",
    relationship:
      "관계에서는 감정과 의사를 조금 더 분명하게 표현하는 연습이 이해의 간격을 줄이는 데 도움이 될 수 있습니다.",
    colors: ["코랄", "웜 레드", "피치"],
    keywords: ["활력", "표현", "온기", "시도"],
    tips: [
      "표현을 미루지 않기",
      "작은 약속이라도 즉시 실행하기",
      "몸을 덥히는 루틴 만들기",
    ],
  },
  earth: {
    key: "earth",
    labelKo: ELEMENT_META.earth.labelKo,
    labelHanja: ELEMENT_META.earth.labelHanja,
    fullLabel: ELEMENT_META.earth.fullLabel,
    summary:
      "토의 기운은 균형, 안정, 중심을 잡는 힘과 관련이 있습니다. 현재는 상황을 정리하고 버티는 감각이 상대적으로 가볍게 나타날 수 있습니다.",
    wealth:
      "재물 흐름에서는 속도보다 기준과 예산의 안정감을 만드는 것이 도움이 될 수 있습니다.",
    health:
      "건강 면에서는 식사 시간과 휴식 시간을 일정하게 유지하면서 몸의 기본 리듬을 돌보는 태도가 중요할 수 있습니다.",
    relationship:
      "관계에서는 상대의 속도에 휩쓸리기보다 내 기준을 차분히 전하는 태도가 안정감을 높이는 데 도움이 될 수 있습니다.",
    colors: ["베이지", "샌드", "카멜"],
    keywords: ["안정", "균형", "기준", "지속"],
    tips: [
      "생활 리듬을 일정하게 유지하기",
      "결정을 기록으로 남겨 기준 세우기",
      "한 번에 너무 많은 일을 벌이지 않기",
    ],
  },
  metal: {
    key: "metal",
    labelKo: ELEMENT_META.metal.labelKo,
    labelHanja: ELEMENT_META.metal.labelHanja,
    fullLabel: ELEMENT_META.metal.fullLabel,
    summary:
      "금의 기운은 정리, 판단, 선명한 기준과 관련이 있습니다. 현재는 경계를 세우고 불필요한 것을 덜어내는 힘이 다소 약하게 나타날 수 있습니다.",
    wealth:
      "재물 흐름에서는 선택지를 넓히기보다 지출과 우선순위를 명확하게 구분하는 태도가 도움이 될 수 있습니다.",
    health:
      "건강 면에서는 과로 후 회복을 미루지 않고 호흡과 컨디션 변화를 세심하게 살피는 습관이 도움이 될 수 있습니다.",
    relationship:
      "관계에서는 좋고 싫은 기준을 부드럽지만 분명하게 말하는 태도가 피로를 줄이는 데 도움이 될 수 있습니다.",
    colors: ["아이보리", "실버", "스톤 그레이"],
    keywords: ["정리", "판단", "기준", "선명함"],
    tips: [
      "불필요한 일정 줄이기",
      "중요한 기준 세 가지 적어두기",
      "말과 기록을 간결하게 정리하기",
    ],
  },
  water: {
    key: "water",
    labelKo: ELEMENT_META.water.labelKo,
    labelHanja: ELEMENT_META.water.labelHanja,
    fullLabel: ELEMENT_META.water.fullLabel,
    summary:
      "수의 기운은 흐름, 회복, 정보의 순환과 관련이 있습니다. 현재는 감정을 정리하고 여유를 확보하는 힘이 상대적으로 약하게 나타날 수 있습니다.",
    wealth:
      "재물 흐름에서는 성급한 판단보다 정보 정리와 균형 감각을 보완하는 것이 도움이 될 수 있습니다.",
    health:
      "건강 면에서는 휴식 리듬과 몸의 순환을 의식하는 습관이 중요할 수 있습니다.",
    relationship:
      "관계에서는 감정을 차분하게 정리하고 전달하는 태도가 도움이 될 수 있습니다.",
    colors: ["블루", "네이비", "차콜"],
    keywords: ["흐름", "균형", "안정", "회복"],
    tips: [
      "생각을 메모로 정리하기",
      "휴식 시간을 의도적으로 확보하기",
      "급한 결론보다 관찰 시간을 두기",
    ],
  },
};

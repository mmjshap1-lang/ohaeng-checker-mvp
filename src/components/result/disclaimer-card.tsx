import { CircleAlertIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function DisclaimerCard() {
  return (
    <Alert className="border-border/70 bg-background/80">
      <CircleAlertIcon />
      <AlertTitle>안내</AlertTitle>
      <AlertDescription>
        이 결과는 간단한 오행 균형 확인용입니다. 세부 명식 해석은 출생 정보와
        해석 기준에 따라 달라질 수 있습니다.
      </AlertDescription>
    </Alert>
  );
}

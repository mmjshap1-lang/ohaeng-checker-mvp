import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { NativeSelect } from "@/components/ui/native-select";
import type { SajuFormErrors, SajuFormValues } from "@/types/saju";

interface TimeFieldsProps {
  values: SajuFormValues;
  errors: SajuFormErrors;
  onChange: (field: "hour" | "minute", value: string) => void;
  onUnknownBirthTimeChange: (checked: boolean) => void;
}

export function TimeFields({
  values,
  errors,
  onChange,
  onUnknownBirthTimeChange,
}: TimeFieldsProps) {
  const hourOptions = Array.from({ length: 24 }, (_, index) =>
    String(index).padStart(2, "0"),
  );
  const minuteOptions = Array.from({ length: 60 }, (_, index) =>
    String(index).padStart(2, "0"),
  );

  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        <input
          id="unknown-birth-time"
          type="checkbox"
          checked={values.unknownBirthTime}
          className="size-4 rounded border border-input accent-[var(--color-primary)]"
          onChange={(event) => onUnknownBirthTimeChange(event.target.checked)}
        />
        출생시간 모름
      </label>

      <FieldGroup className="gap-3 md:grid md:grid-cols-2 md:gap-3">
        <Field data-invalid={Boolean(errors.hour)} data-disabled={values.unknownBirthTime}>
          <FieldLabel htmlFor="hour">시간</FieldLabel>
          <NativeSelect
            id="hour"
            value={values.hour}
            disabled={values.unknownBirthTime}
            aria-invalid={Boolean(errors.hour)}
            aria-describedby={errors.hour ? "hour-error" : undefined}
            onChange={(event) => onChange("hour", event.target.value)}
          >
            <option value="">시간 선택</option>
            {hourOptions.map((hour) => (
              <option key={hour} value={hour}>
                {hour}시
              </option>
            ))}
          </NativeSelect>
          <FieldError id="hour-error">{errors.hour}</FieldError>
        </Field>

        <Field
          data-invalid={Boolean(errors.minute)}
          data-disabled={values.unknownBirthTime}
        >
          <FieldLabel htmlFor="minute">분</FieldLabel>
          <NativeSelect
            id="minute"
            value={values.minute}
            disabled={values.unknownBirthTime}
            aria-invalid={Boolean(errors.minute)}
            aria-describedby={errors.minute ? "minute-error" : undefined}
            onChange={(event) => onChange("minute", event.target.value)}
          >
            <option value="">분 선택</option>
            {minuteOptions.map((minute) => (
              <option key={minute} value={minute}>
                {minute}분
              </option>
            ))}
          </NativeSelect>
          <FieldError id="minute-error">{errors.minute}</FieldError>
        </Field>
      </FieldGroup>
    </div>
  );
}

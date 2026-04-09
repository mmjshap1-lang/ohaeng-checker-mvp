import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { NativeSelect } from "@/components/ui/native-select";
import type { SajuFormErrors, SajuFormValues } from "@/types/saju";

interface DateFieldsProps {
  values: SajuFormValues;
  errors: SajuFormErrors;
  onChange: (field: "year" | "month" | "day", value: string) => void;
}

export function DateFields({ values, errors, onChange }: DateFieldsProps) {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, index) => String(currentYear - index),
  );
  const monthOptions = Array.from({ length: 12 }, (_, index) => String(index + 1));
  const isDayDisabled = !values.year || !values.month;
  const dayMax =
    values.calendarType == "lunar"
      ? 30
      : values.year && values.month
        ? new Date(Number(values.year), Number(values.month), 0).getDate()
        : 31;
  const dayOptions = Array.from({ length: dayMax }, (_, index) => String(index + 1));

  return (
    <FieldGroup className="gap-3 md:grid md:grid-cols-3 md:gap-3">
      <Field data-invalid={Boolean(errors.year)}>
        <FieldLabel htmlFor="year">연도</FieldLabel>
        <NativeSelect
          id="year"
          value={values.year}
          aria-invalid={Boolean(errors.year)}
          aria-describedby={errors.year ? "year-error" : undefined}
          onChange={(event) => onChange("year", event.target.value)}
        >
          <option value="">연도 선택</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </NativeSelect>
        <FieldError id="year-error">{errors.year}</FieldError>
      </Field>

      <Field data-invalid={Boolean(errors.month)}>
        <FieldLabel htmlFor="month">월</FieldLabel>
        <NativeSelect
          id="month"
          value={values.month}
          aria-invalid={Boolean(errors.month)}
          aria-describedby={errors.month ? "month-error" : undefined}
          onChange={(event) => onChange("month", event.target.value)}
        >
          <option value="">월 선택</option>
          {monthOptions.map((month) => (
            <option key={month} value={month}>
              {month}월
            </option>
          ))}
        </NativeSelect>
        <FieldError id="month-error">{errors.month}</FieldError>
      </Field>

      <Field data-invalid={Boolean(errors.day)}>
        <FieldLabel htmlFor="day">일</FieldLabel>
        <NativeSelect
          key={`${values.year}-${values.month}`}
          id="day"
          value={values.day}
          disabled={isDayDisabled}
          aria-invalid={Boolean(errors.day)}
          aria-describedby={errors.day ? "day-error" : undefined}
          onChange={(event) => onChange("day", event.target.value)}
        >
          <option value="">{isDayDisabled ? "연/월 먼저 선택" : "일 선택"}</option>
          {dayOptions.map((day) => (
            <option key={day} value={day}>
              {day}일
            </option>
          ))}
        </NativeSelect>
        <FieldError id="day-error">{errors.day}</FieldError>
      </Field>
    </FieldGroup>
  );
}

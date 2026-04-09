"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircleIcon, SparklesIcon } from "lucide-react";

import { ResultSection } from "@/components/result/result-section";
import { DateFields } from "@/components/saju/date-fields";
import { TimeFields } from "@/components/saju/time-fields";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import {
  analyzeSaju,
  getInitialFormValues,
  normalizeSajuForm,
} from "@/lib/saju";
import { cn } from "@/lib/utils";
import type { AnalysisResult, SajuFormValues } from "@/types/saju";

export function SajuForm() {
  const [values, setValues] = useState<SajuFormValues>(getInitialFormValues);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!result || !resultRef.current) {
      return;
    }

    resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [result]);

  const canShowLeapMonth = values.calendarType == "lunar";

  const updateValue = <Key extends keyof SajuFormValues>(
    key: Key,
    value: SajuFormValues[Key],
  ) => {
    setValues((current) => ({
      ...current,
      [key]: value,
      ...(key == "calendarType" && value == "solar" ? { isLeapMonth: false } : {}),
    }));

    if (key in errors) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key as string];
        return next;
      });
    }
  };

  const onChangeDateField = (field: "year" | "month" | "day", value: string) => {
    setValues((current) => {
      const next = {
        ...current,
        [field]: value,
      };

      if (field == "year" || field == "month") {
        return {
          ...next,
          day: "",
        };
      }

      return next;
    });

    setErrors((current) => {
      const next = { ...current };
      delete next[field];

      if (field == "year" || field == "month") {
        delete next.day;
      }

      return next;
    });
  };

  const onChangeTimeField = (field: "hour" | "minute", value: string) => {
    updateValue(field, value);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGeneralError(null);

    const normalized = normalizeSajuForm(values);

    if (!normalized.data) {
      setErrors(normalized.errors);
      setResult(null);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 180);
      });

      const nextResult = analyzeSaju(normalized.data);
      setResult(nextResult);
    } catch (error) {
      setResult(null);
      setGeneralError(
        error instanceof Error
          ? error.message
          : "입력값을 처리하는 중 오류가 발생했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <Card className="overflow-hidden border border-border/70 bg-card shadow-[0_20px_60px_-36px_rgba(15,23,42,0.35)]">
        <CardHeader className="border-b border-border/70 pb-4">
          <CardTitle className="text-lg font-semibold tracking-tight">
            입력 정보
          </CardTitle>
        </CardHeader>
        <form noValidate onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4 pt-4">
            <div className="rounded-2xl border border-border/70 bg-background px-3 py-3.5">
              <FieldSet>
                <FieldLegend className="mb-3 text-sm">기본 정보</FieldLegend>
                <div className="grid gap-3 md:grid-cols-4 md:items-start md:gap-3">
                  <Field data-invalid={Boolean(errors.name)}>
                    <FieldLabel htmlFor="name">이름</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      autoComplete="name"
                      className="h-10 w-full"
                      value={values.name}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      onChange={(event) => updateValue("name", event.target.value)}
                    />
                    {errors.name ? (
                      <p id="name-error" className="text-sm text-destructive" role="alert">
                        {errors.name}
                      </p>
                    ) : null}
                  </Field>

                  <Field>
                    <FieldLabel>성별</FieldLabel>
                    <div className="grid w-full grid-cols-2 gap-2">
                      <button
                        type="button"
                        className={cn(
                          "h-10 rounded-lg border text-sm font-medium transition-colors",
                          values.gender == "male"
                            ? "border-primary bg-primary/8 text-primary"
                            : "border-input bg-background text-foreground",
                        )}
                        aria-pressed={values.gender == "male"}
                        onClick={() => updateValue("gender", "male")}
                      >
                        남
                      </button>
                      <button
                        type="button"
                        className={cn(
                          "h-10 rounded-lg border text-sm font-medium transition-colors",
                          values.gender == "female"
                            ? "border-primary bg-primary/8 text-primary"
                            : "border-input bg-background text-foreground",
                        )}
                        aria-pressed={values.gender == "female"}
                        onClick={() => updateValue("gender", "female")}
                      >
                        여
                      </button>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel>달력 기준</FieldLabel>
                    <div className="grid w-full grid-cols-2 gap-2">
                      <button
                        type="button"
                        className={cn(
                          "h-10 rounded-lg border text-sm font-medium transition-colors",
                          values.calendarType == "solar"
                            ? "border-primary bg-primary/8 text-primary"
                            : "border-input bg-background text-foreground",
                        )}
                        aria-pressed={values.calendarType == "solar"}
                        onClick={() => updateValue("calendarType", "solar")}
                      >
                        양력
                      </button>
                      <button
                        type="button"
                        className={cn(
                          "h-10 rounded-lg border text-sm font-medium transition-colors",
                          values.calendarType == "lunar"
                            ? "border-primary bg-primary/8 text-primary"
                            : "border-input bg-background text-foreground",
                        )}
                        aria-pressed={values.calendarType == "lunar"}
                        onClick={() => updateValue("calendarType", "lunar")}
                      >
                        음력
                      </button>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="leap-month">윤달 여부</FieldLabel>
                    <NativeSelect
                      id="leap-month"
                      value={values.isLeapMonth ? "leap" : "regular"}
                      disabled={!canShowLeapMonth}
                      aria-label="윤달 여부 선택"
                      onChange={(event) => {
                        updateValue("isLeapMonth", event.target.value == "leap");
                      }}
                    >
                      <option value="regular">평달</option>
                      <option value="leap">윤달</option>
                    </NativeSelect>
                  </Field>
                </div>
              </FieldSet>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-background px-3 py-3.5">
                <FieldSet>
                  <FieldLegend className="mb-2 text-sm">생년월일</FieldLegend>
                  <DateFields
                    values={values}
                    errors={errors}
                    onChange={onChangeDateField}
                  />
                </FieldSet>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background px-3 py-3.5">
                <FieldSet>
                  <FieldLegend className="mb-2 text-sm">출생시간</FieldLegend>
                  <TimeFields
                    values={values}
                    errors={errors}
                    onChange={onChangeTimeField}
                    onUnknownBirthTimeChange={(checked) =>
                      updateValue("unknownBirthTime", checked)
                    }
                  />
                </FieldSet>
              </div>
            </div>

            {generalError ? (
              <Alert variant="destructive">
                <SparklesIcon />
                <AlertTitle>계산을 완료하지 못했어요</AlertTitle>
                <AlertDescription>{generalError}</AlertDescription>
              </Alert>
            ) : null}
          </CardContent>
          <CardFooter className="justify-end bg-muted/30 px-4 py-3">
            <Button
              type="submit"
              className="h-11 rounded-xl px-5 sm:min-w-44"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="animate-spin" data-icon="inline-start" />
                  계산 중입니다
                </>
              ) : (
                "부족 오행 조회하기"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {result ? (
        <div ref={resultRef}>
          <ResultSection result={result} />
        </div>
      ) : null}
    </div>
  );
}

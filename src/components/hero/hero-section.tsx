import Image from "next/image";

import { withBasePath } from "@/lib/asset-path";

const HERO_IMAGE = withBasePath("/hero.png");

export function HeroSection() {
  return (
    <section className="flex flex-col items-center gap-3 pt-0 text-center sm:pt-4">
      <div className="relative flex w-full max-w-3xl flex-col items-center gap-0">
        <Image
          src={HERO_IMAGE}
          alt="아미테라 오행 대표 이미지"
          width={166}
          height={166}
          className="-mb-3 rounded-3xl object-cover sm:hidden"
          priority
        />
        <div className="flex items-center justify-center">
          <h1 className="text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            아미테라 오행 (五行)
          </h1>
        </div>
        <Image
          src={HERO_IMAGE}
          alt="아미테라 오행 대표 이미지"
          width={130}
          height={130}
          className="pointer-events-none absolute top-[calc(50%-10px)] right-[130px] hidden size-24 -translate-y-1/2 object-cover sm:block md:size-28 lg:size-32"
          priority
        />
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          내게 부족한 오행을 확인해 보세요
        </p>
      </div>
    </section>
  );
}

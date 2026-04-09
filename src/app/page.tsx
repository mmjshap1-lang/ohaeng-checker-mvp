import { HeroSection } from "@/components/hero/hero-section";
import { PageShell } from "@/components/layout/page-shell";
import { SajuForm } from "@/components/saju/saju-form";

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <SajuForm />
    </PageShell>
  );
}

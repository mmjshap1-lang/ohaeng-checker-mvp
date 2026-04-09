import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbfcff_0%,#f5f7fb_100%)]">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pt-1 pb-8 sm:px-6 sm:pt-4 lg:px-8 lg:py-12">
        {children}
      </main>
    </div>
  );
}

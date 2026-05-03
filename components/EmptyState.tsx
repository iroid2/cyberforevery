import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 px-6 py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-100">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-400">{description}</p>
      {actionLabel && actionHref ? (
        <Button asChild className="mt-6">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}

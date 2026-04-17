import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowUpRight, Sparkles } from "lucide-react";

type Stat = {
  label: string;
  value: string;
  note: string;
};

type Action = {
  label: string;
  href?: string;
};

type FeedItem = {
  title: string;
  detail: string;
  time: string;
};

export function DashboardPageShell({
  eyebrow,
  title,
  description,
  stats,
  actions,
  feed,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  stats: Stat[];
  actions?: Action[];
  feed?: FeedItem[];
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col gap-6 bg-background px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-sm">
          <div className="border-b border-border/60 bg-muted/40 px-5 py-4 md:px-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="h-9 w-9 rounded-xl border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground md:hidden" />
                <div className="hidden rounded-xl border border-border/70 bg-background p-2 text-primary md:flex">
                  <SidebarTrigger className="h-8 w-8 rounded-lg bg-transparent text-primary hover:bg-accent hover:text-accent-foreground" />
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                  <Sparkles className="h-3 w-3" />
                  {eyebrow}
                </span>
              </div>
              <div className="flex items-center gap-3 self-start lg:self-auto">
                <AnimatedThemeToggler className="rounded-full border border-border bg-background p-2 text-muted-foreground transition hover:border-primary hover:text-primary" />
                <span className="hidden text-xs font-medium text-muted-foreground md:inline">
                  Workspace synced to your role and live platform data
                </span>
              </div>
            </div>
          </div>
          <div className="relative bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_26%),radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_24%)] px-5 py-6 md:px-7 md:py-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
                  {title}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                  {description}
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/90 px-4 py-3 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Workspace Status
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  Live dashboard shell for seeded lifecycle data
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {stat.label}
              </p>
              <div className="mt-6 flex items-end justify-between gap-4">
                <p className="text-4xl font-extrabold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/15 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  Live
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{stat.note}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-sm md:p-8">
            {children}
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Quick Actions
              </p>
              <div className="mt-5 space-y-3">
                {(actions ?? []).map((action) => (
                  <Link
                    key={action.label}
                    href={action.href ?? "#"}
                    className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/40 px-4 py-4 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:bg-accent hover:text-accent-foreground"
                  >
                    <span>{action.label}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Activity Feed
              </p>
              <div className="mt-5 space-y-4">
                {(feed ?? []).map((item) => (
                  <div
                    key={`${item.title}-${item.time}`}
                    className="rounded-2xl border border-border/70 bg-muted/40 px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold text-foreground">{item.title}</p>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                        {item.time}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function DashboardSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function PlaceholderGrid({
  items,
}: {
  items: {
    title: string;
    detail: string;
    meta: string;
  }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-2xl border border-border/70 bg-muted/40 p-5"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {item.meta}
          </p>
          <h3 className="mt-3 text-lg font-bold text-foreground">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

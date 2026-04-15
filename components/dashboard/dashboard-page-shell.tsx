import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowUpRight } from "lucide-react";

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
    <div className="min-h-screen bg-[#f7f9fb] px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="rounded-[1.5rem] border border-[#c6c5d4]/25 bg-white p-5 shadow-[0_20px_80px_-60px_rgba(26,35,126,0.35)] md:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="hidden rounded-2xl border border-[#c6c5d4]/30 bg-[#eef2ff] p-2.5 text-[#1a237e] md:flex">
                <SidebarTrigger className="h-10 w-10 rounded-xl bg-transparent text-[#1a237e] hover:bg-white" />
              </div>
              <div>
                <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1a237e]">
                  {eyebrow}
                </span>
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#191c1e] md:text-5xl">
                  {title}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5f6470] md:text-base">
                  {description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 self-start rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] px-3 py-3">
              <AnimatedThemeToggler className="rounded-full border border-[#c6c5d4]/40 bg-white p-2 text-slate-600 transition hover:border-[#1a237e]/30 hover:text-[#1a237e]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b7280]">
                Desktop sidebar can expand or collapse
              </span>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white p-6 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.25)]"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#6b7280]">
                {stat.label}
              </p>
              <div className="mt-6 flex items-end justify-between gap-4">
                <p className="text-4xl font-extrabold tracking-tight text-[#191c1e]">
                  {stat.value}
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#eef2ff] px-2.5 py-1 text-[11px] font-semibold text-[#1a237e]">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  Live
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#5f6470]">{stat.note}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[1.75rem] border border-[#c6c5d4]/25 bg-white p-6 shadow-[0_24px_90px_-70px_rgba(26,35,126,0.5)] md:p-8">
            {children}
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#6b7280]">
                Quick Actions
              </p>
              <div className="mt-5 space-y-3">
                {(actions ?? []).map((action) => (
                  <a
                    key={action.label}
                    href={action.href ?? "#"}
                    className="flex items-center justify-between rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] px-4 py-4 text-sm font-semibold text-[#191c1e] transition hover:border-[#1a237e]/25 hover:bg-[#eef2ff] hover:text-[#1a237e]"
                  >
                    <span>{action.label}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#6b7280]">
                Activity Feed
              </p>
              <div className="mt-5 space-y-4">
                {(feed ?? []).map((item) => (
                  <div
                    key={`${item.title}-${item.time}`}
                    className="rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold text-[#191c1e]">{item.title}</p>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a237e]">
                        {item.time}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#5f6470]">{item.detail}</p>
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
        <h2 className="text-2xl font-extrabold tracking-tight text-[#191c1e]">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#5f6470]">{description}</p>
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
          className="rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] p-5"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">
            {item.meta}
          </p>
          <h3 className="mt-3 text-lg font-bold text-[#191c1e]">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#5f6470]">{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

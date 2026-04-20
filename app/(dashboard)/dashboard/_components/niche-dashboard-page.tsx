import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

type DashboardConfig = {
  eyebrow: string;
  title: string;
  description: string;
  stats: {
    label: string;
    value: string;
    note: string;
  }[];
  actions?: {
    label: string;
    href?: string;
  }[];
  feed?: {
    title: string;
    detail: string;
    time: string;
  }[];
  highlights: {
    title: string;
    detail: string;
    meta: string;
  }[];
};

export function NicheDashboardPage(config: DashboardConfig) {
  return (
    <DashboardPageShell
      eyebrow={config.eyebrow}
      title={config.title}
      description={config.description}
      stats={config.stats}
      actions={config.actions}
      feed={config.feed}
    >
      <DashboardSection
        title="Operational Focus"
        description="This view is part of the cyber bootcamp dashboard refresh and is now centered on learners, cohorts, labs, and outcomes."
      >
        <PlaceholderGrid items={config.highlights} />
      </DashboardSection>
    </DashboardPageShell>
  );
}

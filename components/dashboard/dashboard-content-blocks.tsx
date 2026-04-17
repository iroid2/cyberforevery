type Tone = "indigo" | "emerald" | "amber" | "slate" | "rose";

type HighlightItem = {
  label: string;
  value: string;
  detail: string;
  tone?: Tone;
};

type TableColumn = {
  key: string;
  label: string;
  className?: string;
};

type TableRow = Record<string, string>;

type ListItem = {
  title: string;
  subtitle: string;
  meta: string;
  tone?: Tone;
};

type SettingItem = {
  label: string;
  value: string;
  enabled?: boolean;
};

function getToneClasses(tone: Tone = "slate") {
  switch (tone) {
    case "indigo":
      return "bg-[#eef2ff] text-[#1a237e] border-[#bdc2ff]";
    case "emerald":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "amber":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "rose":
      return "bg-rose-50 text-rose-700 border-rose-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export function HighlightCards({ items }: { items: HighlightItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] p-5"
        >
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${getToneClasses(item.tone)}`}
          >
            {item.label}
          </span>
          <p className="mt-4 text-3xl font-extrabold tracking-tight text-[#191c1e]">{item.value}</p>
          <p className="mt-2 text-sm leading-6 text-[#5f6470]">{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

export function RichTableCard({
  title,
  description,
  columns,
  rows,
}: {
  title: string;
  description: string;
  columns: TableColumn[];
  rows: TableRow[];
}) {
  return (
    <div className="rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white">
      <div className="border-b border-[#c6c5d4]/20 p-5 md:p-6">
        <h3 className="text-xl font-extrabold tracking-tight text-[#191c1e]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#5f6470]">{description}</p>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-[#c6c5d4]/20 bg-[#f7f9fb] text-left">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6b7280] ${column.className ?? ""}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c6c5d4]/15">
            {rows.map((row, index) => (
              <tr key={`${row[columns[0].key]}-${index}`} className="transition hover:bg-[#f7f9fb]">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-5 text-sm text-[#191c1e] ${column.className ?? ""}`}
                  >
                    {renderCell(row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 p-5 lg:hidden">
        {rows.map((row, index) => (
          <article
            key={`${row[columns[0].key]}-${index}`}
            className="rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] p-5"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {columns.map((column) => (
                <div key={column.key} className="rounded-xl border border-[#c6c5d4]/15 bg-white px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b7280]">
                    {column.label}
                  </p>
                  <div className="mt-2 text-sm text-[#191c1e]">{renderCell(row[column.key])}</div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function renderCell(value: string) {
  if (value.startsWith("status:")) {
    const status = value.replace("status:", "");
    const tone =
      status.toLowerCase().includes("active") || status.toLowerCase().includes("healthy")
        ? "emerald"
        : status.toLowerCase().includes("pending") || status.toLowerCase().includes("review")
          ? "amber"
          : status.toLowerCase().includes("risk") || status.toLowerCase().includes("overdue")
            ? "rose"
            : "slate";

    return (
      <span
        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${getToneClasses(tone)}`}
      >
        {status}
      </span>
    );
  }

  if (value.startsWith("progress:")) {
    const progress = value.replace("progress:", "");
    return (
      <div className="w-full max-w-[150px]">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[#5f6470]">
          <span>Progress</span>
          <span>{progress}</span>
        </div>
        <div className="h-2 rounded-full bg-[#e5e7eb]">
          <div className="h-2 rounded-full bg-[#000666]" style={{ width: progress }} />
        </div>
      </div>
    );
  }

  return value;
}

export function InsightPanels({
  items,
  title,
}: {
  title: string;
  items: ListItem[];
}) {
  return (
    <div className="rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white p-6">
      <h3 className="text-xl font-extrabold tracking-tight text-[#191c1e]">{title}</h3>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <article
            key={`${item.title}-${item.meta}`}
            className="rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-[#191c1e]">{item.title}</p>
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${getToneClasses(item.tone)}`}
              >
                {item.meta}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#5f6470]">{item.subtitle}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function SettingsPanel({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: SettingItem[];
}) {
  return (
    <div className="rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white p-6">
      <h3 className="text-xl font-extrabold tracking-tight text-[#191c1e]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#5f6470]">{description}</p>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] px-4 py-4"
          >
            <div>
              <p className="font-semibold text-[#191c1e]">{item.label}</p>
              <p className="mt-1 text-sm text-[#5f6470]">{item.value}</p>
            </div>
            <div
              className={`flex h-6 w-11 items-center rounded-full px-1 ${item.enabled ? "bg-[#000666]" : "bg-slate-300"}`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-white transition ${item.enabled ? "ml-auto" : ""}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

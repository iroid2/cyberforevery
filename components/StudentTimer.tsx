"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import { formatMinuteClock } from "@/lib/duration";

type Props = {
  onTick?: (seconds: number) => void;
};

export function StudentTimer({ onTick }: Props) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSeconds((current) => {
        const next = current + 1;
        onTick?.(next);
        return next;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [onTick]);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600">
      <Clock3 className="h-3.5 w-3.5 text-slate-500" />
      <span className="font-mono text-sm font-semibold tabular-nums text-slate-700">
        {formatMinuteClock(seconds)}
      </span>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Clock3, Loader2, Radio } from "lucide-react";
import { endSessionInstance, syncSessionInstanceDuration } from "@/app/actions/sessions";
import { formatClock } from "@/lib/duration";

type Props = {
  sessionId: string;
  initialSeconds?: number | null;
  size?: "sm" | "lg";
};

export function SessionTimer({ sessionId, initialSeconds, size = "sm" }: Props) {
  const [seconds, setSeconds] = useState(Math.max(0, initialSeconds ?? 0));
  const [isEnding, startTransition] = useTransition();
  const syncInFlight = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSeconds((current) => {
        const next = current + 1;

        if (next % 60 === 0 && !syncInFlight.current) {
          syncInFlight.current = true;
          void syncSessionInstanceDuration(sessionId, next)
            .catch(() => {
              // Keep the local timer moving even if persistence blips.
            })
            .finally(() => {
              syncInFlight.current = false;
            });
        }

        return next;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [sessionId]);

  const handleEnd = () => {
    startTransition(async () => {
      await endSessionInstance(sessionId, seconds);
      router.refresh();
    });
  };

  if (size === "lg") {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-70" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-500" />
          </span>
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
              <Radio className="h-3.5 w-3.5" />
              Session live
            </p>
            <p className="mt-1 flex items-center gap-2 font-mono text-2xl font-bold tracking-[0.12em] text-rose-700">
              <Clock3 className="h-5 w-5 shrink-0" />
              {formatClock(seconds)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleEnd}
          disabled={isEnding}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isEnding ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Ending...
            </>
          ) : (
            "End Session"
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 shadow-sm">
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-70" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
      </span>
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
        <Clock3 className="h-3.5 w-3.5" />
        {formatClock(seconds)}
      </span>
      <button
        type="button"
        onClick={handleEnd}
        disabled={isEnding}
        className="inline-flex items-center justify-center rounded-full bg-rose-600 px-3 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isEnding ? <Loader2 className="h-3 w-3 animate-spin" /> : "End"}
      </button>
    </div>
  );
}

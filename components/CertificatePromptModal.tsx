"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { requestCertificate } from "@/app/actions/certificates";
import { Loader2, CheckCircle } from "lucide-react";

export function CertificatePromptModal({
  submissionId,
  onSent,
}: {
  submissionId: string;
  onSent?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      try {
        await requestCertificate(submissionId, email);
        setSent(true);
        onSent?.();
        // Refresh page to reveal score
        router.refresh();
      } catch (err: any) {
        setError(err.message ?? "Failed to send certificate");
      }
    });
  };

  const handleSkip = () => {
    // Skip without email; reveal score by refreshing
    router.refresh();
  };

  if (sent) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div className="text-center py-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Certificate Sent!</h3>
            <p className="mt-2 text-sm text-slate-600">
              Your certificate has been sent to <strong>{email}</strong>. You can now view your score below.
            </p>
            <button
              onClick={() => router.refresh()}
              className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-bold text-slate-900">Get Your Certificate</h3>
        <p className="mt-2 text-sm text-slate-600">
          Congratulations! Enter your email to receive a certificate of completion.
        </p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Send Certificate
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { TopNavBar } from "@/components/top-nav-bar";
import { MainFooter } from "@/components/main-footer";
import { setPassword } from "@/app/actions/set-password";

export default function SetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";
  const [password, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("Missing setup token.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.set("token", token);
    formData.set("password", password);

    const result = await setPassword(formData);
    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Unable to set password.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/login"), 1500);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavBar />
      <main className="flex min-h-screen items-center justify-center px-6 py-32">
        <div className="w-full max-w-lg rounded-[2rem] border border-border bg-surface/70 p-8 shadow-2xl dark:bg-surface/40">
          <span className="mb-4 block font-headline text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
            // ACCOUNT_SETUP
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tighter md:text-4xl">
            Set Your Password
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Create a secure password to activate your cyber4every1 parent account.
          </p>

          {success ? (
            <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/10 p-5 text-sm text-foreground">
              Password set successfully. Redirecting you to login.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPasswordValue(event.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-4 text-sm outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-4 text-sm outline-none transition focus:border-primary"
                />
              </div>

              {error ? (
                <div className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-primary px-6 py-4 text-sm font-black uppercase tracking-[0.24em] text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Activate Account"}
              </button>
            </form>
          )}

          <div className="mt-8 text-center text-xs uppercase tracking-[0.22em] text-muted">
            <Link href="/login" className="transition hover:text-primary">
              Return to Login
            </Link>
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
}

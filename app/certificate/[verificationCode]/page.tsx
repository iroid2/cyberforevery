import Link from "next/link";
import { notFound } from "next/navigation";
import { getCertificateByVerificationCode } from "@/lib/services/enrollments";

export default async function CertificateVerificationPage({
  params,
}: {
  params: Promise<{ verificationCode: string }>;
}) {
  const { verificationCode } = await params;
  const certificate = await getCertificateByVerificationCode(verificationCode);

  if (!certificate) {
    notFound();
  }

  const learnerName = `${certificate.student.firstName} ${certificate.student.lastName}`;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(191,255,0,0.12),_transparent_30%),linear-gradient(180deg,_#06111f_0%,_#0b1729_45%,_#101d33_100%)] px-4 py-10 text-white md:px-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_25px_90px_-60px_rgba(191,255,0,0.45)] backdrop-blur md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#bfff00]">
                Verified Certificate
              </p>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
                {certificate.courseTitle}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
                This certificate confirms that {learnerName} successfully completed the learning requirements for {certificate.cohortName} on{" "}
                {new Date(certificate.issuedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm">
              <div className="font-semibold text-white">Certificate Number</div>
              <div className="mt-1 text-white/70">{certificate.certificateNumber}</div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Metric label="Learner" value={learnerName} />
            <Metric label="Cohort" value={certificate.cohortName} />
            <Metric label="Status" value={certificate.status} />
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-[#bfff00]/20 bg-[#bfff00]/10 p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#dfff82]">
              Verification Code
            </p>
            <p className="mt-3 break-all text-lg font-semibold tracking-[0.08em] text-white">
              {certificate.verificationCode}
            </p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Issued by {certificate.issuedBy?.name ?? "cyber4every1"} and linked directly to the platform enrollment record for audit and verification.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex rounded-full bg-[#bfff00] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#09111d] transition hover:bg-[#d6ff69]"
            >
              Back to site
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">{label}</p>
      <p className="mt-3 text-lg font-bold text-white">{value}</p>
    </div>
  );
}

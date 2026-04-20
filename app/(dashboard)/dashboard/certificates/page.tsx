import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function CertificatesPage() {
  return (
    <NicheDashboardPage
      eyebrow="Credential issuance"
      title="Certificates"
      description="Review completion status, prepare learner credentials, and track published recognition across the program."
      stats={[
        { label: "Ready To Issue", value: "19", note: "Learners meeting requirements for certificate release." },
        { label: "Issued This Term", value: "47", note: "Certificates published during the current delivery cycle." },
        { label: "Awaiting Review", value: "06", note: "Learners close to sign-off but still under validation." },
        { label: "Verification Requests", value: "08", note: "External checks or learner retrievals completed recently." },
      ]}
      actions={[
        { label: "Check progress", href: "/dashboard/progress" },
        { label: "Open roster", href: "/dashboard/roster" },
      ]}
      feed={[
        { title: "Credential batch prepared", detail: "The next group of learner certificates is ready for publishing.", time: "17m ago" },
        { title: "Verification lookup completed", detail: "A recent certificate was validated through the public checker.", time: "2h ago" },
      ]}
      highlights={[
        { title: "Release quality", detail: "Certificates should only move forward after milestone validation.", meta: "Quality" },
        { title: "Learner recognition", detail: "Published credentials provide visible proof of achievement.", meta: "Recognition" },
        { title: "Verification hygiene", detail: "Keep retrieval and verification pathways reliable.", meta: "Trust" },
        { title: "Program outcomes", detail: "Credential issuance is one of the clearest success indicators.", meta: "Impact" },
      ]}
    />
  );
}

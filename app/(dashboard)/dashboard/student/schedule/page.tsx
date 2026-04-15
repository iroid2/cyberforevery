import { redirect } from "next/navigation";

export default async function LegacyStudentSchedulePage() {
  redirect("/dashboard/schedule");
}

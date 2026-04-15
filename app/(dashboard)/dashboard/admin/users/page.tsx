import { redirect } from "next/navigation";

export default async function AdminUsersDashboardPage() {
  redirect("/dashboard/user-management");
}

import { cookies } from "next/headers";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Admin | AutoMentés",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = (await cookies()).get("admin_session")?.value === "1";
  if (!session) {
    return <AdminLoginForm />;
  }
  return <AdminDashboard />;
}

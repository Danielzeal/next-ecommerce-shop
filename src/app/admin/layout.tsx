import AdminHeader from "@/components/admin/AdminHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UniqHub - Admin",
  description: "Your everyday shop admin session",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=''>
      <AdminHeader />
      <main className='w-full'>{children}</main>
    </div>
  );
}

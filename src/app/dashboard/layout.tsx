import { ModeToggle } from "@/components/ModeToggle";
import Sidebar from "@/components/sections/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <ModeToggle />
      <Sidebar />
      {children}
    </section>
  );
}

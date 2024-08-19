import Sidebar from "@/components/sections/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <section className="grid grid-cols-[20%_80%] h-screen">
        <Sidebar />
        {children}
      </section>
    </section>
  );
}

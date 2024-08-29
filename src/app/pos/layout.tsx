import { Sidebar } from "@/components/panel/sidebar";

export default function PosLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <>
      <Sidebar></Sidebar>
      <main className="min-h-screen transition-[margin-left] ease-in-out duration-300 lg:ml-[70px]">
        { children }
      </main>
    </>
  );
}
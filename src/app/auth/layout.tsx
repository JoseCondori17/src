export default function AuthLayout({ children }: Readonly<{ children : React.ReactNode}>) {
  return (
    <main className="grid w-full grid-cols-1 lg:grid-cols-2 min-h-screen">
      <section className="hidden lg:block bg-slate-700">
      </section>
      <section className="flex items-center justify-center">
        { children }
      </section>
    </main>
  );
}
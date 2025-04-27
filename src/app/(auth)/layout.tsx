export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container flex min-h-svh flex-col items-center justify-center gap-6 py-6">
      {children}
    </main>
  );
}

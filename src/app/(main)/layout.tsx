export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container py-6">{children}</main>;
}

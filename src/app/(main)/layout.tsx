import { Header } from "@/widgets/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container py-6">{children}</main>
    </>
  );
}

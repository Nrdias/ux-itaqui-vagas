import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/ui/BackButton";

export const metadata: Metadata = {
  title: "Itaqui Vagas - Encontre seu próximo emprego",
  description: "Plataforma para conectar empresas e profissionais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning={true}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <BackButton />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

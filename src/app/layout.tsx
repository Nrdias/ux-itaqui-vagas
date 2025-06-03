import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/ui/BackButton";

export const metadata: Metadata = {
  title: "Itaqui Vagas - Encontre seu próximo emprego",
  description: "Plataforma para conectar empresas e profissionais",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body suppressHydrationWarning={true} className="safe-area-top safe-area-bottom">
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

import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers'
import { Navigation } from '@/components/Navigation'

export const metadata: Metadata = {
  title: "Avukat Portalı - Lawyer Portal",
  description: "Modern, güvenli ve KVKK uyumlu avukat bürosu yönetim sistemi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="font-sans antialiased">
        <Providers locale="tr">
          {children}
          <Navigation />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";


export const metadata: Metadata = {
  title: "Member87 image uploader",
  description: "Opensource image uploader",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="min-h-screen bg-white text-zinc-900">{children}</body>
    </html>
  );
}

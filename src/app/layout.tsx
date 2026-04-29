import type { Metadata } from "next";
import "../SCSS/global.scss";

export const metadata: Metadata = {
  title: "Libreria Inteligente",
  description: "Libreria inteligente con Next.js y Open Library API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

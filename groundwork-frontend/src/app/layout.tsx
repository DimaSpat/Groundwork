import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Groundwork",
  description:
    "Groundwork is a tool for managing and automating your construction environment.",
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

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "nmi-devops-shared-components/styles.css";

export const metadata: Metadata = {
  title: "NMI DevOps Shared Components",
  description:
    "Installation, setup, and operational guidance for shared GNO React components and integrations.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

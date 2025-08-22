import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Cohabs Chat MVP",
  description: "Ask questions about Cohabs and get quick answers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container py-8">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">
              Cohabs Chat <span className="text-brand">MVP</span>
            </h1>
            <p className="text-sm text-gray-500">
              Ask a question and get an instant answer. If we can not help, we
              will notify a teammate.
            </p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

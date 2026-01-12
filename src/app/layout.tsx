import type { Metadata } from "next";
import "./globals.css";
import React from 'react';
import CustomCursor from '@/components/ui/CustomCursor';

export const metadata: Metadata = {
  title: "Sushma Thapa - Portfolio",
  description: "Personal portfolio of Sushma Thapa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-purple-500/30 selection:text-purple-200">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

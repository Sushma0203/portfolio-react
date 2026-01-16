import type { Metadata } from "next";
import "./globals.css";
import React from 'react';
import CustomCursor from '@/components/ui/CustomCursor';
import ParticleBackground from '@/components/ParticleBackground';

export const metadata: Metadata = {
  title: "Sushma Thapa - Portfolio",
  description: "Personal portfolio of Sushma Thapa",
};

export const runtime = 'edge';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased selection:bg-purple-500/30 selection:text-purple-200">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedMode = localStorage.getItem('theme');
                  var isDark = savedMode ? savedMode === 'dark' : true;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}

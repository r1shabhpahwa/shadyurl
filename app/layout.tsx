import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ProgressBar } from "@/components/progress-bar";
import { UI_CONFIG } from "@/config/ui";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: UI_CONFIG.metadata.title,
  description: UI_CONFIG.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProgressBar />
        <Toaster
          position="bottom-center"
          theme="dark"
          richColors
        />
        {children}
      </body>
    </html>
  );
}

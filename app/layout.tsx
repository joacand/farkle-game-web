import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farkle",
  description: "Farkle game.",
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
        <div className="flex flex-col items-center p-5 gap-4 w-full h-screen bg-[#212121]">
          <Header />
          <div className="flex flex-row px-4 p-4 gap-4 relative w-full max-w-[1400px] h-screen bg-[#723e11] rounded-md text-l text-gray-100 tracking-tight">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

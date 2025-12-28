import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import { AuthProvider } from "./Components/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farkle Dice Game",
  description: "Play Farkle, the dice game featured in Kingdom Come: Deliverance. Single-player and multiplayer support.",
  keywords: [
    "Farkle",
    "dice game",
    "Kingdom Come Deliverance",
    "online Farkle",
    "play Farkle online",
    "dice game online",
    "single player",
    "multiplayer"
  ],
  authors: [{ name: "joacand" }],
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
        <AuthProvider>
          <div className="flex flex-col items-center p-5 gap-4 w-full h-screen bg-[#212121]">
            <Header />
            <div className="flex flex-1 w-full justify-center overflow-hidden">
              <div className="flex flex-row px-4 p-4 gap-4 relative w-full max-w-[1400px] h-full bg-[#723e11] rounded-md text-l text-gray-100 tracking-tight">
                {children}
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

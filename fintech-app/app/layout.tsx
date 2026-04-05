import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Storio Bank",
  description: "Your integrated financial system",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-black text-white antialiased">
        <div className="min-h-screen flex flex-col items-center justify-start bg-black">
          <div className="w-full max-w-[400px] min-h-screen flex flex-col relative">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

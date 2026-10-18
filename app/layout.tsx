import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "For You, Mithra ❤️",
  description: "A little world just for you.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#FFF5F7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--color-pink-soft)] selection:text-[var(--color-rose-deep)]">
        {children}
      </body>
    </html>
  );
}
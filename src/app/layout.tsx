import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import SessionProvider from '@/components/SessionProvider';
import "./globals.scss";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "500", "600", "700", "800"],
}); // Title font

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
}); // Main font

export const metadata: Metadata = {
  title: "Noire Detective Game",
  keywords: [
    "detective",
    "mystery",
    "game",
    "interactive",
    "noire",
    "AI"
  ],
  authors: [
    {
      name: "Vadym Orlov",
    }
  ],
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${nunito.variable} antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

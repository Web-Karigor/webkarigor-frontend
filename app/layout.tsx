import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/home/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Webkarigor - Company Website",
  description: "Webkarigor Company Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden scroll-smooth bg-[#FFFDF6]`}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}

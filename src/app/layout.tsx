import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

import GoogleProvider from "@/components/GoogleProvider";

export const metadata: Metadata = {
  title: "Blooming Sparrow — Handcrafted Indian Art",
  description: "Discover exquisite handcrafted Indian art — Rogan Art, Lacquerer Art, Bell Art, Leather Toys, Shola Art, Bird Making and Leather Bags.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-[#FAFAFA] text-[#111] antialiased flex">
        <GoogleProvider>
          <Sidebar />
          <div className="flex-1 min-w-0 min-h-screen">
            <TopBar />
            {children}
            <Footer />
          </div>
        </GoogleProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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
      <body className={`font-sans bg-[#fcf7f3] text-[#202025] antialiased`}>
        <GoogleProvider>
          <SiteHeader />
          {children}
          <Footer />
          <WhatsAppButton />
        </GoogleProvider>
      </body>
    </html>
  );
}

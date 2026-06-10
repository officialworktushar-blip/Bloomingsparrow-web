import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body>
        <Sidebar />
        <div className="main">
          <TopBar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

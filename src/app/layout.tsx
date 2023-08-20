import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OmjiHub",
  description: "Your everyday shop for fashion wears",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <main className='flex-grow'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

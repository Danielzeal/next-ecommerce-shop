import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import AuthProvider from "@/Provider/AuthProvider";
import QueryProvider from "@/Provider/QueryProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "UniQHub",
  description: "Your everyday shop for fashion wears",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${montserrat.className}`}>
        <AuthProvider>
          <QueryProvider>
            <div className='flex flex-col min-h-screen'>
              <Header />
              <main className='flex-grow bg-gray-300'>{children}</main>
              <Footer />
            </div>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

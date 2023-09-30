import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Lora } from "next/font/google";
import AuthProvider from "@/Provider/AuthProvider";
import QueryProvider from "@/Provider/QueryProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic", "normal"],
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "UniqHub",
  description: "Your everyday shop for fashion wears",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${montserrat.className} ${lora.variable}`}>
        <AuthProvider>
          <QueryProvider>
            <div className='flex flex-col min-h-screen'>
              <Header />
              <main className='flex-grow bg-gray-300'>{children}</main>
              <ToastContainer />
              <Footer />
            </div>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import AuthProvider from "@/providers/AuthProvider";
import RentModal from "@/components/modals/rentModal/RentModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "A clone of Airbnb's website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <AuthProvider>
          <Navbar />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <ToasterProvider />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

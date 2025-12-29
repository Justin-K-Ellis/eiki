import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";
import SigninSignup from "@/components/SigninSignup";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eiki",
  description: "英記",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen justify-between`}
        >
          <NextIntlClientProvider>
            <SignedOut>
              <main className="w-11/12 md:w-6/10 mx-auto">
                <SigninSignup />
              </main>
            </SignedOut>
            <SignedIn>
              <Navbar />
              <main className="w-11/12 md:w-6/10 h-full mx-auto">
                {children}
              </main>
            </SignedIn>
          </NextIntlClientProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

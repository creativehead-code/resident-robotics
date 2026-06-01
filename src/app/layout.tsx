import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Inter — used in the hero to match the Figma spec exactly.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-inter",
  display: "swap",
});

// Premium pairing: Clash Display (headings) + General Sans (body/UI).
const clash = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-display",
  weight: "200 700",
  display: "swap",
});

const general = localFont({
  src: "./fonts/GeneralSans-Variable.woff2",
  variable: "--font-body",
  weight: "200 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resident Robotics Program — My Equation",
  description:
    "A fully offline, hands-on robotics residency. Build real robots on real hardware with ROS2 — the industry-standard stack behind Tesla, ABB and KUKA. Internship included.",
  openGraph: {
    title: "Resident Robotics Program — My Equation",
    description:
      "Learn robotics the right way. Offline. Hands-on. Built on real hardware.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${clash.variable} ${general.variable} ${inter.variable} h-full`}>
      <body className="min-h-full antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

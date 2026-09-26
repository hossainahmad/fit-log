import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { PlanProvider } from "@/context/PlanContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FitLog | Workout Library",
  description:
    "Browse workouts, build today's training plan, and track your daily lifts with FitLog.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PlanProvider>
          <Navbar></Navbar>
          <main className="flex-1">{children}</main>
          <Footer></Footer>
        </PlanProvider>
      </body>
    </html>
  );
}

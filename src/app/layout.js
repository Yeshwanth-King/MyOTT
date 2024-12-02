import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "./components/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "My Ott",
  description: "Generated by create next app",
};
const links = [
  { name: "Home", href: "/home" },
  { name: "Movies", href: "/home/movies" },
  { name: "Recently Added", href: "/home/recently" },
  { name: "My List", href: "/home/list" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar links={links} />
        <Toaster duration={1000} position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}

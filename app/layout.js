"use client";
import { Inter } from "next/font/google";

import FiltersContext from "@/store/FilterContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FiltersContext>{children}</FiltersContext>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DexTrendings - Gentleman's DeFi Intelligence",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css"; // Make sure SF Pro is defined in this file
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Juno",
  description: "AI interviewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sf antialiased bg-black">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

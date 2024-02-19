import type { Metadata } from "next";
import App from "./app";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gloria Gates Care",
  description: "Gloria Gates Care App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}

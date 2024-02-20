import type { Metadata } from "next";
import type { Viewport } from "next";
import App from "./app";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gloria Gates Care",
  description: "Gloria Gates Care App",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
  maximumScale: 1,
  userScalable: false,
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

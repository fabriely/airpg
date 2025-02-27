import type { Metadata } from "next";
import NextAuthSessionProvider from "providers/sessionProvider";

import "styles/globals.css";

export const metadata: Metadata = {
  title: "AIRPG",
  description: "A simple boilerplate for next.js",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthSessionProvider>
    <html>
      <head>
      <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;700&family=Grenze+Gotisch:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
    </NextAuthSessionProvider>
  );
}
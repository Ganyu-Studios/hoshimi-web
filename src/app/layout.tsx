import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Noto_Sans_JP, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const body = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hoshimi.dev"),
  title: {
    default: "Hoshimi Docs",
    template: "%s | Hoshimi Docs",
  },
  description:
    "A stylish and typed Lavalink v4 client. Learn how to build music bots with Hoshimi.",
  openGraph: {
    title: "Hoshimi Docs",
    description:
      "A stylish and typed Lavalink v4 client. Learn how to build music bots with Hoshimi.",
    type: "website",
    siteName: "Hoshimi Docs",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

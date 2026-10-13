import { DM_Serif_Display, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./gammaura.css";
import Script from "next/script";
import ClientLayout from "@/components/ClientLayout";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://gammaura.codes"),
  title: "Arditya Adjie Rosandi — Full-Stack Developer & IT Project Manager",
  description: "Portofolio profesional Arditya Adjie Rosandi (Gammaura) — Full-Stack Developer & IT Project Manager berpengalaman membangun aplikasi skala produksi modern.",
  keywords: [
    "Arditya Adjie Rosandi",
    "Gammaura",
    "Full-Stack Developer",
    "IT Project Manager",
    "Software Engineer Portfolio",
    "Next.js Developer Indonesia",
    "Python AI Engineer",
    "Esa Unggul",
  ],
  authors: [{ name: "Arditya Adjie Rosandi", url: "https://github.com/Gammaura" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="antialiased min-h-screen">
        <ClientLayout>{children}</ClientLayout>
        <Script src="/assets/i18n.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

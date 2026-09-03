import { Geist, Geist_Mono, Instrument_Serif, Plus_Jakarta_Sans, Syne, Space_Grotesk, Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  metadataBase: new URL("https://gammaura.codes"),
  title: "Arditya Adjie Rosandi (Gammaura) | Full-Stack Developer & IT Project Manager",
  description: "Portofolio profesional Arditya Adjie Rosandi (Gammaura) — Mahasiswa Teknik Informatika UEU dengan IPK 3.84, berpengalaman memimpin tim dan membangun 12+ aplikasi skala produksi (Next.js, Python, Streamlit, Laravel, Unity).",
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
  openGraph: {
    title: "Arditya Adjie Rosandi (Gammaura) — Full-Stack Developer & IT Project Manager",
    description: "Koleksi 12+ karya proyek web full-stack, AI chatbot, game 2D, dan sistem informasi terintegrasi.",
    url: "https://gammaura.codes",
    siteName: "Gammaura Portfolio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Arditya Adjie Rosandi Portfolio Social Card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arditya Adjie Rosandi (Gammaura) — Portfolio",
    description: "Full-Stack Developer & IT Project Manager | IPK 3.84",
    images: ["/api/og"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${plusJakartaSans.variable} ${syne.variable} ${spaceGrotesk.variable} ${outfit.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

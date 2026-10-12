import "./globals.css";
import "./xaviera.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  metadataBase: new URL("https://gammaura.codes"),
  title: "Arditya Adjie Rosandi — Full-Stack Developer & IT Project Manager",
  description: "Portofolio profesional Arditya Adjie Rosandi (Gammaura) — Mahasiswa Teknik Informatika UEU dengan IPK 3.84, berpengalaman memimpin tim dan membangun aplikasi skala produksi.",
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
    <html lang="id" className="antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

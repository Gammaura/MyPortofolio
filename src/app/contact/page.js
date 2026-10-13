import React from "react";
import { getCVData } from "../actions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const data = await getCVData();
  return {
    title: `Contact & Collaboration — ${data?.profile?.name || "Arditya Adjie Rosandi"}`,
    description: `Hubungi ${data?.profile?.name || "Arditya Adjie Rosandi"} untuk peluang magang, kolaborasi proyek, dan rekayasa perangkat lunak.`,
  };
}

export default async function ContactPage() {
  const data = await getCVData();
  const profile = data?.profile || {
    email: "ardityaa.id@gmail.com",
    linkedin: "https://www.linkedin.com/in/ardityaadjierosandi",
    github: "https://github.com/Gammaura",
    phone: "+62 877-1795-6553",
    name: "Arditya Adjie Rosandi"
  };

  const whatsappLink = `https://wa.me/${(profile.phone || "+62 877-1795-6553").replace(/[^0-9]/g, "")}`;

  return (
    <div className="min-h-screen relative flex flex-col" style={{ background: "var(--page-bg, #fff9f1)", color: "var(--page-ink, #17201c)" }}>
      <Navbar />
      <main className="flex-grow cream-page" style={{ paddingTop: "110px", paddingBottom: "60px" }}>
        <div className="cream-page-inner">
          <div className="page-kicker">
            <span><i></i> 04 / LET’S TALK</span>
            <span>TERBUKA UNTUK KOLABORASI</span>
          </div>
          <h1 className="page-title">Good things start with a simple hello.</h1>
          <p className="page-subtitle">
            Mencari peluang magang, kolaborasi tim IT project management, atau pengembangan aplikasi web & mobile skala produksi? Mari berdiskusi!
          </p>

          <div className="archive-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
            {/* Email */}
            <div className="archive-card">
              <div>
                <h3>Email</h3>
                <p>Saluran komunikasi utama untuk penawaran magang, proyek, dan kerjasama.</p>
              </div>
              <div className="archive-links">
                <a href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="archive-card">
              <div>
                <h3>LinkedIn</h3>
                <p>Koneksi jaringan profesional dan rekam jejak karir.</p>
              </div>
              <div className="archive-links">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  in/ardityaadjierosandi
                </a>
              </div>
            </div>

            {/* GitHub */}
            <div className="archive-card">
              <div>
                <h3>GitHub</h3>
                <p>Eksplorasi kode sumber repositori dan kontribusi teknis terbuka.</p>
              </div>
              <div className="archive-links">
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  github.com/Gammaura
                </a>
              </div>
            </div>

            {/* Location & WhatsApp */}
            <div className="archive-card">
              <div>
                <h3>Location</h3>
                <p>Tangerang, Banten, Indonesia (Terbuka untuk On-site Jabodetabek maupun Remote).</p>
              </div>
              <div className="archive-links">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  WhatsApp: {profile.phone || "+62 877-1795-6553"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer name={profile.name} />
    </div>
  );
}
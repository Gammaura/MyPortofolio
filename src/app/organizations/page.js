import React from "react";
import { getCVData } from "../actions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const data = await getCVData();
  return {
    title: `Experience & Leadership — ${data?.profile?.name || "Arditya Adjie Rosandi"}`,
    description: `Riwayat kepemimpinan organisasi teknologi kampus, koordinasi tim pengembang, serta linimasa perjalanan ${data?.profile?.name || "Arditya Adjie Rosandi"}.`,
  };
}

function getOrgLogo(org) {
  if (org.image) return org.image;
  const name = (org.organization || org.name || "").toLowerCase();
  if (name.includes("codehub")) return "/assets/organizations/codehub.svg";
  if (name.includes("bem") || name.includes("fasilkom")) return "/assets/organizations/bem-fasilkom.svg";
  if (name.includes("band") || name.includes("ukm")) return "/assets/organizations/ukm-band.svg";
  if (name.includes("pkkmb")) return "/assets/organizations/pkkmb.svg";
  return null;
}

export default async function OrganizationsPage() {
  const data = await getCVData();
  const orgs = data?.organizations || [];
  const timeline = data?.timeline || [];

  return (
    <div className="min-h-screen relative flex flex-col" style={{ background: "var(--page-bg, #fff9f1)", color: "var(--page-ink, #17201c)" }}>
      <Navbar />
      <main className="flex-grow cream-page" style={{ paddingTop: "110px", paddingBottom: "60px" }}>
        <div className="cream-page-inner">
          <div className="page-kicker">
            <span><i></i> 02 / LEADERSHIP & EXPERIENCE</span>
            <span>ORGANISASI & MILESTONES</span>
          </div>
          <h1 className="page-title">Leadership, Direction & Timeline.</h1>
          <p className="page-subtitle">
            Rekam jejak kepemimpinan organisasi teknologi kampus, koordinasi tim pengembang, serta linimasa perjalanan dari awal perkuliahan hingga produksi.
          </p>

          <h2 style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "32px", marginBottom: "24px" }}>
            Organizational Roles
          </h2>
          <div className="archive-grid">
            {orgs.map((org, idx) => {
              const logo = getOrgLogo(org);
              return (
                <div className="archive-card" key={idx}>
                  {logo && (
                    <div className="archive-card-image" style={{ background: "#ffffff", padding: "16px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "110px", marginBottom: "16px" }}>
                      <img src={logo} alt={org.organization || org.name} loading="lazy" style={{ maxHeight: "80px", maxWidth: "160px", objectFit: "contain" }} />
                    </div>
                  )}
                <div className="archive-card-content">
                  <div className="archive-card-top" style={{ marginBottom: "8px" }}>
                    <span className="opacity-60">{org.period} {org.location ? `· ${org.location}` : ""}</span>
                    <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", fontWeight: "600", opacity: 0.8 }}>
                      {org.role}
                    </span>
                  </div>
                  <h3>{org.organization || org.name}</h3>
                  {(org.bulletPoints || org.bullets) && (org.bulletPoints || org.bullets).length > 0 && (
                    <ul className="archive-bullets" style={{ marginTop: "12px" }}>
                      {(org.bulletPoints || org.bullets).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>

          <h2 style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "32px", margin: "60px 0 24px 0" }}>
            Journey Timeline
          </h2>
          <div className="timeline-list">
            {timeline.map((item, idx) => (
              <div className="timeline-item" key={idx}>
                <div className="timeline-dot"></div>
                <div className="timeline-year">
                  {item.year} {item.month ? `· ${item.month}` : ""}
                </div>
                <div className="timeline-title">{item.title}</div>
                <div className="timeline-subtitle">{item.subtitle}</div>
                <p className="timeline-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer name={data?.profile?.name} />
    </div>
  );
}
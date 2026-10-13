"use client";

import React from "react";
import Link from "next/link";

export default function Footer({ name }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-top">
          {/* Brand & Bio */}
          <div className="site-footer-brand">
            <div className="footer-avatar-row">
              <div className="footer-avatar">
                <img src="/assets/photo.png" alt={name || "Arditya Adjie Rosandi"} />
              </div>
              <div>
                <h3 className="footer-brand-title">{name || "Arditya Adjie Rosandi"}</h3>
                <p className="footer-brand-tagline" data-i18n="footerTagline">
                  Full-Stack Developer & Systems Architect
                </p>
              </div>
            </div>
            <p className="footer-brand-bio" data-i18n="footerBio">
              Full-Stack Developer & Systems Architect. Berfokus pada arsitektur sistem performa tinggi, sistem kasir hybrid POS, platform AI Multi-Agent, dan pengembangan aplikasi produksi modern dari tahap desain hingga deployment.
            </p>
          </div>

          {/* Col: Navigation */}
          <div className="footer-col">
            <h4 data-i18n="footerNavTitle">Navigation</h4>
            <ul>
              <li>
                <Link href="/" data-i18n="navHome">Home</Link>
              </li>
              <li>
                <Link href="/projects" data-i18n="navProjects">Projects</Link>
              </li>
              <li>
                <Link href="/organizations" data-i18n="navExperience">Experience</Link>
              </li>
              <li>
                <Link href="/skills" data-i18n="navSkills">Skills</Link>
              </li>
              <li>
                <Link href="/contact" data-i18n="navContact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Col: Connect */}
          <div className="footer-col">
            <h4 data-i18n="footerConnectTitle">Connect</h4>
            <ul>
              <li>
                <a
                  href="https://github.com/Gammaura"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-connect-link"
                >
                  <span className="footer-app-logo">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </span>
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/ardityaadjierosandi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-connect-link"
                >
                  <span className="footer-app-logo">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                      <rect width="24" height="24" rx="4" fill="#0A66C2" />
                      <path d="M7.12 9.48H4.45V18h2.67V9.48zM5.79 8.32c.93 0 1.5-.62 1.5-1.39-.02-.79-.57-1.39-1.48-1.39-.92 0-1.51.6-1.51 1.39 0 .77.57 1.39 1.47 1.39h.02zM19.55 18h-2.67v-4.58c0-1.15-.41-1.94-1.44-1.94-.79 0-1.25.53-1.46 1.04-.08.19-.1.44-.1.7V18h-2.67s.04-7.72 0-8.52h2.67v1.21c.35-.55 1-1.33 2.42-1.33 1.77 0 3.09 1.15 3.09 3.63V18z" fill="#FFFFFF" />
                    </svg>
                  </span>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:ardityaa.id@gmail.com"
                  className="footer-connect-link"
                >
                  <span className="footer-app-logo">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                      <path d="M2.5 6.5C2.5 5.4 3.4 4.5 4.5 4.5H6.2L12 9.2L17.8 4.5H19.5C20.6 4.5 21.5 5.4 21.5 6.5V7.2L12 14.8L2.5 7.2V6.5Z" fill="#EA4335" />
                      <path d="M2.5 7.2V17.5C2.5 18.6 3.4 19.5 4.5 19.5H6.5V10.2L2.5 7.2Z" fill="#34A853" />
                      <path d="M21.5 7.2V17.5C21.5 18.6 20.6 19.5 19.5 19.5H17.5V10.2L21.5 7.2Z" fill="#4285F4" />
                      <path d="M17.5 19.5H19.5C20.6 19.5 21.5 18.6 21.5 17.5V10.2L17.5 13.2V19.5Z" fill="#FBBC04" />
                    </svg>
                  </span>
                  <span>Email</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6287717956553"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-connect-link"
                >
                  <span className="footer-app-logo">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="11" fill="#25D366" />
                      <path d="M17.5 14.3c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.88.12.57-.08 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" fill="#FFFFFF"/>
                    </svg>
                  </span>
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col: Location */}
          <div className="footer-col">
            <h4 data-i18n="footerLocationTitle">Location</h4>
            <p>Tangerang, Banten, Indonesia</p>
            <p style={{ opacity: 0.65 }}>WIB (UTC+7)</p>
            <div style={{ marginTop: 14 }}>
              <Link href="/contact" className="footer-cta-link" data-i18n="navCta">
                Work with me
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="site-footer-bottom" style={{ justifyContent: "center", textAlign: "center" }}>
          <p style={{ margin: 0, textAlign: "center" }}>
            © {currentYear} {name || "Arditya Adjie Rosandi"}. <span data-i18n="footerRights">All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
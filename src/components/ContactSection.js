"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Check, Copy, ExternalLink, MapPin, Sparkles } from "lucide-react";

export default function ContactSection({ profile }) {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile?.email || "ardityaa.id@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSent(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="pb-20 pt-6 relative max-w-4xl mx-auto px-6">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-xs font-semibold text-theme-heading mb-4">
          <Sparkles className="w-3 h-3 text-primary" />
          Kolaborasi & Diskusi
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-theme-heading mb-4">
          Tertarik Kolaborasi atau Punya Kesempatan Magang?
        </h2>
        <p className="text-theme-muted text-sm md:text-base max-w-xl mx-auto">
          Gua terbuka untuk diskusi project, magang, atau sekadar ngobrol soal teknologi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        {/* Info Kontak */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-base font-bold text-theme-heading mb-4">Informasi Kontak</h3>
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-theme-badge border border-theme-badge">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-theme-subtle font-semibold uppercase">Email</p>
                    <p className="text-xs font-medium text-theme-body truncate max-w-[150px]">
                      {profile?.email || "ardityaa.id@gmail.com"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-theme-badge text-theme-muted hover:text-theme-heading hover:bg-primary/10 transition-colors cursor-pointer"
                  title="Salin Email"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Lokasi */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-theme-badge border border-theme-badge">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-theme-subtle font-semibold uppercase">Lokasi</p>
                  <p className="text-xs font-medium text-theme-body">
                    Tangerang, Banten — Jakarta, Indonesia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Jejaring Sosial */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-base font-bold text-theme-heading mb-4">Jejaring Sosial</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <a
                href={profile?.linkedin || "https://www.linkedin.com/in/ardityaadjierosandi"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl bg-theme-badge hover:bg-primary/10 border border-theme-badge text-theme-body hover:text-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 ml-auto text-theme-subtle" />
              </a>
              <a
                href={profile?.github || "https://github.com/Gammaura"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl bg-theme-badge hover:bg-primary/10 border border-theme-badge text-theme-body hover:text-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 ml-auto text-theme-subtle" />
              </a>
            </div>
          </div>
        </div>

        {/* Form Kontak */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 md:p-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-theme-muted mb-2 uppercase">Nama Lengkap</label>
              <input
                type="text" required value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-theme-badge border border-theme-badge focus:border-primary/50 text-sm text-theme-heading placeholder-theme-subtle focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-theme-muted mb-2 uppercase">Alamat Email</label>
              <input
                type="email" required value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="johndoe@example.com"
                className="w-full px-4 py-3 rounded-xl bg-theme-badge border border-theme-badge focus:border-primary/50 text-sm text-theme-heading placeholder-theme-subtle focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-theme-muted mb-2 uppercase">Pesan Anda</label>
              <textarea
                required rows={4} value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Tulis pesan Anda di sini..."
                className="w-full px-4 py-3 rounded-xl bg-theme-badge border border-theme-badge focus:border-primary/50 text-sm text-theme-heading placeholder-theme-subtle focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit" disabled={sent}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm shadow-lg shadow-primary/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sent ? (
                <><Check className="w-4 h-4 animate-bounce" /> Pesan Terkirim!</>
              ) : (
                <><Send className="w-4 h-4" /> Kirim Pesan</>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* CTA Buttons bawah */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
        <a
          href={`mailto:${profile?.email || "ardityaa.id@gmail.com"}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-105"
        >
          <Mail className="w-4 h-4" />
          Kirim Email
        </a>
        <a
          href={profile?.github || "https://github.com/Gammaura"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-light text-sm font-semibold text-theme-heading transition-all hover:scale-105"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-primary">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          Lihat GitHub
        </a>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-theme-badge border border-emerald-500/30 rounded-xl shadow-2xl shadow-black/80"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-theme-heading">Email berhasil disalin!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
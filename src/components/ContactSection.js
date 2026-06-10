"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Check, Copy, ExternalLink } from "lucide-react";

export default function ContactSection({ profile }) {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Simulate API request send
    setSent(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-20 relative max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Hubungi <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Saya</span>
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto">
          Punya penawaran proyek, lowongan magang, atau ingin sekadar berdiskusi? Jangan ragu hubungi saya.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        {/* Info Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-4">Informasi Kontak</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 font-semibold uppercase">Email</p>
                    <p className="text-xs font-medium text-zinc-300 truncate max-w-[150px]">{profile.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/10 text-zinc-400 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                  title="Salin Email"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-4">Jejaring Sosial</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 ml-auto text-zinc-500" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 ml-auto text-zinc-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 md:p-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Nama Lengkap</label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-cyan-500/50 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Alamat Email</label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="johndoe@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-cyan-500/50 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Pesan Anda</label>
              <textarea
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Tulis pesan Anda di sini..."
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-cyan-500/50 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sent}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sent ? (
                <>
                  <Check className="w-4 h-4 animate-bounce text-emerald-400" />
                  Pesan Terkirim!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Kirim Pesan
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Copy Toast Alert */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-zinc-900 border border-emerald-500/30 rounded-xl shadow-2xl shadow-black/80"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-zinc-200">Email berhasil disalin!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
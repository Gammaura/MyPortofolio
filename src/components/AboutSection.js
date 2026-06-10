"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, User, Route, Target } from "lucide-react";

const blocks = [
  {
    icon: User,
    title: "Siapa Saya",
    content: [
      "Mahasiswa Teknik Informatika Universitas Esa Unggul (angkatan 2023) dengan IPK 3.84.",
      "Antusias dalam pengembangan web modern, arsitektur backend, dan desain antarmuka interaktif.",
      "Berpengalaman membangun aplikasi skala menengah, integrasi API real-time, dan sistem e-commerce.",
    ],
  },
  {
    icon: Route,
    title: "Perjalanan Saya",
    content: [
      "Mulai dari dunia coding di kampus, aktif di CodeHub sebagai Ketua, memimpin BEM Fakultas sebagai Branch Head, hingga mengerjakan proyek-proyek nyata dari machine learning, game development, sampai full-stack web app.",
      "Perjalanan dari mahasiswa biasa → developer yang bisa memimpin tim dan deliver produk.",
    ],
  },
  {
    icon: Target,
    title: "Tujuan Saya",
    content: [
      "Mencari peluang magang atau kolaborasi di bidang IT Project Management dan Full-Stack Web Development.",
      "Ingin berkontribusi di tim yang bergerak cepat, belajar dari praktisi nyata, dan membangun produk yang berdampak.",
    ],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative max-w-5xl mx-auto px-6">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-xs font-semibold text-theme-heading mb-4">
          <Sparkles className="w-3 h-3 text-primary" />
          Sekilas Tentang
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-theme-heading mb-4">
          Tentang Saya
        </h2>
        <p className="text-theme-muted text-sm md:text-base max-w-lg mx-auto">
          Mahasiswa Teknik Informatika yang antusias mengubah ide menjadi solusi digital nyata.
        </p>
      </div>

      {/* Content Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blocks.map((block, idx) => {
          const Icon = block.icon;
          return (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -4 }}
              className="glass-panel rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/5 rounded-full blur-xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-theme-badge border border-theme-badge text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-theme-heading">
                  {block.title}
                </h3>
              </div>

              <div className="space-y-4">
                {block.content.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-sm text-theme-body leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
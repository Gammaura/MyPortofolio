"use client";

import React from "react";
import { motion } from "framer-motion";
import { School, Code, Rocket, CheckCircle2, Award, Target, ArrowRight, ShieldCheck } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about-detail" className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              WHO I AM
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Siapa Saya
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed font-medium">
          Menjembatani keunggulan rekayasa perangkat lunak full-stack dengan kepemimpinan agile untuk mewujudkan produk digital berdaya tahan tinggi.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        
        {/* Academic Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <School className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 text-xs font-extrabold tracking-wider uppercase">
                ANGKATAN 2023
              </span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              Teknik Informatika Universitas Esa Unggul
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium">
              Mempertahankan rekam jejak akademik unggul dengan IPK 3.84 sambil aktif memimpin inisiatif riset, komunitas pengembang internal, dan penyelenggaraan kegiatan fakultas.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  ACADEMIC METRIC
                </span>
                <div className="text-3xl font-black text-blue-600 dark:text-blue-400">
                  3.84
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Skala 4.00 Kumulatif</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  TRANSFORMASI
                </span>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Mahasiswa Biasa <span className="text-blue-600">→</span> Tech Lead & Product Delivery
                </p>
                <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">Ready to scale</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Terakreditasi & Berorientasi Praktik Industri</span>
          </div>
        </motion.div>

        {/* Passion Cards */}
        <div className="md:col-span-5 flex flex-col gap-6">
          
          {/* Card: Modern Web */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-3">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">
                Arsitektur Web Modern
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-medium">
                Antusias dalam pengembangan web full-stack, integrasi API real-time, dan ekosistem Next.js / React berkinerja tinggi.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                React / Next.js
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                Node.js / Express
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                PostgreSQL / MySQL
              </span>
            </div>
          </motion.div>

          {/* Card: Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-3">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">
                System Delivery & E-Commerce
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-medium">
                Pengalaman nyata membangun sistem pemesanan online, automasi kiosk photobooth, chatbot AI, hingga aplikasi manajemen arena.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                Full-Stack Build
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                AI Integration
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                Project Lead
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Perjalanan Saya & Tujuan Saya */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        
        {/* Journey Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                PERJALANAN SAYA
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Journey</h3>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-medium">
            Mulai dari dunia coding di kampus, aktif di CodeHub sebagai Ketua, memimpin BEM Fakultas sebagai Branch Head, hingga mengerjakan proyek-proyek nyata dari machine learning, game development, sampai full-stack web app.
          </p>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Dari mahasiswa biasa → Developer yang bisa memimpin tim & deliver produk.</span>
          </div>
        </motion.div>

        {/* Goal Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                TUJUAN SAYA
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Goal</h3>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-medium">
            Mencari peluang magang atau kolaborasi profesional di bidang IT Project Management dan Full-Stack Web Development. Ingin berkontribusi di tim yang bergerak cepat, belajar dari praktisi nyata, dan membangun produk yang berdampak.
          </p>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Tersedia untuk Magang & Project Kolaborasi.</span>
          </div>
        </motion.div>

      </div>

      {/* IT PM Framework & Scorecard Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 text-[10px] font-mono font-extrabold uppercase tracking-wider mb-3 inline-block">
              IT PROJECT MANAGEMENT CAPABILITIES
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              Management Framework & Delivery Discipline
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Memimpin tim pengembang dengan integrasi metodologi Agile/Scrum, penyusunan Work Breakdown Structure (WBS), serta analisis arsitektur database (ERD & Wireframing UI).
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-base sm:text-lg font-extrabold text-blue-600 dark:text-blue-400 block">Agile / Scrum</span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Sprint & Backlog</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-base sm:text-lg font-extrabold text-blue-600 dark:text-blue-400 block">WBS & ERD</span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">System Design</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center col-span-2 sm:col-span-1">
              <span className="text-base sm:text-lg font-extrabold text-emerald-600 dark:text-emerald-400 block">5 - 15+</span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Team Size Led</span>
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  );
}

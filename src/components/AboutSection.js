"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Route, Target } from "lucide-react";

const blocks = [
  {
    icon: User,
    title: "Siapa Saya",
    label: "About",
    content: [
      "Mahasiswa Teknik Informatika Universitas Esa Unggul (angkatan 2023) dengan IPK 3.84.",
      "Antusias dalam pengembangan web modern, arsitektur backend, dan desain antarmuka interaktif.",
      "Berpengalaman membangun aplikasi skala menengah, integrasi API real-time, dan sistem e-commerce.",
    ],
  },
  {
    icon: Route,
    title: "Perjalanan Saya",
    label: "Journey",
    content: [
      "Mulai dari dunia coding di kampus, aktif di CodeHub sebagai Ketua, memimpin BEM Fakultas sebagai Branch Head, hingga mengerjakan proyek-proyek nyata dari machine learning, game development, sampai full-stack web app.",
      "Perjalanan dari mahasiswa biasa → developer yang bisa memimpin tim dan deliver produk.",
    ],
  },
  {
    icon: Target,
    title: "Tujuan Saya",
    label: "Goal",
    content: [
      "Mencari peluang magang atau kolaborasi di bidang IT Project Management dan Full-Stack Web Development.",
      "Ingin berkontribusi di tim yang bergerak cepat, belajar dari praktisi nyata, dan membangun produk yang berdampak.",
    ],
  },
];

function NeonIconCard({ icon: Icon, isPhoto = false }) {
  return (
    <div className="relative flex items-center justify-center w-full aspect-square max-w-[260px] mx-auto">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(220,38,38,0.18) 0%, rgba(220,38,38,0.04) 55%, transparent 75%)" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "72%", height: "72%",
          background: isPhoto ? "transparent" : "radial-gradient(circle, rgba(220,38,38,0.12) 0%, rgba(10,10,20,0.9) 70%)",
          border: "1.5px solid rgba(220,38,38,0.4)",
          overflow: "hidden",
        }}
        animate={{ boxShadow: [
          "0 0 20px rgba(220,38,38,0.15), inset 0 0 16px rgba(220,38,38,0.06)",
          "0 0 44px rgba(220,38,38,0.4), inset 0 0 28px rgba(220,38,38,0.12)",
          "0 0 20px rgba(220,38,38,0.15), inset 0 0 16px rgba(220,38,38,0.06)",
        ]}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {isPhoto && (
          <img
            src="/me.png"
            alt="Arditya Adjie Rosandi"
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>
      <motion.div
        className="absolute rounded-full"
        style={{ width: "90%", height: "90%", border: "1px solid rgba(220,38,38,0.15)" }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      {!isPhoto && (
        <motion.div
          className="relative z-10"
          animate={{ filter: [
            "drop-shadow(0 0 6px rgba(220,38,38,0.5))",
            "drop-shadow(0 0 18px rgba(220,38,38,0.9))",
            "drop-shadow(0 0 6px rgba(220,38,38,0.5))",
          ]}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon className="w-14 h-14 text-primary" strokeWidth={1.5} />
        </motion.div>
      )}
    </div>
  );
}

function AboutRow({ block, index }) {
  const isEven = index % 2 === 0;

  const IconSide = (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col items-center justify-center gap-5"
    >
      <NeonIconCard icon={block.icon} isPhoto={index === 0} />
      <div className="text-center">
        <p className="text-xs text-primary font-semibold tracking-[0.2em] uppercase mb-1">
          {block.label}
        </p>
        <h3 className="text-2xl font-bold text-theme-heading">
          {block.title}
        </h3>
      </div>
    </motion.div>
  );

  const TextSide = (
    <motion.div
      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
      className="flex flex-col justify-center gap-5"
    >
      {block.content.map((paragraph, i) => (
        <p key={i} className="text-base text-theme-body leading-relaxed">
          {paragraph}
        </p>
      ))}
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center py-12">
      {isEven ? <>{IconSide}{TextSide}</> : <>{TextSide}{IconSide}</>}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about-detail" className="py-24 relative max-w-5xl mx-auto px-6">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <p className="text-2xl md:text-3xl text-primary font-bold tracking-[0.2em] uppercase">
          — Who I Am —
        </p>
      </motion.div>

      {/* Alternating Rows */}
      <div className="flex flex-col divide-y divide-white/5">
        {blocks.map((block, idx) => (
          <AboutRow key={block.title} block={block} index={idx} />
        ))}
      </div>

    </section>
  );
}

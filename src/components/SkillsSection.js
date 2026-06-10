"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Layout, Database, Wrench } from "lucide-react";

export default function SkillsSection({ skills }) {
  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Icons map for categories
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "frontend":
        return <Layout className="w-4 h-4 text-cyan-300" />;
      case "backend":
        return <Cpu className="w-4 h-4 text-cyan-300" />;
      case "database":
        return <Database className="w-4 h-4 text-cyan-300" />;
      case "design":
        return <Layout className="w-4 h-4 text-cyan-300" />;
      default:
        return <Wrench className="w-4 h-4 text-cyan-300" />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="skills" className="py-20 relative max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Keahlian & <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Tech Stack</span>
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto">
          Teknologi dan tools yang biasa saya gunakan untuk merealisasikan ide menjadi produk digital.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Object.entries(categories).map(([category, items], idx) => (
          <motion.div
            key={category}
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className={`glass-panel rounded-2xl p-6 relative overflow-hidden ${
              idx === 0 ? "lg:col-span-2" : ""
            }`}
          >
            {/* Background Accent Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                {getCategoryIcon(category)}
              </div>
              <h3 className="font-semibold text-lg text-white capitalize">{category}</h3>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {items.map((skill, skillIdx) => (
                <div
                  key={skillIdx}
                  className="group relative flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-white/10 text-zinc-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
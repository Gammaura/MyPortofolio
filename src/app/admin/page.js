"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCVData, updateCVData } from "../actions";
import {
  Lock,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  User,
  Code,
  FolderOpen,
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
  LogOut,
} from "lucide-react";

export default function AdminPanel() {
  const [data, setData] = useState(null);
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  
  // Navigation & status states
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ show: false, success: false, message: "" });

  // Load initial data
  useEffect(() => {
    async function loadData() {
      const res = await getCVData();
      setData(res);
    }
    loadData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple passcode check - can be changed by the user in code
    if (passcode === "admin123") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Passcode salah! Silakan coba lagi.");
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    setSaveStatus({ show: false, success: false, message: "" });

    try {
      const res = await updateCVData(data);
      if (res.success) {
        setSaveStatus({
          show: true,
          success: true,
          message: "Data CV berhasil disimpan dan disinkronisasikan ke web & PDF!",
        });
      } else {
        throw new Error(res.error || "Gagal menyimpan data.");
      }
    } catch (err) {
      setSaveStatus({
        show: true,
        success: false,
        message: err.message || "Terjadi kesalahan saat menyimpan data.",
      });
    } finally {
      setIsSaving(false);
      // Auto-hide alert after 5s
      setTimeout(() => {
        setSaveStatus((prev) => ({ ...prev, show: false }));
      }, 5000);
    }
  };

  // Helper change handlers
  const handleProfileChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  // Skills helpers
  const handleAddSkill = () => {
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: "Skill Baru", category: "Frontend", level: "Intermediate" }],
    }));
  };

  const handleSkillChange = (index, field, value) => {
    setData((prev) => {
      const updated = [...prev.skills];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, skills: updated };
    });
  };

  const handleRemoveSkill = (index) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== index),
    }));
  };

  // Projects helpers
  const handleAddProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: "Project Baru",
          role: "Developer",
          period: "Jan 2026",
          techStack: ["React"],
          shortDescription: "Deskripsi singkat project...",
          bulletPoints: ["Detail pencapaian/pekerjaan 1"],
          github: "",
          demo: "",
        },
      ],
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setData((prev) => {
      const updated = [...prev.projects];
      if (field === "techStack") {
        updated[index] = { ...updated[index], [field]: value.split(",").map((s) => s.trim()) };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, projects: updated };
    });
  };

  const handleProjectBulletChange = (projIndex, bulletIndex, value) => {
    setData((prev) => {
      const updated = [...prev.projects];
      const bullets = [...updated[projIndex].bulletPoints];
      bullets[bulletIndex] = value;
      updated[projIndex] = { ...updated[projIndex], bulletPoints: bullets };
      return { ...prev, projects: updated };
    });
  };

  const handleAddProjectBullet = (projIndex) => {
    setData((prev) => {
      const updated = [...prev.projects];
      updated[projIndex] = {
        ...updated[projIndex],
        bulletPoints: [...updated[projIndex].bulletPoints, "Detail pekerjaan baru"],
      };
      return { ...prev, projects: updated };
    });
  };

  const handleRemoveProjectBullet = (projIndex, bulletIndex) => {
    setData((prev) => {
      const updated = [...prev.projects];
      updated[projIndex] = {
        ...updated[projIndex],
        bulletPoints: updated[projIndex].bulletPoints.filter((_, idx) => idx !== bulletIndex),
      };
      return { ...prev, projects: updated };
    });
  };

  const handleRemoveProject = (index) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, idx) => idx !== index),
    }));
  };

  // Organizations helpers
  const handleAddOrganization = () => {
    setData((prev) => ({
      ...prev,
      organizations: [
        ...prev.organizations,
        {
          role: "Anggota",
          organization: "Nama Organisasi",
          period: "Jan 2026",
          location: "Jakarta",
          bulletPoints: ["Detail peran/aktivitas 1"],
        },
      ],
    }));
  };

  const handleOrganizationChange = (index, field, value) => {
    setData((prev) => {
      const updated = [...prev.organizations];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, organizations: updated };
    });
  };

  const handleOrgBulletChange = (orgIndex, bulletIndex, value) => {
    setData((prev) => {
      const updated = [...prev.organizations];
      const bullets = [...updated[orgIndex].bulletPoints];
      bullets[bulletIndex] = value;
      updated[orgIndex] = { ...updated[orgIndex], bulletPoints: bullets };
      return { ...prev, organizations: updated };
    });
  };

  const handleAddOrgBullet = (orgIndex) => {
    setData((prev) => {
      const updated = [...prev.organizations];
      updated[orgIndex] = {
        ...updated[orgIndex],
        bulletPoints: [...updated[orgIndex].bulletPoints, "Detail aktivitas baru"],
      };
      return { ...prev, organizations: updated };
    });
  };

  const handleRemoveOrgBullet = (orgIndex, bulletIndex) => {
    setData((prev) => {
      const updated = [...prev.organizations];
      updated[orgIndex] = {
        ...updated[orgIndex],
        bulletPoints: updated[orgIndex].bulletPoints.filter((_, idx) => idx !== bulletIndex),
      };
      return { ...prev, organizations: updated };
    });
  };

  const handleRemoveOrganization = (index) => {
    setData((prev) => ({
      ...prev,
      organizations: prev.organizations.filter((_, idx) => idx !== index),
    }));
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen grid-bg flex flex-col items-center justify-center p-6 selection:bg-indigo-500/30 selection:text-indigo-200">
        <Link
          href="/"
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Portofolio
        </Link>

        <div className="glass-panel w-full max-w-sm rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Akses Terproteksi</h1>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Masukkan passcode admin untuk masuk ke panel manajemen CV portofolio.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-zinc-500 mb-2 uppercase">Passcode</label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Masukkan passcode..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/5 focus:border-indigo-500 text-sm text-center text-white placeholder-zinc-700 focus:outline-none transition-colors"
              />
              <p className="text-[10px] text-zinc-600 mt-2 text-center">
                *Petunjuk: Passcode default adalah <code className="bg-zinc-900 px-1 py-0.5 rounded text-zinc-400">admin123</code>
              </p>
            </div>

            {authError && (
              <div className="text-xs font-semibold text-red-400 text-center bg-red-500/5 border border-red-500/10 p-2.5 rounded-lg">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              Masuk ke Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen grid-bg flex items-center justify-center text-sm font-semibold text-zinc-400">
        Memuat data CV...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 pb-20 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Header */}
      <header className="border-b border-white/5 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-base font-bold text-white flex items-center gap-2">
                Portofolio Admin Panel
              </h1>
              <p className="text-[10px] text-zinc-500 font-medium">
                Pembaruan konten dinamis secara real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-700/50 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] cursor-pointer disabled:cursor-wait"
            >
              <Save className="w-3.5 h-3.5" />
              {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 text-zinc-400 hover:text-red-400 transition-all cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: "profile", label: "Profil Saya", icon: <User className="w-4 h-4" /> },
            { id: "skills", label: "Keahlian (Skills)", icon: <Code className="w-4 h-4" /> },
            { id: "projects", label: "Riwayat Project", icon: <FolderOpen className="w-4 h-4" /> },
            { id: "organizations", label: "Riwayat Organisasi", icon: <Users className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold border transition-all text-left cursor-pointer ${
                activeTab === tab.id
                  ? "bg-zinc-900 border-indigo-500/50 text-white"
                  : "border-transparent hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-300"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editor Main Column */}
        <div className="lg:col-span-3">
          {/* Status Toast Alert */}
          {saveStatus.show && (
            <div
              className={`mb-6 p-4 rounded-xl border flex items-start gap-3 shadow-lg ${
                saveStatus.success
                  ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                  : "bg-red-500/5 border-red-500/20 text-red-400"
              }`}
            >
              {saveStatus.success ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">
                  {saveStatus.success ? "Sukses" : "Gagal"}
                </p>
                <p className="text-xs font-semibold mt-0.5 text-zinc-300">{saveStatus.message}</p>
              </div>
            </div>
          )}

          {/* TAB: PROFILE */}
          {activeTab === "profile" && (
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white mb-6 pb-2 border-b border-white/5">
                Konfigurasi Profil Utama
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase">Nama Lengkap</label>
                  <input
                    type="text"
                    value={data.profile.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/5 focus:border-indigo-500 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase">Spesialisasi / Title</label>
                  <input
                    type="text"
                    value={data.profile.title}
                    onChange={(e) => handleProfileChange("title", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/5 focus:border-indigo-500 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase">Alamat Email</label>
                  <input
                    type="email"
                    value={data.profile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/5 focus:border-indigo-500 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase">Nomor Telepon</label>
                  <input
                    type="text"
                    value={data.profile.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/5 focus:border-indigo-500 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase">Lokasi</label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) => handleProfileChange("location", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/5 focus:border-indigo-500 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={data.profile.github}
                    onChange={(e) => handleProfileChange("github", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/5 focus:border-indigo-500 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={data.profile.linkedin}
                    onChange={(e) => handleProfileChange("linkedin", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/5 focus:border-indigo-500 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase">Ringkasan Tentang Saya</label>
                  <textarea
                    rows={4}
                    value={data.profile.about}
                    onChange={(e) => handleProfileChange("about", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/5 focus:border-indigo-500 text-sm text-white focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: SKILLS */}
          {activeTab === "skills" && (
            <div className="glass-panel rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <h2 className="text-lg font-bold text-white">Keahlian & Kompetensi</h2>
                <button
                  onClick={handleAddSkill}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/5 hover:border-indigo-500/30 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Skill
                </button>
              </div>

              <div className="space-y-4">
                {data.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-white/5 relative group"
                  >
                    <div className="w-full md:w-2/5">
                      <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase">Nama Skill</label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                        className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="w-full md:w-1/4">
                      <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase">Kategori</label>
                      <select
                        value={skill.category}
                        onChange={(e) => handleSkillChange(index, "category", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="Animation">Animation</option>
                        <option value="Tools">Tools</option>
                        <option value="Design">Design</option>
                      </select>
                    </div>

                    <div className="w-full md:w-1/4">
                      <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase">Tingkat</label>
                      <select
                        value={skill.level}
                        onChange={(e) => handleSkillChange(index, "level", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleRemoveSkill(index)}
                      className="p-2 rounded-lg bg-zinc-950 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 text-zinc-500 hover:text-red-400 transition-colors md:mt-5 self-end md:self-auto cursor-pointer"
                      title="Hapus Skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {data.skills.length === 0 && (
                  <p className="text-center text-xs text-zinc-500 py-8">Keahlian kosong. Klik Tambah Skill.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === "projects" && (
            <div className="glass-panel rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <h2 className="text-lg font-bold text-white">Kelola Riwayat Project</h2>
                <button
                  onClick={handleAddProject}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/5 hover:border-indigo-500/30 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Project
                </button>
              </div>

              <div className="space-y-6">
                {data.projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-4 relative"
                  >
                    <button
                      onClick={() => handleRemoveProject(idx)}
                      className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-950 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 text-zinc-500 hover:text-red-400 transition-all cursor-pointer"
                      title="Hapus Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase">Judul Project</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase">Peran / Role</label>
                        <input
                          type="text"
                          value={project.role}
                          onChange={(e) => handleProjectChange(idx, "role", e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase">Periode Tanggal</label>
                        <input
                          type="text"
                          value={project.period}
                          onChange={(e) => handleProjectChange(idx, "period", e.target.value)}
                          placeholder="e.g. Des 2025"
                          className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase">Tech Stack (pisahkan koma)</label>
                        <input
                          type="text"
                          value={project.techStack.join(", ")}
                          onChange={(e) => handleProjectChange(idx, "techStack", e.target.value)}
                          placeholder="e.g. React, Next.js, Postgres"
                          className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase">Deskripsi Singkat</label>
                        <input
                          type="text"
                          value={project.shortDescription}
                          onChange={(e) => handleProjectChange(idx, "shortDescription", e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase">Repository URL (GitHub)</label>
                        <input
                          type="text"
                          value={project.github}
                          onChange={(e) => handleProjectChange(idx, "github", e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase">Demo URL (Live)</label>
                        <input
                          type="text"
                          value={project.demo}
                          onChange={(e) => handleProjectChange(idx, "demo", e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Bullet Achievements */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase">Poin Pencapaian & Detail Pekerjaan</label>
                        <button
                          onClick={() => handleAddProjectBullet(idx)}
                          className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Tambah Poin
                        </button>
                      </div>

                      <div className="space-y-2">
                        {project.bulletPoints.map((bp, bpIdx) => (
                          <div key={bpIdx} className="flex items-center gap-2">
                            <span className="text-zinc-600 text-xs">•</span>
                            <input
                              type="text"
                              value={bp}
                              onChange={(e) => handleProjectBulletChange(idx, bpIdx, e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none"
                            />
                            <button
                              onClick={() => handleRemoveProjectBullet(idx, bpIdx)}
                              className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors cursor-pointer"
                              title="Hapus Poin"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {data.projects.length === 0 && (
                  <p className="text-center text-xs text-zinc-500 py-8">Project kosong. Klik Tambah Project.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB: ORGANIZATIONS */}
          {activeTab === "organizations" && (
            <div className="glass-panel rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <h2 className="text-lg font-bold text-white">Kelola Riwayat Organisasi</h2>
                <button
                  onClick={handleAddOrganization}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/5 hover:border-indigo-500/30 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Organisasi
                </button>
              </div>

              <div className="space-y-6">
                {data.organizations.map((org, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-4 relative"
                  >
                    <button
                      onClick={() => handleRemoveOrganization(idx)}
                      className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-950 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 text-zinc-500 hover:text-red-400 transition-all cursor-pointer"
                      title="Hapus Organisasi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase">Peran / Jabatan</label>
                        <input
                          type="text"
                          value={org.role}
                          onChange={(e) => handleOrganizationChange(idx, "role", e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase">Nama Organisasi</label>
                        <input
                          type="text"
                          value={org.organization}
                          onChange={(e) => handleOrganizationChange(idx, "organization", e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase">Periode</label>
                        <input
                          type="text"
                          value={org.period}
                          onChange={(e) => handleOrganizationChange(idx, "period", e.target.value)}
                          placeholder="e.g. Okt 2024 - Sekarang"
                          className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase">Lokasi</label>
                        <input
                          type="text"
                          value={org.location}
                          onChange={(e) => handleOrganizationChange(idx, "location", e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Bullet Achievements */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase">Kontribusi & Tanggung Jawab</label>
                        <button
                          onClick={() => handleAddOrgBullet(idx)}
                          className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Tambah Poin
                        </button>
                      </div>

                      <div className="space-y-2">
                        {org.bulletPoints.map((bp, bpIdx) => (
                          <div key={bpIdx} className="flex items-center gap-2">
                            <span className="text-zinc-600 text-xs">•</span>
                            <input
                              type="text"
                              value={bp}
                              onChange={(e) => handleOrgBulletChange(idx, bpIdx, e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/5 focus:border-indigo-500 text-xs text-white focus:outline-none"
                            />
                            <button
                              onClick={() => handleRemoveOrgBullet(idx, bpIdx)}
                              className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors cursor-pointer"
                              title="Hapus Poin"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {data.organizations.length === 0 && (
                  <p className="text-center text-xs text-zinc-500 py-8">Organisasi kosong. Klik Tambah Organisasi.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

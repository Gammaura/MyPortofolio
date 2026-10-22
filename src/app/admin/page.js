"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import "./admin.css";
import { getCVData, updateCVData, getContactMessages, deleteContactMessage } from "../actions";
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
  LogOut,
  MapPin,
  Award,
  Upload,
  Eye,
  EyeOff,
  ShieldCheck,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  ChevronRight,
  Loader2,
  LayoutDashboard,
  MessageSquare,
  Mail,
  Search,
  Bell,
  RefreshCw,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

// Themesbrand Minia Signature Metric Sparkline Component
function MiniaSparkline({ color = "#5156BE", points = [12, 18, 14, 25, 22, 35, 30, 46, 42, 58] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const width = 110;
  const height = 40;

  const coords = points.map((val, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 12) - 6;
    return [x, y];
  });

  let pathD = `M ${coords[0][0]},${coords[0][1]}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const curr = coords[i];
    const next = coords[i + 1];
    const cpx1 = curr[0] + (next[0] - curr[0]) / 2;
    const cpy1 = curr[1];
    const cpx2 = curr[0] + (next[0] - curr[0]) / 2;
    const cpy2 = next[1];
    pathD += ` C ${cpx1},${cpy1} ${cpx2},${cpy2} ${next[0]},${next[1]}`;
  }

  const fillD = `${pathD} L ${width},${height} L 0,${height} Z`;
  const gradId = `minia-spark-${color.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg className="w-24 h-10 overflow-visible shrink-0" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.30" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill={`url(#${gradId})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AdminPanel() {
  const [data, setData] = useState(null);
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Inquiries and mobile drawer states
  const [messages, setMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deletingMsgId, setDeletingMsgId] = useState(null);
  const [activityPeriod, setActivityPeriod] = useState("monthly");

  // Navigation & status states
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ show: false, success: false, message: "" });
  const [uploadingCertIndex, setUploadingCertIndex] = useState(null);
  const [uploadingImageKey, setUploadingImageKey] = useState(null);
  const [lastSavedTime, setLastSavedTime] = useState(null);

  // Load initial data and inquiries
  useEffect(() => {
    async function loadData() {
      const res = await getCVData();
      setData(res);
      try {
        setIsLoadingMessages(true);
        const msgs = await getContactMessages();
        setMessages(msgs || []);
      } catch (err) {
        console.warn("Contact messages load:", err);
      } finally {
        setIsLoadingMessages(false);
      }
    }
    loadData();
  }, []);

  const handleDeleteMessage = async (msgId) => {
    if (!confirm("Hapus pesan ini dari inbox kontak?")) return;
    setDeletingMsgId(msgId);
    try {
      const res = await deleteContactMessage(msgId);
      if (res.success) {
        setMessages((prev) => prev.filter((m) => m.id !== msgId));
      }
    } catch (e) {
      console.warn("Failed to delete message:", e);
    } finally {
      setDeletingMsgId(null);
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("tailadmin_auth");
      sessionStorage.removeItem("minia_auth");
    }
  };

  const handleSave = React.useCallback(async () => {
    if (!data) return;
    setIsSaving(true);
    setSaveStatus({ show: false, success: false, message: "" });

    try {
      const res = await updateCVData(data);
      if (res.success) {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        setLastSavedTime(now);
        setSaveStatus({
          show: true,
          success: true,
          message: "All changes successfully saved and synced across database & website!",
        });
      } else {
        throw new Error(res.error || "Failed to save data.");
      }
    } catch (err) {
      setSaveStatus({
        show: true,
        success: false,
        message: err.message || "An error occurred while saving data.",
      });
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setSaveStatus((prev) => ({ ...prev, show: false }));
      }, 5000);
    }
  }, [data]);

  // Keyboard shortcut for saving (Ctrl+S or Cmd+S)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (isAuthenticated && data && !isSaving) {
          handleSave();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthenticated, data, isSaving, handleSave]);

  // Auto-login from session storage if previously authenticated
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("tailadmin_auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!passcode) return;
    setIsLoggingIn(true);
    setAuthError("");

    setTimeout(() => {
      const valid = ["admin123", "adjie123", "adjie", "gammaura"];
      if (valid.includes(passcode.trim().toLowerCase())) {
        setIsAuthenticated(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("tailadmin_auth", "true");
        }
        setAuthError("");
      } else {
        setAuthError("Passcode salah! Silakan coba lagi.");
      }
      setIsLoggingIn(false);
    }, 250);
  };

  // General Image Upload Handler
  const handleUploadImageFile = async (file, onUploaded, keyIdentifier) => {
    if (!file) return;
    setUploadingImageKey(keyIdentifier);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.url) {
        throw new Error(json.error || "Failed to upload image.");
      }

      onUploaded(json.url);
      setSaveStatus({
        show: true,
        success: true,
        message: "Image uploaded successfully!",
      });
      setTimeout(() => setSaveStatus((prev) => ({ ...prev, show: false })), 3000);
    } catch (err) {
      setSaveStatus({
        show: true,
        success: false,
        message: err.message || "Failed to upload image.",
      });
      setTimeout(() => setSaveStatus((prev) => ({ ...prev, show: false })), 5000);
    } finally {
      setUploadingImageKey(null);
    }
  };

  // Profile helpers
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
      skills: [...prev.skills, { name: "New Skill", category: "Web Development", level: "Intermediate" }],
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

  // Certificates helpers
  const handleAddCertificate = () => {
    setData((prev) => ({
      ...prev,
      certificates: [
        ...(prev.certificates || []),
        {
          title: "New Certificate",
          issuer: "Issuing Organization",
          date: "2026",
          file: "",
          fileType: "",
          credentialUrl: "",
        },
      ],
    }));
  };

  const handleCertificateChange = (index, field, value) => {
    setData((prev) => {
      const updated = [...(prev.certificates || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, certificates: updated };
    });
  };

  const handleRemoveCertificate = (index) => {
    setData((prev) => ({
      ...prev,
      certificates: (prev.certificates || []).filter((_, idx) => idx !== index),
    }));
  };

  const handleCertificateUpload = async (index, file) => {
    if (!file) return;
    setUploadingCertIndex(index);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-certificate", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal mengunggah file.");

      setData((prev) => {
        const updated = [...(prev.certificates || [])];
        updated[index] = {
          ...updated[index],
          file: result.url,
          fileType: result.type,
          image: "",
        };
        return { ...prev, certificates: updated };
      });
    } catch (err) {
      setSaveStatus({
        show: true,
        success: false,
        message: err.message || "Failed to upload certificate file.",
      });
      setTimeout(() => setSaveStatus((prev) => ({ ...prev, show: false })), 5000);
    } finally {
      setUploadingCertIndex(null);
    }
  };

  // Projects helpers
  const handleAddProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [
        {
          title: "New Project",
          role: "Lead Full-Stack Engineer",
          period: "Jan 2026",
          techStack: ["Next.js", "React", "PostgreSQL"],
          shortDescription: "A modern software system built with high-fidelity architecture.",
          bulletPoints: ["Architected core backend and reactive user interfaces."],
          image: "",
          images: [],
          github: "",
          demo: "",
        },
        ...prev.projects,
      ],
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setData((prev) => {
      const updated = [...prev.projects];
      if (field === "techStack") {
        updated[index] = { ...updated[index], [field]: typeof value === "string" ? value.split(",").map((s) => s.trim()) : value };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, projects: updated };
    });
  };

  const handleMoveProject = (index, direction) => {
    setData((prev) => {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.projects.length) return prev;
      const updated = [...prev.projects];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return { ...prev, projects: updated };
    });
  };

  const handleRemoveProject = (index) => {
    if (!confirm("Are you sure you want to remove this project?")) return;
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, idx) => idx !== index),
    }));
  };

  // Project Slideshow Helpers
  const handleProjectAddSlide = (projIndex) => {
    setData((prev) => {
      const updated = [...prev.projects];
      const currentImages = Array.isArray(updated[projIndex].images) ? [...updated[projIndex].images] : [];
      updated[projIndex] = {
        ...updated[projIndex],
        images: [...currentImages, ""],
      };
      return { ...prev, projects: updated };
    });
  };

  const handleProjectSlideChange = (projIndex, slideIndex, val) => {
    setData((prev) => {
      const updated = [...prev.projects];
      const currentImages = Array.isArray(updated[projIndex].images) ? [...updated[projIndex].images] : [];
      currentImages[slideIndex] = val;
      updated[projIndex] = {
        ...updated[projIndex],
        images: currentImages,
        image: slideIndex === 0 && val ? val : (updated[projIndex].image || val),
      };
      return { ...prev, projects: updated };
    });
  };

  const handleProjectSlideRemove = (projIndex, slideIndex) => {
    setData((prev) => {
      const updated = [...prev.projects];
      const currentImages = Array.isArray(updated[projIndex].images) ? [...updated[projIndex].images] : [];
      const filtered = currentImages.filter((_, idx) => idx !== slideIndex);
      updated[projIndex] = {
        ...updated[projIndex],
        images: filtered,
        image: filtered[0] || updated[projIndex].image || "",
      };
      return { ...prev, projects: updated };
    });
  };

  const handleProjectSlideMove = (projIndex, slideIndex, direction) => {
    setData((prev) => {
      const updated = [...prev.projects];
      const currentImages = Array.isArray(updated[projIndex].images) ? [...updated[projIndex].images] : [];
      const target = direction === "left" ? slideIndex - 1 : slideIndex + 1;
      if (target < 0 || target >= currentImages.length) return prev;
      const temp = currentImages[slideIndex];
      currentImages[slideIndex] = currentImages[target];
      currentImages[target] = temp;
      updated[projIndex] = {
        ...updated[projIndex],
        images: currentImages,
        image: currentImages[0] || updated[projIndex].image,
      };
      return { ...prev, projects: updated };
    });
  };

  // Bullet Points helpers for projects
  const handleAddProjectBullet = (projIndex) => {
    setData((prev) => {
      const updated = [...prev.projects];
      updated[projIndex] = {
        ...updated[projIndex],
        bulletPoints: [...(updated[projIndex].bulletPoints || []), "New key deliverable or achievement"],
      };
      return { ...prev, projects: updated };
    });
  };

  const handleProjectBulletChange = (projIndex, bulletIndex, value) => {
    setData((prev) => {
      const updated = [...prev.projects];
      const bullets = [...(updated[projIndex].bulletPoints || [])];
      bullets[bulletIndex] = value;
      updated[projIndex] = { ...updated[projIndex], bulletPoints: bullets };
      return { ...prev, projects: updated };
    });
  };

  const handleRemoveProjectBullet = (projIndex, bulletIndex) => {
    setData((prev) => {
      const updated = [...prev.projects];
      updated[projIndex] = {
        ...updated[projIndex],
        bulletPoints: (updated[projIndex].bulletPoints || []).filter((_, idx) => idx !== bulletIndex),
      };
      return { ...prev, projects: updated };
    });
  };

  // Organizations helpers
  const handleAddOrganization = () => {
    setData((prev) => ({
      ...prev,
      organizations: [
        {
          role: "CHAIRMAN",
          organization: "Organization Name",
          period: "Jan 2026 - Present",
          location: "Tangerang, Indonesia",
          image: "",
          bulletPoints: ["Led core organizational activities and cross-functional team initiatives."],
        },
        ...prev.organizations,
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

  const handleMoveOrganization = (index, direction) => {
    setData((prev) => {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.organizations.length) return prev;
      const updated = [...prev.organizations];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return { ...prev, organizations: updated };
    });
  };

  const handleRemoveOrganization = (index) => {
    if (!confirm("Are you sure you want to remove this organization experience?")) return;
    setData((prev) => ({
      ...prev,
      organizations: prev.organizations.filter((_, idx) => idx !== index),
    }));
  };

  const handleAddOrgBullet = (orgIndex) => {
    setData((prev) => {
      const updated = [...prev.organizations];
      updated[orgIndex] = {
        ...updated[orgIndex],
        bulletPoints: [...(updated[orgIndex].bulletPoints || []), "Key leadership contribution or deliverable"],
      };
      return { ...prev, organizations: updated };
    });
  };

  const handleOrgBulletChange = (orgIndex, bulletIndex, value) => {
    setData((prev) => {
      const updated = [...prev.organizations];
      const bullets = [...(updated[orgIndex].bulletPoints || [])];
      bullets[bulletIndex] = value;
      updated[orgIndex] = { ...updated[orgIndex], bulletPoints: bullets };
      return { ...prev, organizations: updated };
    });
  };

  const handleRemoveOrgBullet = (orgIndex, bulletIndex) => {
    setData((prev) => {
      const updated = [...prev.organizations];
      updated[orgIndex] = {
        ...updated[orgIndex],
        bulletPoints: (updated[orgIndex].bulletPoints || []).filter((_, idx) => idx !== bulletIndex),
      };
      return { ...prev, organizations: updated };
    });
  };

  // Timeline helpers
  const handleAddTimeline = () => {
    setData((prev) => ({
      ...prev,
      timeline: [
        ...(prev.timeline || []),
        {
          year: "2026",
          month: "January",
          title: "Milestone Title",
          subtitle: "Organization / Project",
          description: "Description of the milestone achieved...",
          type: "milestone",
        },
      ],
    }));
  };

  // -------------------------------------------------------------
  // LOGIN SCREEN (Themesbrand Minia Edition - Themed to #FFF9F1)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen min-h-[100dvh] w-full bg-[#FFF9F1] text-[#17201C] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-[#5156BE] selection:text-white">
        {/* Soft Ambient Warm Glow matching Image 2 */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] bg-gradient-to-tr from-[#5156BE]/8 via-[#FC9073]/5 to-[#FFF9F1]/0 rounded-full blur-[100px] pointer-events-none" />

        {/* Subtle Architectural Dot Matrix */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            backgroundImage: "radial-gradient(#17201C 0.75px, transparent 0.75px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top Header Bar */}
        <div className="w-full max-w-[430px] mb-6 flex items-center justify-between relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#575C55] hover:text-[#17201C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAE3D6] shadow-xs text-[11px] font-mono font-medium text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Minia Console v4.2</span>
          </div>
        </div>

        {/* Minia Login Card */}
        <div className="w-full max-w-[430px] bg-white border border-[#EAE3D6] rounded-2xl p-7 sm:p-9 shadow-xl shadow-[#17201C]/5 relative z-10">
          <div className="text-center mb-6">
            {/* Minia Stylized Geometric Emblem */}
            <div className="w-14 h-14 rounded-2xl bg-[#5156BE] flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-[#5156BE]/25 ring-4 ring-[#F4ECE0]">
              <div className="flex items-end gap-1.5 h-5">
                <span className="w-1.5 h-3 bg-white/80 rounded-full" />
                <span className="w-1.5 h-5 bg-white rounded-full" />
                <span className="w-1.5 h-4 bg-white/90 rounded-full" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#17201C] tracking-tight">
              Welcome Back !
            </h1>
            <p className="text-xs text-[#666B63] mt-1.5 leading-relaxed">
              Sign in to continue to Minia Portfolio Console.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-[#3A433E] uppercase tracking-wider">
                  Passcode Access
                </label>
                <span className="text-[10px] font-mono text-[#8C9188]">Admin Authorization</span>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9188] pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoFocus
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (authError) setAuthError("");
                  }}
                  placeholder="Masukkan passcode admin..."
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#FCFAF7] border border-[#DFD7CB] focus:bg-white focus:border-[#5156BE] focus:ring-4 focus:ring-[#5156BE]/12 text-sm text-[#17201C] placeholder-[#9C9F98] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C9188] hover:text-[#17201C] p-1 transition-colors cursor-pointer"
                  title={showPassword ? "Hide passcode" : "Show passcode"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember & Session helper */}
            <div className="flex items-center justify-between text-xs text-[#666B63] pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#DFD7CB] text-[#5156BE] focus:ring-[#5156BE] accent-[#5156BE]"
                />
                <span className="text-[12px] font-medium text-[#575C55]">Ingat sesi ini</span>
              </label>
              <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                SSL Secured
              </span>
            </div>

            {/* Quick Access Helper Buttons for Demo */}
            <div className="p-2.5 rounded-xl bg-[#FCFAF7] border border-[#EAE3D6] flex items-center justify-between text-[11px]">
              <span className="text-[#737870] font-medium">Demo passcode:</span>
              <div className="flex items-center gap-1.5">
                {["admin123", "gammaura", "adjie"].map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setPasscode(key);
                      setAuthError("");
                    }}
                    className="px-2 py-0.5 rounded-md bg-white border border-[#DFD7CB] hover:border-[#5156BE] hover:text-[#5156BE] font-mono text-[10px] font-semibold text-[#575C55] transition-colors cursor-pointer shadow-2xs"
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-shake">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn || !passcode}
              className="w-full py-3 px-4 rounded-xl bg-[#5156BE] hover:bg-[#4348A8] active:scale-[0.99] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-[#5156BE]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi Otoritas...</span>
                </>
              ) : (
                <span>Masuk ke Dashboard</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#F3ECE1] flex items-center justify-between text-[11px] font-mono text-[#737870]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit Protection</span>
            </div>
            <span>Themesbrand • Minia</span>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (!data) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-[#FFF9F1] text-[#17201C] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#5156BE]" />
        <span className="text-sm font-semibold tracking-wide text-[#575C55]">Memuat database portofolio Minia...</span>
      </div>
    );
  }

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects Showcase", icon: FolderOpen, count: data.projects?.length || 0 },
    { id: "skills", label: "Technical Skills", icon: Code, count: data.skills?.length || 0 },
    { id: "organizations", label: "Organizations & Leadership", icon: Users, count: data.organizations?.length || 0 },
    { id: "certificates", label: "Certificates & Licenses", icon: Award, count: data.certificates?.length || 0 },
    { id: "profile", label: "Profile & Identity", icon: User },
    { id: "timeline", label: "Career Timeline", icon: MapPin, count: data.timeline?.length || 0 },
    { id: "messages", label: "Inquiries & Inbox", icon: MessageSquare, count: messages?.length || 0 },
  ];

  // -------------------------------------------------------------
  // MAIN MINIA ADMIN DASHBOARD (Themed to #FFF9F1)
  // -------------------------------------------------------------
  return (
    <div className="minia-workspace tailadmin-workspace font-sans selection:bg-[#5156BE] selection:text-white">
      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* ---------------------------------------------------------
          FIXED / STICKY SIDEBAR (Themesbrand Minia Sidebar)
      --------------------------------------------------------- */}
      <aside
        className={`minia-sidebar tailadmin-sidebar ${
          isMobileMenuOpen
            ? "fixed inset-y-0 left-0 z-50 shadow-2xl flex"
            : "hidden lg:flex"
        }`}
      >
        {/* Minia Brand Header */}
        <div className="p-5 border-b border-[#F3ECE1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5156BE] flex items-center justify-center text-white shadow-md shadow-[#5156BE]/20 shrink-0 ring-2 ring-[#F4ECE0]">
              <div className="flex items-end gap-1 h-4">
                <span className="w-1 h-2.5 bg-white/80 rounded-full" />
                <span className="w-1 h-4 bg-white rounded-full" />
                <span className="w-1 h-3 bg-white/90 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-[#17201C] tracking-tight leading-none">Minia</span>
                <span className="text-[9px] font-mono font-bold bg-[#5156BE]/10 text-[#5156BE] px-1.5 py-0.2 rounded">Console</span>
              </div>
              <span className="text-[10px] text-[#737870] font-medium block mt-1">Portfolio Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              target="_blank"
              className="p-2 rounded-lg hover:bg-[#F5EFE4] text-[#737870] hover:text-[#17201C] transition-colors"
              title="View Live Website"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#F5EFE4] text-[#737870]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="minia-sidebar-nav tailadmin-sidebar-nav flex-grow overflow-y-auto minia-scrollbar">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#8C9188]">
            MENU
          </div>
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#5156BE]/10 text-[#5156BE] font-bold shadow-2xs border-l-3 border-[#5156BE]"
                    : "text-[#575C55] hover:text-[#17201C] hover:bg-[#F8F3EA] font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComp className={`w-4 h-4 ${isActive ? "text-[#5156BE]" : "text-[#8C9188]"}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined ? (
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                      isActive ? "bg-[#5156BE] text-white" : "bg-[#F3ECE1] text-[#6C726A]"
                    }`}
                  >
                    {tab.count}
                  </span>
                ) : tab.id === "dashboard" ? (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Live
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#F3ECE1] bg-[#FCFAF7] space-y-2.5 shrink-0">
          <div className="flex items-center justify-between text-xs text-[#575C55] px-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-[#17201C] truncate max-w-[130px]">
                {data.profile?.name || "Adjie Rosandi"}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#8C9188]">v4.2</span>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-rose-50 hover:text-rose-600 text-[#575C55] text-xs font-semibold border border-[#EAE3D6] transition-all cursor-pointer shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Console</span>
          </button>
        </div>
      </aside>

      {/* ---------------------------------------------------------
          MAIN CONTENT WORKSPACE
      --------------------------------------------------------- */}
      <div className="minia-content-area tailadmin-content-area flex-1 flex flex-col min-w-0">
        {/* Sticky Top Header (Themesbrand Minia Topbar) */}
        <header className="minia-header tailadmin-header">
          <div className="flex items-center gap-3">
            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-[#DFD7CB] bg-white text-[#575C55] hover:text-[#17201C] cursor-pointer"
              title="Open Navigation"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Breadcrumb / Page Title */}
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5 text-xs text-[#737870]">
                <span className="font-semibold text-[#5156BE]">Minia</span>
                <span>/</span>
                <span className="text-[#17201C] capitalize font-medium">{activeTab}</span>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-44 sm:w-64">
              <Search className="w-4 h-4 text-[#8C9188] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-10 py-1.5 rounded-xl bg-white border border-[#DFD7CB] text-xs text-[#17201C] placeholder-[#9C9F98] focus:border-[#5156BE] focus:ring-2 focus:ring-[#5156BE]/12 outline-none transition-all"
                readOnly
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-[#F3ECE1] text-[9px] font-mono text-[#737870]">
                ⌘K
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Live Badge */}
            <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono font-medium text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Live Synced</span>
            </div>

            {/* Notification Bell with Messages badge */}
            <div className="relative">
              <button
                onClick={() => setActiveTab("messages")}
                className="w-9 h-9 rounded-xl border border-[#DFD7CB] bg-white text-[#575C55] hover:text-[#17201C] hover:bg-[#F8F3EA] flex items-center justify-center transition-colors cursor-pointer"
                title="Lihat pesan masuk"
              >
                <Bell className="w-4 h-4" />
              </button>
              {messages.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#5156BE] text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-xs">
                  {messages.length}
                </span>
              )}
            </div>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#EAE3D6]">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-[#DFD7CB] shrink-0">
                <img
                  src={data.profile?.avatar || "/assets/photo.png"}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden xl:block text-left leading-tight">
                <span className="text-xs font-bold text-[#17201C] block truncate max-w-[120px]">
                  {data.profile?.name?.split(" ")[0] || "Adjie"}
                </span>
                <span className="text-[10px] text-[#737870] font-medium">Administrator</span>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#5156BE] hover:bg-[#4348A8] active:bg-[#383C94] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-sm shadow-[#5156BE]/25 transition-all cursor-pointer disabled:cursor-wait"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden sm:inline">Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Save All Changes</span>
                  <span className="sm:hidden">Save</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Global Toast Alert */}
        {saveStatus.show && (
          <div className="px-6 pt-4">
            <div
              className={`p-4 rounded-xl border flex items-center justify-between shadow-xs ${
                saveStatus.success
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-rose-50 border-rose-200 text-rose-700"
              }`}
            >
              <div className="flex items-center gap-3">
                {saveStatus.success ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 shrink-0 text-rose-600" />
                )}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">
                    {saveStatus.success ? "Success" : "Error"}
                  </p>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">{saveStatus.message}</p>
                </div>
              </div>
              <button
                onClick={() => setSaveStatus((prev) => ({ ...prev, show: false }))}
                className="text-slate-400 hover:text-slate-700 text-xs px-2 py-1"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Workspace Body */}
        <main className="p-6 max-w-7xl w-full mx-auto space-y-6 flex-grow">
          {/* =====================================================
              TAB: DASHBOARD (Themesbrand Minia Edition)
              ===================================================== */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* MINIA 4-CARD METRIC STRIP WITH SIGNATURE SPARKLINES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {/* Metric 1: Showcase Projects */}
                <div className="minia-metric-card bg-white border border-[#EAE3D6] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex items-center justify-between text-xs text-[#737870] font-medium">
                    <span className="uppercase tracking-wider font-semibold text-[11px]">Showcase Projects</span>
                    <span className="text-[#9C9F98]">⋮</span>
                  </div>
                  <div className="my-2.5">
                    <h3 className="text-2xl font-bold text-[#17201C] tracking-tight">
                      {data.projects?.length || 15}
                    </h3>
                  </div>
                  <div className="flex items-end justify-between pt-2 border-t border-[#F3ECE1]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded-md">
                        +2 Live
                      </span>
                      <span className="text-[11px] text-[#737870]">Production</span>
                    </div>
                    <MiniaSparkline color="#5156BE" points={[10, 18, 14, 28, 24, 38, 32, 50, 44, 62]} />
                  </div>
                </div>

                {/* Metric 2: Core Tech Skills */}
                <div className="minia-metric-card bg-white border border-[#EAE3D6] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex items-center justify-between text-xs text-[#737870] font-medium">
                    <span className="uppercase tracking-wider font-semibold text-[11px]">Technical Skills</span>
                    <span className="text-[#9C9F98]">⋮</span>
                  </div>
                  <div className="my-2.5">
                    <h3 className="text-2xl font-bold text-[#17201C] tracking-tight">
                      {data.skills?.length || 18}
                    </h3>
                  </div>
                  <div className="flex items-end justify-between pt-2 border-t border-[#F3ECE1]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded-md">
                        Verified
                      </span>
                      <span className="text-[11px] text-[#737870]">Full-Stack &amp; AI</span>
                    </div>
                    <MiniaSparkline color="#2AB57D" points={[15, 22, 28, 25, 36, 32, 42, 48, 45, 58]} />
                  </div>
                </div>

                {/* Metric 3: Certifications & Leadership */}
                <div className="minia-metric-card bg-white border border-[#EAE3D6] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex items-center justify-between text-xs text-[#737870] font-medium">
                    <span className="uppercase tracking-wider font-semibold text-[11px]">Certs &amp; Leadership</span>
                    <span className="text-[#9C9F98]">⋮</span>
                  </div>
                  <div className="my-2.5">
                    <h3 className="text-2xl font-bold text-[#17201C] tracking-tight">
                      {(data.certificates?.length || 4) + (data.organizations?.length || 4)}
                    </h3>
                  </div>
                  <div className="flex items-end justify-between pt-2 border-t border-[#F3ECE1]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-200/60 px-1.5 py-0.5 rounded-md">
                        Active
                      </span>
                      <span className="text-[11px] text-[#737870]">Esa Unggul</span>
                    </div>
                    <MiniaSparkline color="#4BA6EF" points={[8, 14, 18, 16, 26, 30, 28, 38, 42, 50]} />
                  </div>
                </div>

                {/* Metric 4: Client & Recruiter Inquiries */}
                <div className="minia-metric-card bg-white border border-[#EAE3D6] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex items-center justify-between text-xs text-[#737870] font-medium">
                    <span className="uppercase tracking-wider font-semibold text-[11px]">Client Inquiries</span>
                    <span className="text-[#9C9F98]">⋮</span>
                  </div>
                  <div className="my-2.5">
                    <h3 className="text-2xl font-bold text-[#17201C] tracking-tight">
                      {messages?.length || 0}
                    </h3>
                  </div>
                  <div className="flex items-end justify-between pt-2 border-t border-[#F3ECE1]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200/60 px-1.5 py-0.5 rounded-md">
                        {messages?.length > 0 ? `${messages.length} Baru` : "Inbox"}
                      </span>
                      <span className="text-[11px] text-[#737870]">Live Feed</span>
                    </div>
                    <MiniaSparkline color="#FD625E" points={[5, 12, 10, 18, 15, 24, 22, 30, 28, 40]} />
                  </div>
                </div>
              </div>

              {/* MIDDLE 2-COLUMN SECTION: Engineering Activity + Lead Profile */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Column 1 (2/3 width): Engineering Activity Chart */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white border border-[#EAE3D6] rounded-2xl p-6 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                      <div>
                        <h2 className="text-base font-bold text-[#17201C] tracking-tight">
                          Engineering &amp; Project Activity
                        </h2>
                        <p className="text-xs text-[#737870] mt-0.5">
                          Total production commits &amp; architecture milestones: 70.5K+
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <select
                          value={activityPeriod}
                          onChange={(e) => setActivityPeriod(e.target.value)}
                          className="px-3 py-1.5 rounded-xl border border-[#DFD7CB] bg-[#FCFAF7] text-xs font-semibold text-[#17201C] outline-none cursor-pointer"
                        >
                          <option value="monthly">Monthly Activity</option>
                          <option value="quarterly">Quarterly Releases</option>
                          <option value="yearly">Yearly Summary</option>
                        </select>
                      </div>
                    </div>

                    {/* Chart Legend tailored to Adjie's specialties */}
                    <div className="flex items-center gap-5 text-xs font-semibold mb-6">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#5156BE]" />
                        <span className="text-[#575C55]">Production Code</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2AB57D]" />
                        <span className="text-[#575C55]">AI &amp; Systems</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#4BA6EF]" />
                        <span className="text-[#575C55]">Deliveries &amp; Releases</span>
                      </div>
                    </div>

                    {/* Grouped Bar Chart Visualization */}
                    <div className="relative pt-4">
                      {/* Grid lines */}
                      <div className="flex flex-col gap-6 text-[11px] font-mono text-[#8C9188] border-b border-[#F3ECE1] pb-2">
                        <div className="flex items-center gap-4">
                          <span className="w-7 text-right">200</span>
                          <div className="flex-1 h-px bg-[#F3ECE1]" />
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="w-7 text-right">120</span>
                          <div className="flex-1 h-px bg-[#F3ECE1]" />
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="w-7 text-right">60</span>
                          <div className="flex-1 h-px bg-[#F3ECE1]" />
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="w-7 text-right">30</span>
                          <div className="flex-1 h-px bg-[#F3ECE1]" />
                        </div>
                      </div>

                      {/* 10 Monthly Grouped Bars */}
                      <div className="grid grid-cols-10 gap-2 sm:gap-4 pt-4 text-center">
                        {[
                          { m: "Jan", h1: 52, h2: 120, h3: 45 },
                          { m: "Feb", h1: 65, h2: 140, h3: 55 },
                          { m: "Mar", h1: 85, h2: 195, h3: 50 },
                          { m: "Apr", h1: 75, h2: 180, h3: 35 },
                          { m: "May", h1: 95, h2: 155, h3: 72 },
                          { m: "Jun", h1: 115, h2: 190, h3: 70 },
                          { m: "Jul", h1: 90, h2: 160, h3: 65 },
                          { m: "Aug", h1: 110, h2: 200, h3: 68 },
                          { m: "Sep", h1: 95, h2: 170, h3: 60 },
                          { m: "Oct", h1: 105, h2: 175, h3: 68 },
                        ].map((item, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <div className="h-44 w-full flex items-end justify-center gap-1">
                              {/* Production Code Bar */}
                              <div
                                style={{ height: `${(item.h1 / 200) * 100}%` }}
                                className="w-1.5 sm:w-2.5 bg-[#5156BE] rounded-t-sm transition-all hover:opacity-80"
                                title={`Production Code: ${item.h1}`}
                              />
                              {/* AI & Systems Bar */}
                              <div
                                style={{ height: `${(item.h2 / 200) * 100}%` }}
                                className="w-1.5 sm:w-2.5 bg-[#2AB57D] rounded-t-sm transition-all hover:opacity-80"
                                title={`AI & Architecture: ${item.h2}`}
                              />
                              {/* Releases Bar */}
                              <div
                                style={{ height: `${(item.h3 / 200) * 100}%` }}
                                className="w-1.5 sm:w-2.5 bg-[#4BA6EF] rounded-t-sm transition-all hover:opacity-80"
                                title={`Deliveries: ${item.h3}`}
                              />
                            </div>
                            <span className="text-[11px] font-medium text-[#737870] mt-2 block">
                              {item.m}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Sub-row: Production Systems & Core Architecture */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Live Systems Card */}
                    <div className="bg-white border border-[#EAE3D6] rounded-2xl p-6 shadow-xs relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#737870] font-semibold">Production Systems</span>
                        <span className="text-[#8C9188]">⋮</span>
                      </div>
                      <h3 className="text-2xl font-black text-[#17201C] tracking-tight">
                        {data.projects?.length || 15}+ Scaled Apps
                      </h3>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F3ECE1] text-xs">
                        <div>
                          <span className="text-[#737870] block text-[11px]">Database Synchronization</span>
                          <span className="font-bold text-emerald-700 text-sm">100% Synced</span>
                        </div>
                        {/* Mini Sparkline Graphic */}
                        <svg className="w-24 h-8 text-emerald-600 stroke-current fill-none stroke-2" viewBox="0 0 100 30">
                          <path d="M0 25 Q 25 20, 40 22 T 70 8 T 100 2" />
                        </svg>
                      </div>
                    </div>

                    {/* Core Tech Stack Health */}
                    <div className="bg-white border border-[#EAE3D6] rounded-2xl p-6 shadow-xs relative">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-xs text-[#737870] font-semibold block">Core Stack &amp; MAS</span>
                          <span className="text-[11px] text-[#8C9188]">Next.js • Python • PostgreSQL • MAS</span>
                        </div>
                        <span className="text-[#8C9188]">⋮</span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-2">
                        <h3 className="text-2xl font-black text-[#17201C] tracking-tight">4 Core</h3>
                        <span className="text-xs font-bold text-emerald-700">Pillars Integrated</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#F3ECE1] text-xs text-[#575C55] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>All Systems Operational</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2 (1/3 width): Lead Profile & Quick Jump Links */}
                <div className="space-y-6">
                  {/* Portfolio Identity Card */}
                  <div className="bg-white border border-[#EAE3D6] rounded-2xl p-6 shadow-xs space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-[#17201C]">Portfolio Identity</h3>
                        <p className="text-xs text-[#737870] mt-0.5">Primary developer credentials</p>
                      </div>
                      <span className="text-[#8C9188]">⋮</span>
                    </div>

                    {/* Profile Visual Badge */}
                    <div className="w-full rounded-xl overflow-hidden border border-[#EAE3D6] p-4 bg-[#FCFAF7] flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#DFD7CB] shrink-0 bg-white">
                        <img src={data.profile?.avatar || "/assets/photo.png"} alt="Adjie" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#17201C] text-sm">{data.profile?.name || "Arditya Adjie Rosandi"}</h4>
                        <p className="text-xs text-[#5156BE] font-semibold">Full-Stack &amp; IT PM</p>
                        <p className="text-[11px] text-[#737870] font-mono mt-0.5">IPK 3.84 • Univ. Esa Unggul</p>
                      </div>
                    </div>

                    {/* Status & Milestones */}
                    <div className="pt-2 border-t border-[#F3ECE1] space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-[#8C9188] uppercase font-semibold">Base Location</span>
                          <p className="font-mono font-bold text-xs text-[#17201C]">{data.profile?.location || "Tangerang, Banten"}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Open to Work
                        </span>
                      </div>

                      {/* Milestones / Core Roles */}
                      <div className="space-y-3 pt-2 text-xs">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#5156BE]/10 text-[#5156BE] flex items-center justify-center shrink-0 border border-[#5156BE]/20">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div className="flex-1 flex justify-between">
                            <div>
                              <p className="font-bold text-[#17201C]">Full-Stack Development</p>
                              <p className="text-[11px] text-[#737870]">Next.js 16, React, Tailwind, PostgreSQL</p>
                            </div>
                            <span className="text-emerald-700 font-mono text-[11px] font-bold">PROD</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#2AB57D]/10 text-[#2AB57D] flex items-center justify-center shrink-0 border border-[#2AB57D]/20">
                            <Code className="w-4 h-4" />
                          </div>
                          <div className="flex-1 flex justify-between">
                            <div>
                              <p className="font-bold text-[#17201C]">Multi-Agent AI &amp; NLP</p>
                              <p className="text-[11px] text-[#737870]">Python, IndoBERT, Workflow Automation</p>
                            </div>
                            <span className="text-emerald-700 font-mono text-[11px] font-bold">MAS</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#4BA6EF]/10 text-[#4BA6EF] flex items-center justify-center shrink-0 border border-[#4BA6EF]/20">
                            <Award className="w-4 h-4" />
                          </div>
                          <div className="flex-1 flex justify-between">
                            <div>
                              <p className="font-bold text-[#17201C]">IT Project Management</p>
                              <p className="text-[11px] text-[#737870]">Roadmap planning &amp; clean delivery</p>
                            </div>
                            <span className="text-emerald-700 font-mono text-[11px] font-bold">LEAD</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Contact Inquiries Feed Widget */}
                  <div className="bg-white border border-[#EAE3D6] rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#5156BE]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#17201C]">
                          Recent Inquiries ({messages?.length || 0})
                        </h4>
                      </div>
                      <button
                        onClick={() => setActiveTab("messages")}
                        className="text-[11px] font-semibold text-[#5156BE] hover:underline cursor-pointer"
                      >
                        View All
                      </button>
                    </div>

                    {messages && messages.length > 0 ? (
                      <div className="space-y-2.5 pt-1">
                        {messages.slice(0, 3).map((msg) => (
                          <div
                            key={msg.id}
                            className="p-3 rounded-xl bg-[#FCFAF7] border border-[#EAE3D6] text-xs space-y-1 hover:border-[#5156BE]/40 transition-colors"
                          >
                            <div className="flex items-center justify-between font-bold text-[#17201C]">
                              <span className="truncate max-w-[150px]">{msg.name}</span>
                              <span className="text-[10px] font-mono text-[#8C9188] font-normal">
                                {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : "Baru"}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#575C55] line-clamp-2 leading-relaxed">
                              {msg.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-xs text-[#8C9188] bg-[#FCFAF7] rounded-xl border border-dashed border-[#DFD7CB]">
                        <Mail className="w-5 h-5 mx-auto mb-1 text-[#8C9188]" />
                        <span>Belum ada pesan masuk dari form kontak.</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Jump Buttons to Portfolio Editors */}
                  <div className="bg-white border border-[#EAE3D6] rounded-2xl p-5 shadow-xs space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C9188] mb-3">
                      Manage Portfolio Data
                    </h4>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#DFD7CB] hover:bg-[#F8F3EA] text-xs font-semibold text-[#17201C] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <FolderOpen className="w-4 h-4 text-[#5156BE]" />
                        Edit Projects Showcase ({data.projects?.length || 0})
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#8C9188]" />
                    </button>
                    <button
                      onClick={() => setActiveTab("skills")}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#DFD7CB] hover:bg-[#F8F3EA] text-xs font-semibold text-[#17201C] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-[#5156BE]" />
                        Manage Skills ({data.skills?.length || 0})
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#8C9188]" />
                    </button>
                    <button
                      onClick={() => setActiveTab("profile")}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#DFD7CB] hover:bg-[#F8F3EA] text-xs font-semibold text-[#17201C] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#5156BE]" />
                        Update Profile &amp; Bio
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#8C9188]" />
                    </button>
                    <button
                      onClick={() => setActiveTab("certificates")}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#DFD7CB] hover:bg-[#F8F3EA] text-xs font-semibold text-[#17201C] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#5156BE]" />
                        Manage Certifications ({data.certificates?.length || 0})
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#8C9188]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------
              TAB: PROJECTS
          ----------------------------------------------------- */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">Project Catalog & Showcase</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Configure cover logos, 3-thumbnail interactive auto-slideshow images, tech stacks, and live demo links.
                  </p>
                </div>
                <button
                  onClick={handleAddProject}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 font-bold text-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Project</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="space-y-6">
                {data.projects.map((project, idx) => {
                  const slideImages = Array.isArray(project.images) && project.images.length > 0
                    ? project.images
                    : (project.image ? [project.image] : []);

                  return (
                    <div
                      key={idx}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative group hover:border-slate-700 transition-all space-y-6"
                    >
                      {/* Project Card Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-slate-800 text-blue-400 font-mono text-xs font-bold flex items-center justify-center border border-slate-700">
                            #{idx + 1}
                          </span>
                          <div>
                            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                              {project.title || "Untitled Project"}
                              {project.demo && (
                                <Link
                                  href={project.demo.startsWith("http") ? project.demo : `https://${project.demo}`}
                                  target="_blank"
                                  className="text-xs text-blue-400 hover:underline flex items-center gap-0.5 font-normal"
                                >
                                  <span>Live</span>
                                  <ExternalLink className="w-3 h-3" />
                                </Link>
                              )}
                            </h3>
                            <p className="text-xs text-slate-400 font-medium">
                              {project.role} · {project.period}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleMoveProject(idx, "up")}
                            disabled={idx === 0}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-400 hover:text-white transition-colors"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveProject(idx, "down")}
                            disabled={idx === data.projects.length - 1}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-400 hover:text-white transition-colors"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleRemoveProject(idx)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* -----------------------------------------------
                          DYNAMIC IMAGE & SLIDESHOW MANAGER
                      ------------------------------------------------ */}
                      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-5 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <ImageIcon className="w-4 h-4 text-blue-400" />
                              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                                Showcase Visuals & 3-Thumbnail Slideshow
                              </h4>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              Slide 1 is typically the Logo, Slide 2 is the Website UI, and Slide 3 is the App Workspace.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleProjectAddSlide(idx)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300 py-1 px-2.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 transition-all cursor-pointer self-start sm:self-auto"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Slide Image</span>
                          </button>
                        </div>

                        {/* Slide Thumbnails Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {slideImages.map((imgUrl, sIdx) => {
                            const slideLabels = ["Slide 1 · Brand Logo", "Slide 2 · Website UI", "Slide 3 · Feature View"];
                            const label = slideLabels[sIdx] || `Slide ${sIdx + 1}`;
                            const isUploadingThis = uploadingImageKey === `proj-${idx}-slide-${sIdx}`;

                            return (
                              <div
                                key={sIdx}
                                className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-3 relative group/slide"
                              >
                                <div>
                                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 mb-2">
                                    <span className="text-blue-400 font-mono">{label}</span>
                                    <div className="flex items-center gap-1">
                                      <button
                                        type="button"
                                        disabled={sIdx === 0}
                                        onClick={() => handleProjectSlideMove(idx, sIdx, "left")}
                                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-20 text-slate-400 hover:text-white"
                                        title="Move Left"
                                      >
                                        ←
                                      </button>
                                      <button
                                        type="button"
                                        disabled={sIdx === slideImages.length - 1}
                                        onClick={() => handleProjectSlideMove(idx, sIdx, "right")}
                                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-20 text-slate-400 hover:text-white"
                                        title="Move Right"
                                      >
                                        →
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleProjectSlideRemove(idx, sIdx)}
                                        className="p-1 rounded bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
                                        title="Delete Slide"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Thumbnail Preview */}
                                  <div className="w-full aspect-[16/10] rounded-lg overflow-hidden bg-slate-950 border border-slate-800 relative flex items-center justify-center mb-2.5">
                                    {imgUrl ? (
                                      <Image
                                        src={imgUrl}
                                        alt={`Slide ${sIdx + 1}`}
                                        fill
                                        sizes="200px"
                                        className="object-contain p-2"
                                      />
                                    ) : (
                                      <div className="flex flex-col items-center text-slate-600 gap-1">
                                        <ImageIcon className="w-6 h-6" />
                                        <span className="text-[10px]">No image set</span>
                                      </div>
                                    )}

                                    {isUploadingThis && (
                                      <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center text-blue-400 gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-[10px] font-bold">Uploading...</span>
                                      </div>
                                    )}
                                  </div>

                                  {/* URL Input */}
                                  <input
                                    type="text"
                                    value={imgUrl}
                                    onChange={(e) => handleProjectSlideChange(idx, sIdx, e.target.value)}
                                    placeholder="e.g. /velora.png or https://..."
                                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-blue-500 text-[11px] font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
                                  />
                                </div>

                                {/* Upload Button */}
                                <label className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-[11px] font-semibold text-center cursor-pointer flex items-center justify-center gap-1.5 transition-colors">
                                  <Upload className="w-3 h-3 text-blue-400" />
                                  <span>Upload File</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        handleUploadImageFile(
                                          file,
                                          (url) => handleProjectSlideChange(idx, sIdx, url),
                                          `proj-${idx}-slide-${sIdx}`
                                        );
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            );
                          })}

                          {slideImages.length === 0 && (
                            <div className="md:col-span-3 py-6 text-center border border-dashed border-slate-800 rounded-xl">
                              <p className="text-xs text-slate-500 mb-2">No slideshow images added yet.</p>
                              <button
                                type="button"
                                onClick={() => handleProjectAddSlide(idx)}
                                className="text-xs text-blue-400 hover:underline font-bold"
                              >
                                + Click here to add Slide 1 (Logo)
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Project Fields Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Project Title
                          </label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs font-semibold text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Role / Engineering Title
                          </label>
                          <input
                            type="text"
                            value={project.role}
                            onChange={(e) => handleProjectChange(idx, "role", e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs font-semibold text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Period
                          </label>
                          <input
                            type="text"
                            value={project.period}
                            onChange={(e) => handleProjectChange(idx, "period", e.target.value)}
                            placeholder="e.g. Jul – Agu 2026"
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Tech Stack (Comma Separated)
                          </label>
                          <input
                            type="text"
                            value={Array.isArray(project.techStack) ? project.techStack.join(", ") : project.techStack}
                            onChange={(e) => handleProjectChange(idx, "techStack", e.target.value)}
                            placeholder="Next.js, Python, PostgreSQL"
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs font-mono text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Live Demo URL
                          </label>
                          <input
                            type="text"
                            value={project.demo || ""}
                            onChange={(e) => handleProjectChange(idx, "demo", e.target.value)}
                            placeholder="https://velorastudio.id"
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs font-mono text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            GitHub Repository URL
                          </label>
                          <input
                            type="text"
                            value={project.github || ""}
                            onChange={(e) => handleProjectChange(idx, "github", e.target.value)}
                            placeholder="https://github.com/Gammaura/..."
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs font-mono text-white focus:outline-none"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Short Description
                          </label>
                          <textarea
                            rows={2}
                            value={project.shortDescription}
                            onChange={(e) => handleProjectChange(idx, "shortDescription", e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs text-white focus:outline-none leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Bullet Points */}
                      <div className="space-y-2 pt-2 border-t border-slate-800">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Key Deliverables & Responsibilities
                          </label>
                          <button
                            type="button"
                            onClick={() => handleAddProjectBullet(idx)}
                            className="text-[11px] text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Deliverable</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {(project.bulletPoints || []).map((bp, bpIdx) => (
                            <div key={bpIdx} className="flex items-center gap-2">
                              <span className="text-slate-600 text-xs">•</span>
                              <input
                                type="text"
                                value={bp}
                                onChange={(e) => handleProjectBulletChange(idx, bpIdx, e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs text-slate-200 focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveProjectBullet(idx, bpIdx)}
                                className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                                title="Delete bullet"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* -----------------------------------------------------
              TAB: ORGANIZATIONS
          ----------------------------------------------------- */}
          {activeTab === "organizations" && (
            <div className="space-y-6">
              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">Organizations & Leadership Experience</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Configure leadership roles, organization names, locations, cover photos, and governance bullet points.
                  </p>
                </div>
                <button
                  onClick={handleAddOrganization}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 font-bold text-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Organization</span>
                </button>
              </div>

              {/* Organizations List */}
              <div className="space-y-6">
                {data.organizations.map((org, idx) => {
                  const isUploadingOrg = uploadingImageKey === `org-${idx}`;

                  return (
                    <div
                      key={idx}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative hover:border-slate-750 transition-all space-y-6"
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-slate-800 text-blue-400 font-mono text-xs font-bold flex items-center justify-center border border-slate-700">
                            #{idx + 1}
                          </span>
                          <div>
                            <h3 className="text-base font-extrabold text-white tracking-tight">
                              {org.role} · {org.organization}
                            </h3>
                            <p className="text-xs text-slate-400 font-medium">
                              {org.period} · {org.location}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleMoveOrganization(idx, "up")}
                            disabled={idx === 0}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-400 hover:text-white transition-colors"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveOrganization(idx, "down")}
                            disabled={idx === data.organizations.length - 1}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-400 hover:text-white transition-colors"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleRemoveOrganization(idx)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Delete Organization"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Visual Cover Photo & Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Visual Image Manager */}
                        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                              Organization Photo / Logo
                            </label>

                            <div className="w-full aspect-[16/10] rounded-lg overflow-hidden bg-slate-900 border border-slate-800 relative flex items-center justify-center mb-3">
                              {org.image ? (
                                <Image
                                  src={org.image}
                                  alt={org.organization}
                                  fill
                                  sizes="250px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex flex-col items-center text-slate-600 gap-1">
                                  <Users className="w-6 h-6" />
                                  <span className="text-[10px]">No photo set (using default emblem)</span>
                                </div>
                              )}

                              {isUploadingOrg && (
                                <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center text-blue-400 gap-2">
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span className="text-[10px] font-bold">Uploading...</span>
                                </div>
                              )}
                            </div>

                            <input
                              type="text"
                              value={org.image || ""}
                              onChange={(e) => handleOrganizationChange(idx, "image", e.target.value)}
                              placeholder="e.g. /codehub.png or https://..."
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-blue-500 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
                            />
                          </div>

                          <label className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold text-center cursor-pointer flex items-center justify-center gap-1.5 transition-colors">
                            <Upload className="w-3.5 h-3.5 text-blue-400" />
                            <span>Upload Organization Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleUploadImageFile(
                                    file,
                                    (url) => handleOrganizationChange(idx, "image", url),
                                    `org-${idx}`
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>

                        {/* Metadata Inputs */}
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                              Role / Title
                            </label>
                            <input
                              type="text"
                              value={org.role}
                              onChange={(e) => handleOrganizationChange(idx, "role", e.target.value)}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs font-semibold text-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                              Organization Name
                            </label>
                            <input
                              type="text"
                              value={org.organization}
                              onChange={(e) => handleOrganizationChange(idx, "organization", e.target.value)}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs font-semibold text-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                              Period
                            </label>
                            <input
                              type="text"
                              value={org.period}
                              onChange={(e) => handleOrganizationChange(idx, "period", e.target.value)}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                              Location
                            </label>
                            <input
                              type="text"
                              value={org.location}
                              onChange={(e) => handleOrganizationChange(idx, "location", e.target.value)}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs text-white focus:outline-none"
                            />
                          </div>

                          {/* Bullet Points */}
                          <div className="sm:col-span-2 space-y-2 pt-2 border-t border-slate-800">
                            <div className="flex items-center justify-between">
                              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Key Contributions & Responsibilities
                              </label>
                              <button
                                type="button"
                                onClick={() => handleAddOrgBullet(idx)}
                                className="text-[11px] text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add Contribution</span>
                              </button>
                            </div>

                            <div className="space-y-2">
                              {(org.bulletPoints || []).map((bp, bpIdx) => (
                                <div key={bpIdx} className="flex items-center gap-2">
                                  <span className="text-slate-600 text-xs">•</span>
                                  <input
                                    type="text"
                                    value={bp}
                                    onChange={(e) => handleOrgBulletChange(idx, bpIdx, e.target.value)}
                                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs text-slate-200 focus:outline-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveOrgBullet(idx, bpIdx)}
                                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                                    title="Delete bullet"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* -----------------------------------------------------
              TAB: PROFILE
          ----------------------------------------------------- */}
          {activeTab === "profile" && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <h2 className="text-base font-bold text-white tracking-tight">Main Profile & Identity</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update primary developer information displayed across the hero header, footer, and metadata.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Avatar / Photo Upload Card */}
                <div className="md:col-span-2 p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 shrink-0 shadow-inner">
                    <img
                      src={data.profile.avatar || "/assets/photo.png"}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow space-y-1 text-center sm:text-left w-full">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Avatar / Polaroid Photo
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Foto ini otomatis tampil di kartu polaroid About dan Footer website.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-2 pt-1 w-full">
                      <label className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-colors shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Foto Baru</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleUploadImageFile(
                                file,
                                (url) => handleProfileChange("avatar", url),
                                "profile-avatar"
                              );
                            }
                          }}
                        />
                      </label>
                      <input
                        type="text"
                        value={data.profile.avatar || ""}
                        onChange={(e) => handleProfileChange("avatar", e.target.value)}
                        placeholder="/assets/photo.png atau URL eksternal"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={data.profile.name || ""}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm font-semibold text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Nickname (Sapaan Polaroid: Hi, I'm ...)
                  </label>
                  <input
                    type="text"
                    value={data.profile.nickname || ""}
                    onChange={(e) => handleProfileChange("nickname", e.target.value)}
                    placeholder="Contoh: Adjie"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm font-semibold text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Title / Engineering Specialization
                  </label>
                  <input
                    type="text"
                    value={data.profile.title || ""}
                    onChange={(e) => handleProfileChange("title", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm font-semibold text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={data.profile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm font-mono text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={data.profile.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm font-mono text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) => handleProfileChange("location", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    GitHub Profile URL
                  </label>
                  <input
                    type="text"
                    value={data.profile.github}
                    onChange={(e) => handleProfileChange("github", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm font-mono text-white focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="text"
                    value={data.profile.linkedin}
                    onChange={(e) => handleProfileChange("linkedin", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm font-mono text-white focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Professional Bio Summary
                  </label>
                  <textarea
                    rows={4}
                    value={data.profile.about}
                    onChange={(e) => handleProfileChange("about", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm text-white focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------
              TAB: SKILLS
          ----------------------------------------------------- */}
          {activeTab === "skills" && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">Technical Skills & Competencies</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Categorized programming languages, frameworks, and developer tooling.
                  </p>
                </div>
                <button
                  onClick={handleAddSkill}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 font-bold text-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 group hover:border-slate-700 transition-all"
                  >
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(idx, "name", e.target.value)}
                        className="w-full px-2 py-1 rounded bg-transparent border-b border-transparent focus:border-blue-500 text-xs font-bold text-white focus:outline-none"
                      />
                      <div className="flex items-center gap-2">
                        <select
                          value={skill.category}
                          onChange={(e) => handleSkillChange(idx, "category", e.target.value)}
                          className="text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-300 rounded px-1.5 py-0.5 focus:outline-none"
                        >
                          <option value="Programming">Programming</option>
                          <option value="Web Development">Web Development</option>
                          <option value="Database">Database</option>
                          <option value="Machine Learning">Machine Learning</option>
                          <option value="Tools">Tools</option>
                          <option value="Others">Others</option>
                        </select>
                        <select
                          value={skill.level}
                          onChange={(e) => handleSkillChange(idx, "level", e.target.value)}
                          className="text-[10px] font-semibold bg-slate-900 border border-slate-800 text-blue-400 rounded px-1.5 py-0.5 focus:outline-none"
                        >
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveSkill(idx)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Delete Skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -----------------------------------------------------
              TAB: CERTIFICATES
          ----------------------------------------------------- */}
          {activeTab === "certificates" && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">Certifications & Licenses</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Official certifications, credentials, and verifiable achievement documents.
                  </p>
                </div>
                <button
                  onClick={handleAddCertificate}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 font-bold text-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Certificate</span>
                </button>
              </div>

              <div className="space-y-4">
                {(data.certificates || []).map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 relative group"
                  >
                    <button
                      onClick={() => handleRemoveCertificate(idx)}
                      className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete Certificate"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Certificate Title
                        </label>
                        <input
                          type="text"
                          value={cert.title}
                          onChange={(e) => handleCertificateChange(idx, "title", e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-xs font-semibold text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Issuer Organization
                        </label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => handleCertificateChange(idx, "issuer", e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Issue Year / Date
                        </label>
                        <input
                          type="text"
                          value={cert.date}
                          onChange={(e) => handleCertificateChange(idx, "date", e.target.value)}
                          placeholder="e.g. 2026"
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Credential URL (Verify Link)
                        </label>
                        <input
                          type="text"
                          value={cert.credentialUrl || ""}
                          onChange={(e) => handleCertificateChange(idx, "credentialUrl", e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-xs font-mono text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Certificate File (PDF / Image)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={cert.file || ""}
                            onChange={(e) => handleCertificateChange(idx, "file", e.target.value)}
                            placeholder="/certificates/..."
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-xs font-mono text-white focus:outline-none"
                          />
                          <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold shrink-0 cursor-pointer flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5 text-blue-400" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*,application/pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleCertificateUpload(idx, file);
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -----------------------------------------------------
              TAB: TIMELINE
          ----------------------------------------------------- */}
          {activeTab === "timeline" && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">Career Journey Timeline</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Milestones, academic progress, and key life events displayed on the timeline.
                  </p>
                </div>
                <button
                  onClick={handleAddTimeline}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 font-bold text-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Milestone</span>
                </button>
              </div>

              <div className="space-y-4">
                {(data.timeline || []).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 relative group"
                  >
                    <button
                      onClick={() => {
                        setData((prev) => ({
                          ...prev,
                          timeline: prev.timeline.filter((_, i) => i !== idx),
                        }));
                      }}
                      className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete Milestone"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Year
                        </label>
                        <input
                          type="text"
                          value={item.year}
                          onChange={(e) => {
                            const updated = [...data.timeline];
                            updated[idx] = { ...updated[idx], year: e.target.value };
                            setData({ ...data, timeline: updated });
                          }}
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Month
                        </label>
                        <input
                          type="text"
                          value={item.month}
                          onChange={(e) => {
                            const updated = [...data.timeline];
                            updated[idx] = { ...updated[idx], month: e.target.value };
                            setData({ ...data, timeline: updated });
                          }}
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Title
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...data.timeline];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setData({ ...data, timeline: updated });
                          }}
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-xs font-semibold text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Type
                        </label>
                        <select
                          value={item.type || "milestone"}
                          onChange={(e) => {
                            const updated = [...data.timeline];
                            updated[idx] = { ...updated[idx], type: e.target.value };
                            setData({ ...data, timeline: updated });
                          }}
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-xs text-white focus:outline-none"
                        >
                          <option value="start">Start</option>
                          <option value="milestone">Milestone</option>
                          <option value="work">Work</option>
                          <option value="future">Future</option>
                        </select>
                      </div>

                      <div className="md:col-span-4">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...data.timeline];
                            updated[idx] = { ...updated[idx], description: e.target.value };
                            setData({ ...data, timeline: updated });
                          }}
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -----------------------------------------------------
              TAB: INQUIRIES & INBOX (Themesbrand Minia Edition)
          ----------------------------------------------------- */}
          {activeTab === "messages" && (
            <div className="bg-white border border-[#EAE3D6] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F3ECE1]">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-[#17201C] tracking-tight">Client &amp; Recruiter Inquiries</h2>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#5156BE]/10 text-[#5156BE]">
                      {messages?.length || 0} Total Messages
                    </span>
                  </div>
                  <p className="text-xs text-[#737870] mt-0.5">
                    Pesan masuk yang dikirim pengunjung melalui formulir kontak portofolio.
                  </p>
                </div>
                <button
                  onClick={async () => {
                    setIsLoadingMessages(true);
                    try {
                      const msgs = await getContactMessages();
                      setMessages(msgs || []);
                    } catch (e) {
                      console.warn(e);
                    } finally {
                      setIsLoadingMessages(false);
                    }
                  }}
                  disabled={isLoadingMessages}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FCFAF7] hover:bg-[#F3ECE1] border border-[#DFD7CB] text-[#17201C] font-semibold text-xs transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMessages ? "animate-spin text-[#5156BE]" : "text-[#737870]"}`} />
                  <span>Refresh Inbox</span>
                </button>
              </div>

              {messages && messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-5 rounded-xl bg-[#FCFAF7] border border-[#EAE3D6] space-y-3 relative group hover:border-[#5156BE]/40 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#5156BE]/10 text-[#5156BE] flex items-center justify-center font-bold text-sm shrink-0 border border-[#5156BE]/20">
                            {msg.name ? msg.name.charAt(0).toUpperCase() : "M"}
                          </div>
                          <div>
                            <h3 className="font-bold text-[#17201C] text-sm">{msg.name}</h3>
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-xs text-[#5156BE] hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>{msg.email}</span>
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-mono text-[#8C9188]">
                            {msg.created_at ? new Date(msg.created_at).toLocaleString() : "Waktu tidak tercatat"}
                          </span>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            disabled={deletingMsgId === msg.id}
                            className="p-2 rounded-lg bg-white hover:bg-rose-50 border border-[#EAE3D6] hover:border-rose-200 text-[#737870] hover:text-rose-600 transition-colors cursor-pointer"
                            title="Hapus pesan"
                          >
                            {deletingMsgId === msg.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-lg bg-white border border-[#EAE3D6] text-xs text-[#3A433E] leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-xs text-[#8C9188] bg-[#FCFAF7] rounded-2xl border border-dashed border-[#DFD7CB] space-y-2">
                  <div className="w-12 h-12 rounded-full bg-white border border-[#DFD7CB] flex items-center justify-center mx-auto text-[#8C9188]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <p className="font-semibold text-sm text-[#17201C]">Inbox Pesan Bersih</p>
                  <p className="text-[#737870]">Belum ada pesan masuk baru dari formulir kontak portofolio.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

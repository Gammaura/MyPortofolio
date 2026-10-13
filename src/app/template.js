"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Instantly reset scroll to top with no animated scrolling
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return (
    <div className="page-transition-wrapper">
      {children}
    </div>
  );
}

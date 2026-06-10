"use client";

import React from "react";
import ThemeProvider from "./ThemeProvider";

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
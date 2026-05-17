import React from "react";

export const navStyle: React.CSSProperties = {
  position: "fixed",
  top: 0, left: 0, right: 0,
  zIndex: 100,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backdropFilter: "blur(15px)",
  WebkitBackdropFilter: "blur(15px)",
  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
};

export const logoStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  zIndex: 110,
};
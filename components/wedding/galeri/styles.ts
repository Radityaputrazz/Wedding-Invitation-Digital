import React from "react";

export const sectionStyle: React.CSSProperties = {
  background: "#0d0503",
  padding: "6rem 0",
};

export const containerStyle: React.CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "0 1.5rem",
};

export const labelStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  color: "#B8964A",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
};

export const titleStyle: React.CSSProperties = {
  fontFamily: "serif",
  fontSize: "3rem",
  color: "#FAF0E0",
};

export const gridStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
};

export const gridItemWrapStyle: React.CSSProperties = {
  cursor: "pointer",
  width: "100%",
};

export const imageContainerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  borderRadius: "8px",
  overflow: "hidden",
  background: "#1a0a05",
};

export const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  transition: "transform 0.5s ease",
};

export const gridOverlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.3s ease",
  color: "#fff",
  fontSize: "0.9rem",
};

export const lbBgStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.95)",
  zIndex: 999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

export const lbImageWrapStyle: React.CSSProperties = {
  position: "relative",
  maxWidth: "90vw",
};
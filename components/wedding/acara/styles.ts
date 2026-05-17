import React from "react";

export const sectionStyle: React.CSSProperties = {
  background: "#1a1510",
  padding: "clamp(5rem, 10vw, 9rem) 1.5rem",
  position: "relative",
  overflow: "hidden",
};

export const bgGlow1Style: React.CSSProperties = {
  position: "absolute",
  top: "-150px",
  left: "-150px",
  width: "500px",
  height: "500px",
  background: "radial-gradient(circle, rgba(184,150,74,0.06), transparent 70%)",
  filter: "blur(60px)",
  pointerEvents: "none",
};

export const bgGlow2Style: React.CSSProperties = {
  position: "absolute",
  bottom: "-150px",
  right: "-150px",
  width: "500px",
  height: "500px",
  background: "radial-gradient(circle, rgba(123,140,110,0.05), transparent 70%)",
  filter: "blur(60px)",
  pointerEvents: "none",
};

export const vertLineStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: "50%",
  width: "1px",
  height: "100%",
  background: "linear-gradient(180deg, transparent, rgba(184,150,74,0.05), transparent)",
  pointerEvents: "none",
};

export const innerStyle: React.CSSProperties = {
  maxWidth: "1050px",
  margin: "0 auto",
  position: "relative",
};

export const labelStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  letterSpacing: "0.5em",
  textTransform: "uppercase",
  color: "rgba(184,150,74,0.8)",
  marginBottom: "0.75rem",
};

export const ornRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  width: "120px",
  margin: "0.75rem auto",
};

export const ornLineStyle: React.CSSProperties = {
  flex: 1,
  height: "1px",
  background: "linear-gradient(90deg, transparent, #B8964A)",
};

export const ornDiamondStyle: React.CSSProperties = {
  color: "#B8964A",
  fontSize: "0.45rem",
};

export const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(2.2rem, 6vw, 3.5rem)",
  fontWeight: 300,
  color: "#FAF0E0",
  letterSpacing: "0.04em",
  lineHeight: 1.2,
};

export const subtitleStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "rgba(250,240,224,0.35)",
  marginTop: "0.75rem",
  letterSpacing: "0.05em",
  fontStyle: "italic",
  fontFamily: "var(--font-serif)",
};

export const cardsGridStyle: React.CSSProperties = {
  marginTop: "1rem",
};

export const cardStyle: React.CSSProperties = {
  position: "relative",
  textAlign: "center",
  padding: "4.5rem 2rem 3rem",
  background: "rgba(255,255,255,0.02)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(184,150,74,0.12)",
  transition: "all 0.5s ease",
  height: "100%",
};

export const cardIndexStyle: React.CSSProperties = {
  position: "absolute",
  top: "1.2rem",
  right: "1.5rem",
  fontFamily: "var(--font-serif)",
  fontSize: "0.65rem",
  letterSpacing: "0.15em",
  color: "rgba(184,150,74,0.25)",
};

export const cardTopLineStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: "25%",
  right: "25%",
  height: "1px",
  background: "linear-gradient(90deg, transparent, #B8964A, transparent)",
};

export const badgeStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  background: "linear-gradient(135deg, #B8964A, #8a6d2f)",
  color: "#1a1510",
  padding: "8px 24px",
  fontSize: "0.62rem",
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  borderBottomLeftRadius: "12px",
  borderBottomRightRadius: "12px",
};

export const iconCircleStyle: React.CSSProperties = {
  width: "64px",
  height: "64px",
  fontSize: "1.6rem",
  margin: "0 auto 1.5rem",
  background: "rgba(184,150,74,0.06)",
  border: "1px solid rgba(184,150,74,0.2)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const cardNameStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(1.6rem, 5vw, 2rem)",
  fontWeight: 300,
  color: "#FAF0E0",
  marginBottom: "2rem",
  letterSpacing: "0.03em",
};

export const infoGridStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  width: "100%",
};

export const infoItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  width: "240px",
};

export const infoIconBoxStyle: React.CSSProperties = {
  fontSize: "1rem",
  background: "rgba(184,150,74,0.08)",
  minWidth: "42px",
  height: "42px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  border: "1px solid rgba(184,150,74,0.1)",
};

export const infoLabelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.58rem",
  textTransform: "uppercase",
  color: "rgba(184,150,74,0.6)",
  letterSpacing: "0.15em",
  marginBottom: "2px",
};

export const infoValueStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.9rem",
  color: "#FAF0E0",
  fontWeight: 400,
};

export const cardDividerStyle: React.CSSProperties = {
  width: "60px",
  height: "1px",
  margin: "1.5rem auto",
  background: "linear-gradient(90deg, transparent, rgba(184,150,74,0.4), transparent)",
};

export const locationBoxStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.4rem",
};

export const locationIconStyle: React.CSSProperties = {
  fontSize: "1.3rem",
  marginBottom: "0.3rem",
};

export const namaGedungStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
  background: "linear-gradient(180deg, #E6C27A, #B8964A)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export const alamatStyle: React.CSSProperties = {
  fontSize: "0.82rem",
  color: "rgba(250,240,224,0.45)",
  lineHeight: 1.7,
  maxWidth: "240px",
  marginTop: "0.3rem",
};

export const mapsBtnStyle: React.CSSProperties = {
  marginTop: "1.5rem",
  padding: "1rem 2.5rem",
  fontSize: "0.7rem",
  textDecoration: "none",
  color: "#B8964A",
  border: "1px solid rgba(184, 150, 74, 0.3)",
  borderRadius: "999px",
  letterSpacing: "0.12em",
  fontWeight: 600,
  textTransform: "uppercase",
  display: "inline-flex",
  gap: "0.5rem",
};
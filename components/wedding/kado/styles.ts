import React from "react";

export const sectionStyle: React.CSSProperties = {
  background: "#0d0503",
  padding: "clamp(5rem, 12vw, 8rem) 1.5rem",
  position: "relative",
  overflow: "hidden",
};

export const bgGlow1Style: React.CSSProperties = {
  position: "absolute",
  top: "-10%", left: "50%",
  transform: "translateX(-50%)",
  width: "min(800px, 150vw)",
  height: "400px",
  background: "radial-gradient(ellipse, rgba(184,150,74,0.08), transparent 70%)",
  filter: "blur(60px)",
  pointerEvents: "none",
};

export const bgGlow2Style: React.CSSProperties = {
  position: "absolute",
  bottom: "-5%", left: "50%",
  transform: "translateX(-50%)",
  width: "min(600px, 120vw)",
  height: "300px",
  background: "radial-gradient(ellipse, rgba(184,150,74,0.05), transparent 70%)",
  filter: "blur(40px)",
  pointerEvents: "none",
};

export const containerStyle: React.CSSProperties = {
  maxWidth: "1000px",
  margin: "0 auto",
  position: "relative",
};

export const labelStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  letterSpacing: "0.5em",
  textTransform: "uppercase",
  color: "#B8964A",
  marginBottom: "1rem",
};

export const ornRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  width: "120px",
  margin: "1rem auto",
};

export const ornLineStyle: React.CSSProperties = {
  flex: 1, height: "1px",
  background: "linear-gradient(90deg, transparent, #B8964A, transparent)",
};

export const ornDiamondStyle: React.CSSProperties = {
  color: "#B8964A", fontSize: "0.45rem",
};

export const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(2.2rem, 8vw, 3.5rem)",
  fontWeight: 300,
  color: "#FAF0E0",
  letterSpacing: "0.05em",
};

export const subtitleStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "rgba(250,240,224,0.5)",
  lineHeight: 1.8,
  marginTop: "1.2rem",
  fontFamily: "var(--font-serif)",
  fontStyle: "italic",
};

export const cardsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "clamp(1.5rem, 4vw, 2.5rem)",
  marginTop: "2rem",
};

export const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.02)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(184,150,74,0.12)",
  padding: "3rem 2rem",
  textAlign: "center",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const cardTopLineStyle: React.CSSProperties = {
  position: "absolute",
  top: 0, left: "30%", right: "30%",
  height: "1px",
  background: "linear-gradient(90deg, transparent, #B8964A, transparent)",
};

export const cardIndexStyle: React.CSSProperties = {
  position: "absolute",
  top: "1.5rem", right: "1.8rem",
  fontSize: "0.65rem",
  color: "rgba(184,150,74,0.3)",
};

export const cardHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  width: "100%",
  marginBottom: "1.5rem",
};

export const bankIconStyle: React.CSSProperties = { fontSize: "2rem" };

export const bankNameStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.25rem",
  color: "#FAF0E0",
};

export const holderNameStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(184,150,74,0.6)",
  marginTop: "0.2rem",
};

export const dividerStyle: React.CSSProperties = {
  width: "100%",
  height: "1px",
  background: "linear-gradient(90deg, transparent, rgba(184,150,74,0.1), transparent)",
  marginBottom: "2.5rem",
};

export const cardBodyStyle: React.CSSProperties = {
  minHeight: "180px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};

export const accountNumStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(1.8rem, 5vw, 2.2rem)",
  color: "#B8964A",
  letterSpacing: "0.05em",
  marginBottom: "1.8rem",
};

export const copyBtnStyle: React.CSSProperties = {
  padding: "0.8rem 2rem",
  border: "1px solid rgba(184,150,74,0.3)",
  fontSize: "0.75rem",
  letterSpacing: "0.15em",
  cursor: "pointer",
  transition: "0.3s ease",
};

export const qrFrameStyle: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
  padding: "12px",
  background: "#FAF6F0",
  marginBottom: "1rem",
};

export const qrInnerStyle: React.CSSProperties = { display: "block" };

export const qrCornerStyle: React.CSSProperties = {
  position: "absolute",
  width: "16px", height: "16px",
  borderStyle: "solid",
  borderColor: "#B8964A",
};

export const qrLabelStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  color: "rgba(250,240,224,0.4)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

export const toggleBtnStyle: React.CSSProperties = {
  marginTop: "2rem",
  background: "none",
  border: "none",
  color: "rgba(250,240,224,0.3)",
  fontSize: "0.72rem",
  letterSpacing: "0.1em",
  cursor: "pointer",
  opacity: 0.7,
};

export const noteWrapStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "5rem",
};

export const noteStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "rgba(250,240,224,0.4)",
  fontStyle: "italic",
  lineHeight: 1.8,
  fontFamily: "var(--font-serif)",
  marginTop: "1rem",
};
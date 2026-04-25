import { motion } from "framer-motion";
import { useMemo } from "react";

type Variant = "default" | "warm" | "sage" | "dark" | "soft";

const palettes: Record<Variant, { a: string; b: string; c: string }> = {
  default: { a: "var(--primary)", b: "var(--secondary)", c: "var(--accent)" },
  warm:    { a: "var(--primary)", b: "var(--accent)",    c: "var(--primary)" },
  sage:    { a: "var(--secondary)", b: "var(--primary)", c: "var(--secondary)" },
  dark:    { a: "var(--secondary)", b: "var(--primary)", c: "var(--accent)" },
  soft:    { a: "var(--primary)", b: "var(--secondary)", c: "var(--muted)" },
};

interface Props {
  variant?: Variant;
  particles?: number;
  showOrnaments?: boolean;
  className?: string;
}

/** Reusable animated luxury background: drifting gradient orbs, floating
 *  particles, faint grain, and optional decorative SVG ornaments. */
export default function LuxuryBackground({
  variant = "default",
  particles = 14,
  showOrnaments = true,
  className = "",
}: Props) {
  const p = palettes[variant];

  const dots = useMemo(
    () =>
      Array.from({ length: particles }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 10,
        drift: -20 + Math.random() * 40,
      })),
    [particles]
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Soft base gradient wash */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(1200px 600px at 50% -10%, hsl(${p.a} / 0.10), transparent 60%), radial-gradient(900px 500px at 100% 100%, hsl(${p.b} / 0.10), transparent 60%)`,
        }}
      />

      {/* Drifting gradient orbs */}
      <motion.div
        className="absolute -top-24 -left-20 w-72 h-72 rounded-full blur-3xl"
        style={{ background: `hsl(${p.a} / 0.22)` }}
        animate={{ x: [0, 30, -10, 0], y: [0, 20, -15, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full blur-3xl"
        style={{ background: `hsl(${p.b} / 0.20)` }}
        animate={{ x: [0, -25, 15, 0], y: [0, -20, 10, 0], scale: [1, 0.95, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 w-64 h-64 rounded-full blur-3xl -translate-x-1/2"
        style={{ background: `hsl(${p.c} / 0.12)` }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-y-0 -inset-x-1/2 opacity-[0.07]"
        style={{
          background: `linear-gradient(115deg, transparent 40%, hsl(${p.a}) 50%, transparent 60%)`,
        }}
        animate={{ x: ["-30%", "30%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: `hsl(${p.a} / 0.55)`,
            boxShadow: `0 0 ${d.size * 3}px hsl(${p.a} / 0.5)`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, d.drift, 0],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Decorative ornaments */}
      {showOrnaments && (
        <>
          <motion.svg
            className="absolute top-6 left-1/2 -translate-x-1/2 opacity-30"
            width="120" height="24" viewBox="0 0 120 24" fill="none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            transition={{ duration: 1.4 }}
            viewport={{ once: true }}
          >
            <path d="M2 12 H50 M70 12 H118" stroke={`hsl(${p.a})`} strokeWidth="0.8" />
            <circle cx="60" cy="12" r="3" fill="none" stroke={`hsl(${p.a})`} strokeWidth="0.8" />
            <circle cx="60" cy="12" r="6" fill="none" stroke={`hsl(${p.a})`} strokeWidth="0.4" />
          </motion.svg>
          <motion.div
            className="absolute top-10 right-6 w-20 h-20 rounded-full border opacity-20"
            style={{ borderColor: `hsl(${p.a})` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-12 left-6 w-16 h-16 rounded-full border opacity-20"
            style={{ borderColor: `hsl(${p.b})` }}
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
    </div>
  );
}

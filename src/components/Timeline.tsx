import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { invitationData } from "@/data/invitationData";
import LuxuryBackground from "@/components/LuxuryBackground";

const labels: Record<string, string> = {
  ceremony: "Պսակադրություն",
  reception: "Ընդունելություն",
  party: "Տոնական երեկո",
};

export default function Timeline() {
  const { event, texts } = invitationData;
  const items = (["ceremony", "reception", "party"] as const).map((k) => ({
    key: k,
    label: labels[k],
    ...event[k],
  }));

  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const [pos, setPos] = useState({ x: 30, y: 0 });
  const [pathLen, setPathLen] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const path = pathRef.current;
      const trail = trailRef.current;
      if (!path || !trail || !pathLen) return;
      const t = Math.max(0, Math.min(1, (v - 0.1) * 1.4));
      const point = path.getPointAtLength(pathLen * t);
      setPos({ x: point.x, y: point.y });
      trail.style.strokeDashoffset = String(pathLen * (1 - t));
    });
  }, [scrollYProgress, pathLen]);

  // Build smooth curved path through 3 points (mobile-first column)
  const W = 320;
  const H = 600;
  const pathD = `M 60 60 C 260 120, 60 240, 60 300 S 260 480, 60 540`;

  return (
    <section ref={ref} className="relative px-6 py-20 overflow-hidden">
      <LuxuryBackground variant="sage" particles={14} />
      <h3 className="text-center text-3xl font-light italic text-foreground mb-12">
        Մեր օրվա ընթացքը
      </h3>

      <div className="relative max-w-md mx-auto" style={{ height: H }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 w-full h-full"
          fill="none"
        >
          <path
            ref={pathRef}
            d={pathD}
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
          <path
            ref={trailRef}
            d={pathD}
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: pathLen,
              strokeDashoffset: pathLen,
            }}
          />
          {/* Moving heart */}
          <g transform={`translate(${pos.x - 10}, ${pos.y - 10})`}>
            <circle r="14" cx="10" cy="10" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            <text x="10" y="14" textAnchor="middle" fontSize="12" fill="hsl(var(--heart))">❤</text>
          </g>
        </svg>

        {items.map((it, i) => {
          const top = i === 0 ? 20 : i === 1 ? 260 : 500;
          return (
            <motion.div
              key={it.key}
              initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className={`absolute w-56 ${i === 1 ? "right-0 text-right" : "left-16"}`}
              style={{ top }}
            >
              <div className="bg-card rounded-2xl p-4 shadow-lg ring-1 ring-border">
                <p className="text-xs tracking-[0.25em] uppercase text-primary">
                  {it.time}
                </p>
                <h4 className="text-xl font-light italic text-foreground mt-1">
                  {it.label}
                </h4>
                <p className="text-sm text-foreground/80 mt-1">{it.place}</p>
                <p className="text-xs text-muted-foreground">{it.address}</p>
                <a
                  href={it.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-xs tracking-widest uppercase text-secondary border-b border-secondary/40 pb-0.5"
                >
                  {texts.mapButton}
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

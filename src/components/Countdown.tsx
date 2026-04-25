import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { invitationData } from "@/data/invitationData";

const labels = { d: "Օր", h: "Ժամ", m: "Րոպե", s: "Վրկ" };

function diff(target: number) {
  const now = Date.now();
  let s = Math.max(0, Math.floor((target - now) / 1000));
  const d = Math.floor(s / 86400); s -= d * 86400;
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60); s -= m * 60;
  return { d, h, m, s };
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex-1 bg-card rounded-2xl py-4 ring-1 ring-border shadow-sm text-center">
      <div className="h-10 sm:h-12 overflow-hidden relative">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl font-light text-primary"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-1">
        {label}
      </p>
    </div>
  );
}

export default function Countdown() {
  const { couple, texts } = invitationData;
  const target = new Date(couple.date).getTime();
  const [t, setT] = useState(() => diff(target));
  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <section className="px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto text-center"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
          {texts.countdownTitle}
        </p>
        <div className="flex gap-2 sm:gap-3">
          <Cell value={t.d} label={labels.d} />
          <Cell value={t.h} label={labels.h} />
          <Cell value={t.m} label={labels.m} />
          <Cell value={t.s} label={labels.s} />
        </div>
      </motion.div>
    </section>
  );
}

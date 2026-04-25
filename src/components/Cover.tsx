import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { invitationData } from "@/data/invitationData";
import LuxuryBackground from "@/components/LuxuryBackground";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("hy-AM", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function Cover({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);
  const { couple, texts } = invitationData;

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(onOpen, 1600);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden bg-background">
      <LuxuryBackground variant="warm" particles={20} />

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-xs tracking-[0.4em] uppercase text-primary mb-6"
      >
        {texts.saveDate}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-primary/20 mb-8"
      >
        <img
          src={couple.photo}
          alt={couple.title}
          className="w-full h-full object-cover"
          width={1024}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9 }}
        className="text-5xl sm:text-6xl text-foreground text-center font-light italic"
      >
        {couple.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-3 text-sm tracking-[0.3em] uppercase text-muted-foreground"
      >
        {formatDate(couple.date)}
      </motion.p>

      {/* Envelope */}
      <div className="mt-12 relative h-32 w-56">
        <button
          onClick={handleOpen}
          aria-label={texts.openEnvelope}
          className="relative w-full h-full focus:outline-none"
        >
          {/* envelope body */}
          <motion.div
            className="absolute inset-0 rounded-md bg-card border border-primary/40 shadow-xl"
            initial={{ y: 0 }}
            animate={opened ? { y: 8 } : { y: [0, -4, 0] }}
            transition={opened ? { duration: 0.4 } : { duration: 3, repeat: Infinity }}
          />
          {/* flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 origin-top"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: opened ? 180 : 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="w-full h-full bg-primary"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
          </motion.div>
          {/* heart */}
          <AnimatePresence>
            {opened && (
              <motion.div
                key="heart"
                initial={{ y: 10, opacity: 0, scale: 0.6 }}
                animate={{ y: -180, opacity: [0, 1, 1, 0], scale: [0.6, 1.4, 1.2, 0.8] }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
                style={{ color: "hsl(var(--heart))" }}
              >
                ❤
              </motion.div>
            )}
          </AnimatePresence>

          {/* Particles */}
          <AnimatePresence>
            {opened &&
              Array.from({ length: 12 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((i / 12) * Math.PI * 2) * 100,
                    y: Math.sin((i / 12) * Math.PI * 2) * 100 - 40,
                    opacity: 0,
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              ))}
          </AnimatePresence>
        </button>
        <p className="mt-4 text-center text-sm tracking-widest uppercase text-primary">
          {texts.openEnvelope}
        </p>
      </div>
    </section>
  );
}

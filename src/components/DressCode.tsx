import { motion } from "framer-motion";
import { type InvitationData } from "@/lib/api";
import LuxuryBackground from "@/components/LuxuryBackground";

export default function DressCode({ data }: { data: InvitationData }) {
  const { texts, telegramLink } = data;
  return (
    <section className="relative px-6 py-20 overflow-hidden">
      <LuxuryBackground variant="sage" particles={14} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto rounded-3xl bg-secondary text-secondary-foreground p-8 shadow-xl"
      >
        <p className="text-xs tracking-[0.4em] uppercase opacity-80 mb-3">{texts.dressCodeTitle}</p>
        <h3 className="text-3xl font-light italic mb-4">Beige · Sage · Gold</h3>
        <p className="leading-relaxed opacity-90">{texts.dressCode}</p>

        <div className="mt-6 flex gap-2">
          <span className="w-8 h-8 rounded-full bg-background ring-2 ring-secondary-foreground/30" />
          <span
            className="w-8 h-8 rounded-full ring-2 ring-secondary-foreground/30"
            style={{ background: "hsl(var(--secondary))", filter: "brightness(1.3)" }}
          />
          <span className="w-8 h-8 rounded-full bg-primary ring-2 ring-secondary-foreground/30" />
        </div>

        <a
          href={telegramLink}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center w-full rounded-full bg-background text-foreground py-3 text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {texts.joinButton}
        </a>
      </motion.div>
    </section>
  );
}

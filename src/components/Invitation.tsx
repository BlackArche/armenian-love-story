import { motion } from "framer-motion";
import { invitationData } from "@/data/invitationData";
import LuxuryBackground from "@/components/LuxuryBackground";

export default function Invitation() {
  const { couple, texts } = invitationData;
  return (
    <section className="relative px-6 py-24 overflow-hidden">
      <LuxuryBackground variant="soft" particles={12} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9 }}
        className="relative max-w-md mx-auto text-center"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
          {texts.welcome}
        </p>
        <div className="mx-auto w-16 h-px bg-primary/40 mb-8" />
        <h2 className="text-4xl sm:text-5xl font-light italic text-foreground leading-tight">
          {couple.bride}
          <span className="block text-primary text-3xl my-2">&amp;</span>
          {couple.groom}
        </h2>
        <p className="mt-8 text-foreground/80 leading-relaxed">
          {texts.invitationLine1}
        </p>
        <p className="mt-2 text-foreground/80 leading-relaxed">
          {texts.invitationLine2}
        </p>
        <div className="mx-auto w-16 h-px bg-primary/40 mt-10" />
      </motion.div>
    </section>
  );
}

import { motion } from "framer-motion";
import { type InvitationData } from "@/lib/api";
import LuxuryBackground from "@/components/LuxuryBackground";

export default function Gallery({ data }: { data: InvitationData }) {
  const { gallery } = data;
  return (
    <section className="relative px-6 py-20 overflow-hidden">
      <LuxuryBackground variant="warm" particles={12} />
      <h3 className="text-center text-3xl font-light italic text-foreground mb-12">Մեր պահերը</h3>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
        className="max-w-md mx-auto grid grid-cols-2 gap-4"
      >
        {gallery.map((g, i) => (
          <motion.figure
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30, rotate: i % 2 ? 4 : -4 },
              show: { opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 },
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`relative bg-card rounded-2xl shadow-xl ring-1 ring-border overflow-hidden ${
              i % 3 === 0 ? "translate-y-4" : ""
            }`}
          >
            <img
              src={g.src}
              alt={g.note}
              loading="lazy"
              className="w-full aspect-[3/4] object-cover"
            />
            <figcaption className="p-3 text-xs text-foreground/80 italic text-center">
              {g.note}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

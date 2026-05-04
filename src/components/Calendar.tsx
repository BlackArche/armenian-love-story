import { motion } from "framer-motion";
import { type InvitationData } from "@/lib/api";
import LuxuryBackground from "@/components/LuxuryBackground";

export default function Calendar({ data }: { data: InvitationData }) {
  const { calendar } = data;
  const cells: (number | null)[] = [
    ...Array(calendar.firstDayOffset).fill(null),
    ...Array.from({ length: calendar.daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <section className="relative px-6 py-20 overflow-hidden">
      <LuxuryBackground variant="default" particles={10} showOrnaments={false} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto bg-card rounded-3xl shadow-xl ring-1 ring-border p-6 sm:p-8"
      >
        <div className="text-center mb-6">
          <h3 className="text-3xl font-light italic text-foreground">{calendar.monthName}</h3>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mt-1">
            {calendar.year}
          </p>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs uppercase tracking-wider text-muted-foreground mb-2">
          {(Array.isArray(calendar.weekdays) ? calendar.weekdays : []).map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {cells.map((d, i) => {
            const isWedding = d === calendar.weddingDay;
            return (
              <div key={i} className="aspect-square flex items-center justify-center">
                {d && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {isWedding && (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                        className="absolute inset-1 rounded-full bg-primary/15 flex items-center justify-center"
                      >
                        <motion.span
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 1.6, repeat: Infinity }}
                          className="absolute -top-1 -right-1 text-sm"
                          style={{ color: "hsl(var(--heart))" }}
                        >
                          ❤
                        </motion.span>
                      </motion.div>
                    )}
                    <span
                      className={
                        isWedding
                          ? "relative font-semibold text-primary text-base"
                          : "relative text-foreground/80 text-sm"
                      }
                    >
                      {d}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

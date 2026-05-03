import { useState } from "react";
import { motion } from "framer-motion";
import { submitRSVP, type RSVPPayload } from "@/data/invitationData";
import { type InvitationData } from "@/lib/api";
import LuxuryBackground from "@/components/LuxuryBackground";

const fieldLabels = {
  name: "Ձեր անունը",
  attending: "Կմասնակցե՞ք",
  yes: "Այո, անպայման",
  no: "Չեմ կարող",
  ceremony: "Պսակադրություն",
  reception: "Ընդունելություն",
  party: "Տոնական երեկո",
  guests: "Հյուրերի թիվը",
  submit: "Ուղարկել",
  sending: "Ուղարկվում է...",
  success: "Շնորհակալություն! Ձեր պատասխանը ստացված է։",
};

export default function RSVP({ data }: { data: InvitationData }) {
  const { texts } = data;
  const [form, setForm] = useState<RSVPPayload>({
    name: "",
    attending: "yes",
    events: { ceremony: true, reception: true, party: true },
    guests: 1,
  });
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    await submitRSVP(form);
    setState("done");
  };

  return (
    <section className="relative px-6 py-20 overflow-hidden">
      <LuxuryBackground variant="soft" particles={12} />
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto bg-card rounded-3xl p-6 sm:p-8 shadow-xl ring-1 ring-border"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-2 text-center">
          {texts.rsvpTitle}
        </p>
        <p className="text-xs text-muted-foreground text-center mb-6">{texts.rsvpDeadline}</p>

        {state === "done" ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-foreground py-8 italic text-lg"
          >
            {fieldLabels.success}
          </motion.p>
        ) : (
          <div className="space-y-5">
            <label className="block">
              <span className="text-xs tracking-widest uppercase text-muted-foreground">
                {fieldLabels.name}
              </span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full bg-background border-b border-border focus:border-primary outline-none py-2 text-foreground"
              />
            </label>

            <div>
              <span className="text-xs tracking-widest uppercase text-muted-foreground">
                {fieldLabels.attending}
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => setForm({ ...form, attending: v })}
                    className={`py-2 rounded-full text-sm tracking-wider transition-colors ${
                      form.attending === v
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground/70"
                    }`}
                  >
                    {fieldLabels[v]}
                  </button>
                ))}
              </div>
            </div>

            {form.attending === "yes" && (
              <>
                <div className="space-y-2">
                  {(["ceremony", "reception", "party"] as const).map((k) => (
                    <label key={k} className="flex items-center gap-3 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={form.events[k]}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            events: { ...form.events, [k]: e.target.checked },
                          })
                        }
                        className="accent-primary w-4 h-4"
                      />
                      {fieldLabels[k]}
                    </label>
                  ))}
                </div>

                <label className="block">
                  <span className="text-xs tracking-widest uppercase text-muted-foreground">
                    {fieldLabels.guests}
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: +e.target.value })}
                    className="mt-1 w-full bg-background border-b border-border focus:border-primary outline-none py-2 text-foreground"
                  />
                </label>
              </>
            )}

            <button
              type="submit"
              disabled={state === "sending"}
              className="w-full mt-2 rounded-full bg-primary text-primary-foreground py-3 text-sm tracking-widest uppercase disabled:opacity-60"
            >
              {state === "sending" ? fieldLabels.sending : fieldLabels.submit}
            </button>
          </div>
        )}
      </motion.form>
    </section>
  );
}

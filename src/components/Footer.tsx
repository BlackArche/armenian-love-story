import { type InvitationData } from "@/lib/api";
import LuxuryBackground from "@/components/LuxuryBackground";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("hy-AM", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function Footer({ data }: { data: InvitationData }) {
  const { couple, texts } = data;
  return (
    <footer className="relative px-6 py-16 text-center border-t border-border mt-10 overflow-hidden">
      <LuxuryBackground variant="default" particles={10} showOrnaments={false} />
      <p className="text-xs tracking-[0.3em] uppercase text-primary">{formatDate(couple.date)}</p>
      <h4 className="mt-3 text-3xl font-light italic text-foreground">{couple.title}</h4>
      <p className="mt-4 text-sm text-muted-foreground italic">{texts.footerClose}</p>
    </footer>
  );
}

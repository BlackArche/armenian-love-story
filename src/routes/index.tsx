import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import Cover from "@/components/Cover";
import Invitation from "@/components/Invitation";
import Calendar from "@/components/Calendar";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import DressCode from "@/components/DressCode";
import Countdown from "@/components/Countdown";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";
import MusicButton from "@/components/MusicButton";
import { invitationData } from "@/data/invitationData";
import { type InvitationData } from "@/lib/api";
import { useInvitation } from "../context/InvitationContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${invitationData.couple.title} — Հարսանյաց հրավեր` },
      { name: "description", content: invitationData.texts.invitationLine1 },
      { property: "og:title", content: invitationData.couple.title },
      { property: "og:description", content: invitationData.texts.invitationLine2 },
      { property: "og:image", content: invitationData.couple.photo },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: liveData } = useInvitation();
  // Merge liveData with static invitationData for fallback
  const data = { ...invitationData, ...liveData } as any;

  const inviteRef = useRef<HTMLDivElement>(null);
  const scrollToInvite = () => inviteRef.current?.scrollIntoView({ behavior: "smooth" });

  const show = {
    calendar: data.sections?.calendar !== false,
    timeline: data.sections?.timeline !== false,
    gallery: data.sections?.gallery !== false && data.gallery.length > 0,
    dressCode: data.sections?.dressCode !== false,
    countdown: data.sections?.countdown !== false,
    rsvp: data.sections?.rsvp !== false,
    music: data.sections?.music !== false && !!data.musicUrl,
  };

  return (
    <main className="bg-background text-foreground font-body">
      <Cover data={data} onOpen={scrollToInvite} />
      <div ref={inviteRef}>
        <Invitation data={data} />
      </div>
      {show.calendar && <Calendar data={data} />}
      {show.timeline && <Timeline data={data} />}
      {show.gallery && <Gallery data={data} />}
      {show.dressCode && <DressCode data={data} />}
      {show.countdown && <Countdown data={data} />}
      {show.rsvp && <RSVP data={data} />}
      <Footer data={data} />
      {show.music && <MusicButton data={data} />}
    </main>
  );
}

export default Index;

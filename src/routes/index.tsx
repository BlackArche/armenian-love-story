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
  const inviteRef = useRef<HTMLDivElement>(null);
  const scrollToInvite = () =>
    inviteRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="bg-background text-foreground font-body">
      <Cover onOpen={scrollToInvite} />
      <div ref={inviteRef}>
        <Invitation />
      </div>
      <Calendar />
      <Timeline />
      <Gallery />
      <DressCode />
      <Countdown />
      <RSVP />
      <Footer />
      <MusicButton />
    </main>
  );
}

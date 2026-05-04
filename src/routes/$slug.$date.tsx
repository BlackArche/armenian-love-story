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
import { fetchInvitation } from "@/lib/api";
import { invitationData } from "@/data/invitationData";

export const Route = createFileRoute("/$slug/$date")({
  loader: async ({ params }) => {
    console.log("mtavvvv");
    return await fetchInvitation(params.slug, params.date);
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    console.log("mtavvvv");

    return {
      meta: [
        { title: `${loaderData.couple.title} — Հարսանյաց հրավեր` },
        { name: "description", content: loaderData.texts.invitationLine1 },
        { property: "og:title", content: loaderData.couple.title },
        { property: "og:description", content: loaderData.texts.invitationLine2 },
        { property: "og:image", content: loaderData.couple.photo },
      ],
      links: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap",
        },
      ],
    };
  },
  component: InvitationPage,
});

function InvitationPage() {
  const data = Route.useLoaderData() || invitationData;
  const inviteRef = useRef<HTMLDivElement>(null);
  const scrollToInvite = () => inviteRef.current?.scrollIntoView({ behavior: "smooth" });
  console.log(data, "88888888888");
  if (!data) return null;

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

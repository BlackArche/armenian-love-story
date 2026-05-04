import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import couplePhoto from "@/assets/couple.jpg";
import { type InvitationData } from "@/lib/api";

export type EventInfo = {
  time: string;
  place: string;
  address: string;
  mapUrl: string;
};

export type RSVPPayload = {
  name: string;
  attending: "yes" | "no";
  events: { ceremony: boolean; reception: boolean; party: boolean };
  guests: number;
};

export const invitationData: InvitationData = {
  couple: {
    bride: "Անի",
    groom: "Արամ",
    title: "Անի & Արամ",
    subtitle: "Մեր սիրո պատմությունը",
    date: "2026-09-12T16:00:00+04:00",
    photo: couplePhoto,
  },
  event: {
    ceremony: {
      time: "16:00",
      place: "Սուրբ Աստվածածին եկեղեցի",
      address: "Աբովյան 25, Երևան",
      mapUrl: "https://maps.google.com/?q=Saint+Astvatsatsin+Yerevan",
    } as EventInfo,
    reception: {
      time: "18:00",
      place: "Տուն-Արմենիա ռեստորան",
      address: "Մաշտոցի պող. 12, Երևան",
      mapUrl: "https://maps.google.com/?q=Tun+Armenia+Yerevan",
    } as EventInfo,
    party: {
      time: "21:00",
      place: "Opera Lounge",
      address: "Թումանյան 35, Երևան",
      mapUrl: "https://maps.google.com/?q=Opera+Lounge+Yerevan",
    } as EventInfo,
  },
  gallery: [
    { src: g1, note: "Մեր առաջին ծաղիկները" },
    { src: g2, note: "Մայրամուտի խոստումը" },
    { src: g3, note: "Տոնական սեղանը պատրաստ է" },
    { src: g4, note: "Առաջին պարը՝ միասին" },
  ],
  texts: {
    welcome: "Բարի գալուստ մեր տոնին",
    invitationLine1: "Սիրով հրավիրում ենք Ձեզ կիսելու մեզ հետ",
    invitationLine2: "մեր կյանքի ամենագեղեցիկ օրը",
    openEnvelope: "Բացել հրավերը",
    dressCodeTitle: "Հագուստի կարգ",
    dressCode:
      "Խնդրում ենք պահպանել նուրբ երանգներ՝ բեժ, սաղարթագույն, ոսկեգույն։ Տիկնայք՝ երկար զգեստով, պարոնայք՝ կոստյումով։",
    joinButton: "Միանալ Telegram խմբին",
    countdownTitle: "Մինչև մեր մեծ օրը",
    rsvpTitle: "Հաստատեք ներկայությունը",
    rsvpDeadline: "Խնդրում ենք պատասխանել մինչև օգոստոսի 20-ը",
    mapButton: "Բացել քարտեզը",
    saveDate: "Պահեք այս օրը",
    footerClose: "Սիրով՝ Անի և Արամ",
  },
  calendar: {
    monthName: "Սեպտեմբեր",
    year: 2026,
    weekdays: ["Եր", "Եք", "Չր", "Հգ", "Ուր", "Շբ", "Կր"],
    firstDayOffset: 1,
    daysInMonth: 30,
    weddingDay: 12,
  },
  telegramLink: "https://t.me/+wedding",
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
};

/** Backend-ready RSVP submitter. Wire to your endpoint. */
export async function submitRSVP(payload: RSVPPayload): Promise<{ ok: true }> {
  // Replace with real fetch when backend is ready.
  await new Promise((r) => setTimeout(r, 800));
  // eslint-disable-next-line no-console
  console.log("RSVP", payload);
  return { ok: true };
}

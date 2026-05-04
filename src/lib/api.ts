export type EventInfo = {
  time: string;
  place: string;
  address: string;
  mapUrl: string;
};

export type InvitationData = {
  couple: {
    bride: string;
    groom: string;
    title: string;
    subtitle: string;
    date: string;
    photo: string;
  };
  event: {
    ceremony: EventInfo;
    reception: EventInfo;
    party: EventInfo;
  };
  gallery: Array<{
    src: string;
    note: string;
  }>;
  texts: {
    welcome: string;
    invitationLine1: string;
    invitationLine2: string;
    openEnvelope: string;
    dressCodeTitle: string;
    dressCode: string;
    joinButton: string;
    countdownTitle: string;
    rsvpTitle: string;
    rsvpDeadline: string;
    mapButton: string;
    saveDate: string;
    footerClose: string;
  };
  calendar: {
    monthName: string;
    year: number;
    weekdays: string[];
    firstDayOffset: number;
    daysInMonth: number;
    weddingDay: number;
  };
  telegramLink?: string;
  musicUrl?: string;
  sections?: {
    gallery?: boolean;
    timeline?: boolean;
    dressCode?: boolean;
    rsvp?: boolean;
    music?: boolean;
    calendar?: boolean;
    countdown?: boolean;
  };
};

const BASE_API_URL = import.meta.env.PROD
  ? "https://api.amorete.me/api/invitations"
  : "http://localhost:7777/api/invitations";

export async function fetchInvitation(slug: string, date: string): Promise<InvitationData> {
  const response = await fetch(`${BASE_API_URL}/${slug}/${date}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch invitation: ${response.statusText}`);
  }
  return response.json();
}

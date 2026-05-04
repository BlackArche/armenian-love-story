import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// The default data that the template uses when no live preview data is sent
const DEFAULT_DATA = {
  "couple": {
    "bride": "Անի",
    "groom": "Արամ",
    "title": "Հարսանյաց Հրավեր",
    "subtitle": "Մեր Սիրո Պատմությունը"
  },
  "event": {
    "ceremony": {
      "time": "15:00",
      "place": "Վայր",
      "address": "Հասցե"
    },
    "reception": {
      "time": "17:00",
      "place": "Ռեստորան",
      "address": "Հասցե"
    }
  },
  "texts": {
    "welcome": "Սիրով հրավիրում ենք",
    "invitationLine1": "Մեր հարսանիքին",
    "invitationLine2": "27 Օգոստոսի 2026",
    "openEnvelope": "Բացել"
  },
  "sections": {
    "gallery": true,
    "timeline": true,
    "dressCode": true,
    "rsvp": true,
    "music": true,
    "calendar": true,
    "countdown": true
  },
  "calendar": {
    "monthName": "Օգոստոս",
    "year": 2026,
    "weekdays": "Երկ,Երք,Չոր,Հնգ,Ուրբ,Շբթ,Կիր",
    "firstDayOffset": 5,
    "daysInMonth": 31,
    "weddingDay": 27
  }
};

type InvitationContextType = {
  data: typeof DEFAULT_DATA;
  loading: boolean;
  error: string | null;
};

const InvitationContext = createContext<InvitationContextType>({ 
  data: DEFAULT_DATA, 
  loading: false, 
  error: null 
});

export const InvitationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  // 1. ՄԻՇՏ լսել Live Preview-ի թարմացումները
  const handleMessage = (event: MessageEvent) => {
    if (event.data?.type === "UPDATE_PREVIEW" && event.data.payload) {
      console.log("Preview data received:", event.data.payload);
      setData((prev) => ({
        ...prev,
        ...event.data.payload,
      }));
    }
  };

  window.addEventListener("message", handleMessage);

  // 2. Տվյալների Fetch (եթե սա իրական հղում է, ոչ թե դատարկ դեմո)
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  
  if (pathParts.length >= 2) {
    const slug = pathParts[0];
    const dateSlug = pathParts[1];
    const apiUrl = (import.meta as any).env?.VITE_API_URL || "https://backend.amorete.am"; 
    
    setLoading(true);
    fetch(`${apiUrl}/api/invitations/${slug}/${dateSlug}`)
      .then(res => res.ok ? res.json() : Promise.reject("Not found"))
      .then(resData => {
        const inviteData = resData.data ? resData.data : resData;
        setData((prev) => ({ ...prev, ...inviteData }));
      })
      .catch(err => {
        console.error(err);
        // Եթե սխալ լինի, թողնում ենք DEFAULT_DATA-ն կամ Preview-ն
      })
      .finally(() => setLoading(false));
  }

  // Cleanup
  return () => window.removeEventListener("message", handleMessage);
}, []); // Դատարկ array, որ աշխատի միայն մեկ անգամ բեռնվելիս

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white text-black">Բեռնվում է...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-white text-black">{error}</div>;
  }

  return (
    <InvitationContext.Provider value={{ data, loading, error }}>
      {children}
    </InvitationContext.Provider>
  );
};

export const useInvitation = () => useContext(InvitationContext);

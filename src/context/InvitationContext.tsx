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
    // Universal path parsing (independent of router)
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    
    // If we have at least 2 parts (slug and date) -> Fetch from Backend
    if (pathParts.length >= 2) {
      const slug = pathParts[0];
      const dateSlug = pathParts[1];
      const apiUrl = (import.meta as any).env?.VITE_API_URL || "https://backend.amorete.am"; 
      
      setLoading(true);
      fetch(`${apiUrl}/api/invitations/${slug}/${dateSlug}`)
        .then(res => {
          if (!res.ok) throw new Error("Invitation not found");
          return res.json();
        })
        .then(resData => {
          const inviteData = resData.data ? resData.data : resData;
          setData((prev) => ({ ...prev, ...inviteData }));
        })
        .catch(err => {
          console.error(err);
          setError("Հրավիրատոմսը չի գտնվել");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Demo / Live Preview mode
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === "UPDATE_PREVIEW" && event.data.payload) {
          setData((prev) => ({
            ...prev,
            ...event.data.payload,
          }));
        }
      };

      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }
  }, []); 

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

import React, { useEffect, useState } from "react";
import axios from "axios";

export function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    async function loadAnnouncement() {
      try {
        const res = await axios.get("/api/system/announcement");
        setAnnouncement(res.data?.message || null);
      } catch {}
    }

    loadAnnouncement();
    const interval = setInterval(loadAnnouncement, 20000);

    return () => clearInterval(interval);
  }, []);

  if (!announcement) return null;

  return (
    <div className="bg-jntu-500 text-white text-center py-2 px-4 text-sm">
      <marquee>{announcement}</marquee>
    </div>
  );
}

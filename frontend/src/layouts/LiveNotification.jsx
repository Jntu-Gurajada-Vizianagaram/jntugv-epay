import React, { useEffect, useState } from "react";
import axios from "axios";

export function LiveNotification() {
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    async function check() {
      try {
        const res = await axios.get("/api/system/notifications");
        if (res.data?.message) {
          setNotif(res.data.message);
          setTimeout(() => setNotif(null), 6000);
        }
      } catch {}
    }

    const interval = setInterval(check, 15000);

    return () => clearInterval(interval);
  }, []);

  if (!notif) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-white shadow-lg rounded-lg p-4 border-l-4 border-jntu-600 max-w-xs animate-fadeIn">
      <div className="font-semibold text-jntu-700">Notice</div>
      <div className="text-sm text-gray-600">{notif}</div>
    </div>
  );
}

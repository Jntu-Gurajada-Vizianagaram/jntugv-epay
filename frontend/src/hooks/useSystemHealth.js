import { useEffect, useState } from "react";
import axios from "axios";

export function useSystemHealth() {
  const [status, setStatus] = useState("OK"); 
  // OK | OFFLINE | SERVER_DOWN

  useEffect(() => {
    function checkOnline() {
      if (!navigator.onLine) {
        setStatus("OFFLINE");
        return;
      }
      testServer();
    }

    async function testServer() {
      try {
        // backend lightweight health endpoint
        const res = await axios.get("/api/system/health", { timeout: 5000 });
        if (res.data?.status === "OK") setStatus("OK");
      } catch (err) {
        setStatus("SERVER_DOWN");
      }
    }

    // Initial test
    checkOnline();

    // Monitor internet changes
    window.addEventListener("online", checkOnline);
    window.addEventListener("offline", () => setStatus("OFFLINE"));

    // Recheck server every 20 seconds
    const interval = setInterval(checkOnline, 20000);

    return () => {
      window.removeEventListener("online", checkOnline);
      window.removeEventListener("offline", checkOnline);
      clearInterval(interval);
    };
  }, []);

  return status;
}

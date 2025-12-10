import { useEffect, useState } from "react";

// LIVE ENVIRONMENT VERSION — NO /api/system/health endpoint used

export function useSystemHealth() {
  const [status, setStatus] = useState("OK");  
  // Possible: OK | OFFLINE | SERVER_DOWN

  useEffect(() => {
    let isMounted = true;

    async function pingServer() {
      if (!navigator.onLine) {
        if (isMounted) setStatus("OFFLINE");
        return;
      }

      try {
        // Lightweight HEAD request to root domain
        const res = await fetch("/", {
          method: "HEAD",
          cache: "no-store",
          mode: "no-cors"
        });

        // If fetch didn't throw, the server is reachable
        if (isMounted) setStatus("OK");

      } catch (err) {
        if (isMounted) setStatus("SERVER_DOWN");
      }
    }

    // Initial check
    pingServer();

    // Listen to browser online/offline changes
    function handleOnline() {
      pingServer();
    }
    function handleOffline() {
      setStatus("OFFLINE");
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Recheck every 45 seconds (production safe)
    const interval = setInterval(pingServer, 45000);

    return () => {
      isMounted = false;
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);

  return status;
}

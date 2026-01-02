import { useEffect, useState } from "react";

export function useMaintenanceSchedule() {
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let alive = true;

    async function checkMaintenance() {
      try {
        // Live production request (NO axios, NO mock)
        const baseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
        const res = await fetch(`${baseUrl}/api/system/maintenance`, {
          method: "GET",
          headers: {
            "Pragma": "no-cache",
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        });

        if (!alive) return;

        // If backend unreachable → DO NOT lock UI
        if (!res.ok) {
          console.warn("Maintenance check failed: HTTP", res.status);
          return;
        }

        const data = await res.json();

        // Expected live production response:
        // { active: true/false, message: "System unavailable" }
        if (data?.active) {
          setLocked(true);
          setMessage(data.message || "Maintenance in progress");
        } else {
          setLocked(false);
          setMessage("");
        }

      } catch (err) {
        // Network failures should NOT activate maintenance lock
        console.warn("Maintenance request error:", err.message);
      }
    }

    // First check immediately
    checkMaintenance();

    // Production-grade polling: every 5 minutes
    const interval = setInterval(checkMaintenance, 300000); // 300,000 ms = 5 minutes

    return () => {
      alive = false;
      clearInterval(interval);
    };

  }, []);

  return { locked, message };
}

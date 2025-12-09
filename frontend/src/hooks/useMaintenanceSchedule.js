import { useEffect, useState } from "react";
import axios from "axios";

export function useMaintenanceSchedule() {
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkSchedule() {
      try {
        const res = await axios.get("/api/system/maintenance"); 
        // backend example response:
        // { active: true, message: "Exam Fee Closed Today 6 PM – 9 PM" }

        if (res.data?.active) {
          setLocked(true);
          setMessage(res.data.message);
        } else {
          setLocked(false);
        }
      } catch (e) {
        // Ignore on failure
      }
    }

    checkSchedule();
    const interval = setInterval(checkSchedule, 30000); // check every 30s

    return () => clearInterval(interval);
  }, []);

  return { locked, message };
}

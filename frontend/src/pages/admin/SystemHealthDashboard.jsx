import React, { useEffect, useState } from "react";
import axios from "axios";

export function SystemHealthDashboard() {
  const [health, setHealth] = useState({
    nginx: "UNKNOWN",
    backend: "UNKNOWN",
    mysql: "UNKNOWN",
    payments: "UNKNOWN"
  });

  useEffect(() => {
    async function fetchHealth() {
      try {
        const res = await axios.get("/api/system/health-full");
        setHealth(res.data);
      } catch (e) {
        setHealth((prev) => ({ ...prev, backend: "DOWN" }));
      }
    }

    fetchHealth();
    const interval = setInterval(fetchHealth, 60000); // 60s

    return () => clearInterval(interval);
  }, []);

  const indicator = (status) => {
    return status === "OK"
      ? "text-green-600"
      : status === "DOWN"
      ? "text-red-600"
      : "text-gray-500";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">System Health Status</h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Nginx Gateway</span>
          <span className={indicator(health.nginx)}>{health.nginx}</span>
        </div>

        <div className="flex justify-between">
          <span>Backend API</span>
          <span className={indicator(health.backend)}>{health.backend}</span>
        </div>

        <div className="flex justify-between">
          <span>MySQL Database</span>
          <span className={indicator(health.mysql)}>{health.mysql}</span>
        </div>

        <div className="flex justify-between">
          <span>SBI Payment Gateway</span>
          <span className={indicator(health.payments)}>{health.payments}</span>
        </div>

      </div>

      <p className="text-xs text-gray-400 mt-4">
        Auto-refresh every 15 seconds.
      </p>
    </div>
  );
}

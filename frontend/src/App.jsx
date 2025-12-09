
import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";

import { PortalLayout } from "./layouts/PortalLayout";

// Pages
import { Home } from "./pages/Home";
import { PaymentReturn } from "./pages/paymentReturn";
import { Success } from "./pages/Success";
import { ErrorPage } from "./pages/ErrorPage";
import { ExamFeeForm } from "./pages/forms/ExamFeeForm";
import { CertificatesForm } from "./pages/forms/CertificatesForm";
import { AdmissionsForm } from "./pages/forms/AdmissionsForm";
import { AffiliationForm } from "./pages/forms/AffiliationForm";
import { ChallanForm } from "./pages/forms/ChallanForm";
// import { PHDForm } from "./pages/forms/PHDForm";
import { PhDFeeForm } from "./pages/forms/PhDFeeForm";
import { PageDisabled } from "./pages/PageDisabled";
import { NotFound } from "./pages/NotFound";

// System / Status pages
import { ServerError } from "./pages/ServerError";
import { Maintenance500 } from "./pages/system/Maintenance500";
import { ServerDown } from "./pages/system/ServerDown";
import { PortalLockout } from "./pages/system/PortalLockout";
import { Offline } from "./pages/system/Offline"; // ✅ adjust path if different

// Hooks
import { useMaintenanceSchedule } from "./hooks/useMaintenanceSchedule";
import { useSystemHealth } from "./hooks/useSystemHealth"; // ✅ adjust path if different

export default function App() {
  const system = useSystemHealth();
  const { locked, message } = useMaintenanceSchedule();

  // Global lockout (scheduled)
  if (locked) {
    return <PortalLockout title="Maintenance Window" message={message} />;
  }

  // Immediate lockout flag (e.g., set on window by server or bootstrap script)
  if (window.__PORTAL_LOCKOUT__ === true) {
    return <PortalLockout message="Exam Fee Payment is Temporarily Closed." />;
  }

  // System health gating
  if (system === "OFFLINE") return <Offline />;
  if (system === "MAINTENANCE") return <Maintenance500 />;
  if (system === "SERVER_DOWN") return <ServerDown />;
  const maintenance = false;

  if (maintenance) {
    return <PortalLockout title="Scheduled Maintenance" message="The portal is currently undergoing scheduled maintenance. Please check back later." />;
  }
  
  if (maintenance) return <Maintenance503 />;

  // Normal portal routes
  return (
    <PortalLayout>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Forms */}
        <Route path="/exam-fee" element={<ExamFeeForm />} />
        <Route path="/certificates" element={<CertificatesForm />} />
        {/* <Route path="/hostels" element={<HostelsForm />} /> */}
        <Route path="/admissions" element={<AdmissionsForm />} />
        <Route path="/affiliation" element={<AffiliationForm />} />
        <Route path="/challan" element={<ChallanForm />} />
        <Route path="/phd-fee" element={<PhDFeeForm />} />

        {/* Payments */}
        <Route path="/payment/return" element={<PaymentReturn />} />
        <Route path="/payment/success" element={<Success />} />
        <Route path="/payment/error" element={<ErrorPage />} />

        {/* System pages */}
        <Route path="/page-disabled" element={<PageDisabled />} />
        <Route path="/error/500" element={<ServerError />} />
        <Route path="/system/maintenance" element={<Maintenance500 />} />
        <Route path="/system/server-down" element={<ServerDown />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PortalLayout>
  );
}

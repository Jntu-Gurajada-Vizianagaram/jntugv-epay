import React from "react";
import { CardTile } from "../components/CardTile";

export function Home() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Welcome to JNTU-GV Payments</h2>
        <p className="text-sm text-gray-600">Pay examination fees, certificates, hostel, admissions and other university services securely.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardTile to="/exam-fee" title="Examination Fees" desc="Semester & Exam payments" icon="EX" />
        <CardTile to="/certificates" title="Certificates" desc="OD, PC, Migration, CMM" icon="CD" />
        {/* <CardTile to="/phd-fee" title="Hostel Fees" desc="Room rent & deposits" icon="HT" /> */}
        <CardTile to="/phd-fee" title="Ph.D. Fees" desc="Scholar fee payments" icon="PF" />
        <CardTile to="/admissions" title="Admissions" desc="New student payments" icon="AD" />
        <CardTile to="/affiliation" title="Affiliation" desc="College affiliation fees" icon="AF" />
        <CardTile to="/challan" title="Direct Challans" desc="Other challans & fines" icon="CH" />
      </div>
    </div>
  );
}

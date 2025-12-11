import React from "react";

export function AboutUs() {
  return (
    <div className="max-w-5xl mx-auto p-4">

      {/* HERO SECTION */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 lg:p-8 shadow-sm mb-10">
        <h2 className="text-xl lg:text-2xl font-semibold text-blue-900 mb-3">
          About the Unified Payments Portal – JNTU-GV
        </h2>
        <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed">
          The Unified Payments Portal is an official digital initiative of
          <strong> Jawaharlal Nehru Technological University Gurajada, Vizianagaram (JNTU-GV)</strong>,
          developed to modernize and simplify financial transactions across the university ecosystem.
        </p>
      </div>

      {/* ABOUT PORTAL */}
      <section className="bg-white rounded-2xl shadow-sm border p-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Portal</h3>

        <p className="text-gray-700 text-sm leading-relaxed">
          The Unified Payments Portal centralizes all student, scholar, and institutional payments under
          a single, secure online system. Built in collaboration with the
          <strong> State Bank of India (SBI)</strong>, the platform ensures:
        </p>

        <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700 text-sm">
          <li>Secure online fee payments</li>
          <li>Instant transaction acknowledgment</li>
          <li>End-to-end encrypted communication</li>
          <li>Real-time settlement via SBI payment gateway</li>
          <li>Transparent and centralized record management</li>
        </ul>
      </section>

      {/* UNIVERSITY SECTION */}
      <section className="bg-gray-50 rounded-2xl shadow-sm border p-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About JNTU-GV</h3>

        <p className="text-gray-700 text-sm leading-relaxed">
          Jawaharlal Nehru Technological University Gurajada, Vizianagaram (JNTU-GV), established in 2021,
          is one of the premier technological universities in Andhra Pradesh. The University offers high-quality
          education, research programs, and academic excellence across engineering, technology, management,
          and sciences.
        </p>

        <p className="text-gray-700 text-sm mt-3">
          JNTU-GV focuses on:
        </p>

        <ul className="list-disc ml-6 mt-2 space-y-2 text-sm text-gray-700">
          <li>Industry-oriented technical education</li>
          <li>Cutting-edge research and innovation</li>
          <li>Digital transformation and e-governance</li>
          <li>Improving student services through technology</li>
        </ul>
      </section>

      {/* COLLABORATION SECTION */}
      <section className="bg-white rounded-2xl shadow-sm border p-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">SBI Collaboration</h3>

        <p className="text-sm text-gray-700 leading-relaxed">
          The portal is built with technical and payment integration support from the
          <strong> State Bank of India (SBI)</strong>. SBI ensures:
        </p>

        <ul className="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-2">
          <li>Reliable and secure transaction processing</li>
          <li>Compliance with RBI digital payment regulations</li>
          <li>24×7 payment availability and uptime</li>
          <li>Secure encryption, checksum validation, and fraud monitoring</li>
        </ul>
      </section>

      {/* MISSION */}
      <section className="bg-blue-50 rounded-2xl shadow-sm border border-blue-100 p-6 mb-10">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Our Mission</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          To empower students, scholars, and institutions through secure, transparent, and modern digital services,
          fostering the University’s vision of digital transformation and academic excellence.
        </p>
      </section>

    </div>
  );
}

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function MainLayout({ children }){
  const loc = useLocation();

  return (
    <>
      <header className="header">
        <div className="container bar">
          <div className="brand">
            <div style={{width:46,height:46,background:'#fff',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,color:'#0b5cff'}}>J</div>
            <div>
              <h1>JNTU-GV Payments</h1>
              <small>Jawaharlal Nehru Technological University Gurajada, Vizianagaram</small>
            </div>
          </div>

          <nav className="nav" aria-label="Main navigation">
            <Link to="/">Home</Link>
            <Link to="/exam-fee">Exams</Link>
            <Link to="/certificates">Certificates</Link>
            <Link to="/hostels">Hostels</Link>
            <Link to="/admissions">Admissions</Link>
            <Link to="/affiliation">Affiliation</Link>
          </nav>
        </div>
      </header>

      <main className="container main">
        <aside className="sidebar card" aria-hidden={false}>
          <Link to="/exam-fee"><button className={loc.pathname==='/exam-fee' ? 'active' : ''}>Examination</button></Link>
          <Link to="/certificates"><button className={loc.pathname==='/certificates' ? 'active' : ''}>Certificates</button></Link>
          <Link to="/hostels"><button className={loc.pathname==='/hostels' ? 'active' : ''}>Hostels</button></Link>
          <Link to="/admissions"><button className={loc.pathname==='/admissions' ? 'active' : ''}>Admissions</button></Link>
          <Link to="/affiliation"><button className={loc.pathname==='/affiliation' ? 'active' : ''}>Affiliation</button></Link>
          <Link to="/challan"><button className={loc.pathname==='/challan' ? 'active' : ''}>Direct Challan</button></Link>
        </aside>

        <section className="content">
          <div className="card">
            {children}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

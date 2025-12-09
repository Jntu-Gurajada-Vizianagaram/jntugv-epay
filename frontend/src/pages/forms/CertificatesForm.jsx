import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../components/Input";
import { isValidHTNo } from "../../utils/validations";
import { initiatePayment } from "../../api/paymentApi";

export function CertificatesForm(){
  const [ht,setHt]=useState(''); const [name,setName]=useState(''); const [cert,setCert]=useState('OD'); const [amount,setAmount]=useState('');
  const [paymentData,setPaymentData]=useState(null); const formRef=useRef(null);
  useEffect(()=>{ if(paymentData && formRef.current) formRef.current.submit(); },[paymentData]);
  async function submit(e){ e.preventDefault(); if(!isValidHTNo(ht)) return alert('Invalid HT'); const res = await initiatePayment({ student_roll:ht, student_name:name, amount:Number(amount), payment_type:'CERTIFICATE', payment_subtype:cert, remarks:`${cert}` }); setPaymentData(res); }
  return (
    <div>
      <h2>Certificates</h2>
      <form onSubmit={submit}>
        <label>Certificate Type</label>
        <select value={cert} onChange={e=>setCert(e.target.value)}>
          <option value="OD">Original Degree</option>
          <option value="PC">Provisional Certificate</option>
          <option value="CMM">CMM</option>
          <option value="MIGRATION">Migration</option>
          <option value="TRANSCRIPTS">Transcripts</option>
        </select>
        <Input label="Hallticket No" value={ht} onChange={e=>setHt(e.target.value.toUpperCase())} />
        <Input label="Name" value={name} onChange={e=>setName(e.target.value)} />
        <Input label="Amount (INR)" type="number" value={amount} onChange={e=>setAmount(e.target.value)} required />
        <button className="primary" type="submit">Pay</button>
      </form>

      {paymentData && (
        <form ref={formRef} method="POST" action={paymentData.action} style={{display:'none'}}>
          {Object.entries(paymentData.fields).map(([k,v])=> <input key={k} type="hidden" name={k} value={v} />)}
        </form>
      )}
    </div>
  );
}

import React,{useState,useRef,useEffect} from "react";
import { Input } from "../../components/Input";
import { initiatePayment } from "../../api/paymentApi";

export function AffiliationForm(){
  const [code,setCode]=useState(''); const [name,setName]=useState(''); const [amount,setAmount]=useState('');
  const [paymentData,setPaymentData]=useState(null); const formRef=useRef(null);
  useEffect(()=>{ if(paymentData && formRef.current) formRef.current.submit(); },[paymentData]);
  async function submit(e){ e.preventDefault(); const res = await initiatePayment({ student_roll:code, student_name:name, amount:Number(amount), payment_type:'AFFILIATION', remarks:'Affiliation Fee' }); setPaymentData(res); }
  return(<div>
    <h2>Affiliation</h2>
    <form onSubmit={submit}>
      <Input label="College Code" value={code} onChange={e=>setCode(e.target.value)} />
      <Input label="College Name" value={name} onChange={e=>setName(e.target.value)} />
      <Input label="Amount (INR)" type="number" value={amount} onChange={e=>setAmount(e.target.value)} required />
      <button className="primary" type="submit">Pay</button>
    </form>
    {paymentData && <form ref={formRef} method="POST" action={paymentData.action} style={{display:'none'}}>{Object.entries(paymentData.fields).map(([k,v])=> <input key={k} type="hidden" name={k} value={v} />)}</form>}
  </div>);
}
